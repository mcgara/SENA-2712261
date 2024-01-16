/** @param {Date} date */
export function boxDateHandleOnDate(date) {
  const day = date.getDate()
  const month = date.toLocaleDateString({}, { month: 'long' })
  const year = date.getFullYear()
  let time = date.toLocaleTimeString({}, { hour: 'numeric', minute: '2-digit', second: '2-digit' })
  time = time.replace(/\.\s?/g, '').toUpperCase()
  return `${time}\n${day} ${month} ${year}`
}

/**
 * @param {Date} date
 * @return {'Good Morning' | 'Good Afternoon' | 'Good Night'}
 */
export function boxDateHandleMessage(date) {
  const hours = date.getHours()
  const messages = {
    'Good Morning': hours >= 0 && hours <= 11,
    'Good Afternoon': hours >= 12 && hours < 18,
    'Good Night': hours >= 18 && hours <= 23
  }

  let message = 'N/A'
  for (const [key, value] of Object.entries(messages)) {
    if (!value) continue
    message = key
    break
  }
  return message
}
