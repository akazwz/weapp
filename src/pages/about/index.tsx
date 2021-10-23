import { useState } from 'react'
import Taro from '@tarojs/taro'
import { Button, View } from '@tarojs/components'
import { useReady, useTabItemTap } from '@tarojs/runtime'
import UserInfo from './UserInfo'

const About = () => {
  /*const [aboutUs, setAboutUs] = useState(false)
  const [rateUs, setRateUs] = useState(false)
  const [rateValue, setRateValue] = useState(5)*/

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
    // 获取用户信息
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
        // 获取加密数据和iv后进行登录
        handleLogin(encryptedData, iv)
      },
      fail: (err) => {
        console.log(err)
      },
    }).then()
  }

  // 登录获取token
  const handleLogin = (encryptedData: string, iv: string) => {
    Taro.login({
      success: (result) => {
        if (result.code) {
          Taro.request({
            url: 'http://192.168.31.217:8000/v1/token/open-id',
            data: {
              code: result.code,
              encrypt: encryptedData,
              iv: iv
            },
            method: 'POST'
          })
            .then((loginRes) => {
              if (loginRes.statusCode === 201) {
                const { code, data } = loginRes.data
                if (code !== 2000) {
                  console.log('login error')
                } else {
                  const { expires_at, token, user } = data
                  const { authority_id, phone } = user
                  localStorage.setItem('token', token)
                  localStorage.setItem('expires_at', expires_at)
                  localStorage.setItem('authority_id', authority_id)
                  localStorage.setItem('phone', phone)
                }
              }
              console.log(loginRes.data)
            })
            .catch((error) => {
              if (error !== null) {
                console.log(error.response)
              }
            })
        } else {
          console.log('login fail')
        }
      }
    }).then()
  }

  /*const handleClickZWZ = () => {
    Taro.setClipboardData({
      data: 'akazwz',
      success: function () {
      }
    }).then()
  }*/

  return (
    <View>
      {hasUserInfo ? (
        <UserInfo userInfo={userInfo} />
      ) : (<View>
        <Button onClick={getUserInfo}>一键登录</Button>
      </View>)}
    </View>
  )
}
export default About
