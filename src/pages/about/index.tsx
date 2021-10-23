import { useState } from 'react'
import Taro from '@tarojs/taro'
import { Button, View } from '@tarojs/components'
import { useReady, useTabItemTap } from '@tarojs/runtime'
import AtMessage from 'taro-ui/lib/components/message'
import AtList from 'taro-ui/lib/components/list'
import AtListItem from 'taro-ui/lib/components/list/item'
import AtFloatLayout from 'taro-ui/lib/components/float-layout'
import AtRate from 'taro-ui/lib/components/rate'
import UserInfo from './UserInfo'

const About = () => {
  const [aboutUs, setAboutUs] = useState(false)
  const [rateUs, setRateUs] = useState(false)
  const [rateValue, setRateValue] = useState(5)

  // tap vibrate
  useTabItemTap(() => {
    Taro.vibrateShort().then()
  })

  const [userInfo, setUserInfo] = useState({
    avatarUrl: '',
    nickName: '',
  })
  const [hasUserInfo, setHasUserInfo] = useState(false)

  useReady(() => {
    // userInfo local storage
    try {
      let info = Taro.getStorageSync('userInfo')
      if (info) {
        setHasUserInfo(true)
        setUserInfo(JSON.parse(info))
      }
    } catch (e) {
      Taro.atMessage({
        'message': e,
        'type': 'error',
      })
    }
  })

  // get userInfo
  const getUserInfo = () => {
    Taro.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        setUserInfo({
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
        })
        setHasUserInfo(true)
        try {
          Taro.setStorageSync('userInfo', JSON.stringify(res.userInfo))
        } catch (e) {
          console.log(e)
        }
        // 获取加密数据和 iv
        const encryptedData = res.encryptedData
        const iv = res.iv
        Taro.login({
          success: (result) => {
            const { code } = result
            if (code) {
              console.log(code)
              console.log(encryptedData)
              console.log(iv)
              Taro.request({
                url: 'http://192.168.31.217:8080/login',
                data: {
                  code: code,
                  encrypt: encryptedData,
                  iv: iv
                },
                method: 'POST'
              })
            } else {
              console.log('login fail')
            }
            console.log(code)
          }
        }).then()
      },
      fail: (err) => {
        console.log(err)
      },
    }).then()
  }

  /*const handleLogin = () => {
    Taro.login({
      success: (result) => {
        const { code } = result
        if (code) {
          Taro.request({
            url: '',
            data: {
              code: code
            }
          })
        } else {
          console.log('login fail')
        }
        console.log(code)
      }
    }).then()
  }*/

  const handleClickZWZ = () => {
    Taro.setClipboardData({
      data: 'akazwz',
      success: function () {
      }
    }).then()
  }

  return (
    <View>
      <AtMessage />
      {hasUserInfo ? (
        <UserInfo userInfo={userInfo} />
      ) : (<View>
        <Button onClick={getUserInfo}>一键登录</Button>
      </View>)}
      <View>
        <AtList>
          <AtListItem title='关于作者' arrow='right' onClick={() => setAboutUs(true)} />
          <AtListItem title='评价一下' arrow='right' onClick={() => setRateUs(true)} />
        </AtList>
      </View>
      <AtFloatLayout isOpened={aboutUs} title='关于我们' onClose={() => setAboutUs(false)}>
        <View style={{ marginTop: 20 }}>
          <AtList>
            <AtListItem
              title='姓名'
              extraText='赵文卓'
            />
            <AtListItem
              title='微信号'
              extraText='akazwz'
              onClick={handleClickZWZ}
            />
            <AtListItem
              title='Github'
              extraText='akazwz'
              onClick={handleClickZWZ}
            />
          </AtList>
        </View>
      </AtFloatLayout>
      <AtFloatLayout isOpened={rateUs} title='评价一下' onClose={() => setRateUs(false)}>
        <View style={{ textAlign: 'center', marginTop: 20 }}>
          <AtRate
            size={30}
            value={rateValue}
            onChange={(value) => {
              setRateValue(value)
              if (value <= 2) {
                Taro.vibrateLong().then()
                return
              }
              Taro.vibrateShort().then()
            }}
          />
          <View style={{ marginTop: 20 }}>
            {rateValue <= 3 ? '一般' : rateValue <= 4 ? '优秀' : '极好'}
          </View>
        </View>
      </AtFloatLayout>
      <Button onClick={() => {
        Taro.clearStorage().then()
        setHasUserInfo(false)
      }}
      >
        清理缓存
      </Button>
    </View>
  )
}
export default About
