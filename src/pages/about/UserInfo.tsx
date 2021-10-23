import { Text, View } from '@tarojs/components'
import AtAvatar from 'taro-ui/lib/components/avatar'

const UserInfo = (props: any) => {
  const {
    avatarUrl,
    nickName,
  } = props.userInfo
  return (
    <View style={{ marginTop: 20 }}>
      <View className='at-row at-row__justify--center'>
        <AtAvatar circle size='large' image={avatarUrl} />
      </View>
      <View className='at-row at-row__justify--center' style={{ marginTop: 20, marginBottom: 20 }}>
        <Text>{nickName}</Text>
      </View>
    </View>
  )
}

export default UserInfo
