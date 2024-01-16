import { View, Text } from 'react-native'
import { useUserById } from '../hooks/useUser'

/** @param {{ id: number }} */
export function User({ id }) {
  const [user] = useUserById(id)
  
  return (
    <View>
      {
        !user
        ?
          <Text>Loading User Data #{id}...</Text>
        :
        <>
          <Text>User #{id}:</Text>
          <Text>name: {user.name}</Text>
          <Text>username: {user.username}</Text>
          <Text>email: {user.email}</Text>
        </>
      }
    </View>
  )
}

export default User
