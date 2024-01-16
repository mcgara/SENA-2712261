import { useState, useEffect } from 'react'
import Task from '../service/task'

/** @type {import('../service/types').Task | null} */
const initialTask = null

/** @param {number} id */
export function useTaskById(id) {
  const state = useState(initialTask)
  const setTask = state[1]
  useEffect(() => { (async () => setTask(await Task.getById(id)))() }, [id])

  return state
}

export default {
  useById: useTaskById
}
