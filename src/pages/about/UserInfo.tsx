import { View, Text } from '@tarojs/components'
import { Image } from '@taroify/core'

const UserInfo = (props: any) => {
  const {
    avatarUrl,
    nickName,
  } = props.userInfo
  return (
    <View style={{ marginTop: 20 }}>
      <View className='at-row at-row__justify--center'>
        <Image src={avatarUrl} />
      </View>
      <View className='at-row at-row__justify--center' style={{ marginTop: 20, marginBottom: 20 }}>
        <Text>{nickName}</Text>
      </View>
    </View>
  )
}

export default UserInfo
