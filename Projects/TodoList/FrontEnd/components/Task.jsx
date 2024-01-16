import { View, Text } from 'react-native'
import { useTaskById } from '../hooks/useTask'

/** @param {{ id: number }} */
export function Task({ id }) {
  const [task] = useTaskById(id)
  
  return (
    <View>
      {
        !task
        ?
          <Text>Loading Task Data #{id}...</Text>
        :
        <>
          <Text>Task #{id}:</Text>
          <Text>title: {task.title}</Text>
          <Text>state: {task.state}</Text>
          <Text>description: {task.description}</Text>
        </>
      }
    </View>
  )
}

export default Task
