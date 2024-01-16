import { useState, useEffect } from 'react'

/**
 * @param {{
 *   onDate: (date: Date) => string,
 *   message: string | (date: Date) => string
 * }}
 * @return {[string, string]}
 */
export function useBoxDate({ onDate, message }) {
  const [date, setDate] = useState(new Date(Date.now()))

  useEffect(() => {
    const interval = 1000
    const updateDate = setInterval(() => setDate(new Date(Date.now())), interval)
    return () => clearInterval(updateDate)
  }, [])

  let textDate = onDate(date)
  let textMessage = typeof message === 'string' ? message : message(date)

  return [textDate, textMessage]
}

export default useBoxDate
