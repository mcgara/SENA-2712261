import { View, Text, StyleSheet } from 'react-native'
import { useTaskById } from '../hooks/useTask'
import TaskStatusCheckBox from './TaskStatusCheckBox'

/** @param {{ id: number }} */
export function TaskItem({ id }) {
  const [task] = useTaskById(id)
  
  return (
    <View style={styles.container}>
      <TaskStatusCheckBox scaleIcon={0.05}/>
      <Text style={styles.title}>{task?.title ?? 'N/A'}</Text>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: 16
  }
})

export default TaskItem
