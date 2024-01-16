import { useState, useEffect } from 'react'
import User from '../service/user'

/** @type {import('../service/types').User | null} */
const initialUser = null

/** @param {number} id */
export function useUserById(id) {
  const state = useState(initialUser)
  const setUser = state[1]
  useEffect(() => { (async () => setUser(await User.getById(id)))() }, [id])

  return state
}

export default {
  useById: useUserById
}
