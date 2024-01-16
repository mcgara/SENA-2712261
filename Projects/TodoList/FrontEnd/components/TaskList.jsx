import { View, Text, ScrollView, StyleSheet } from 'react-native'
import TaskItem from './TaskItem'
import PlusIcon from './designs/PlusIcon'

export function TaskList() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Lista de tareas</Text>
        <PlusIcon scaleIcon={0.075}/>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TaskItem id={1}/>
        <TaskItem id={1}/>
        <TaskItem id={1}/>
        <TaskItem id={1}/>
        <TaskItem id={1}/>
        <TaskItem id={1}/>
        <TaskItem id={1}/>
        <TaskItem id={1}/>
        <TaskItem id={1}/>
        <TaskItem id={1}/>
        <TaskItem id={1}/>
        <TaskItem id={1}/>
        <TaskItem id={1}/>
      </ScrollView>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: '50%',
    backgroundColor: '#eee',
    padding: 20,
    paddingTop: 10,
    borderRadius: 20
  },
  header: {
    width: '100%',
    height: '13%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  textHeader: {
    fontSize: 19,
    fontWeight: 'bold'
  },
  scrollContent: {
    gap: 13
  }
})

export default TaskList
