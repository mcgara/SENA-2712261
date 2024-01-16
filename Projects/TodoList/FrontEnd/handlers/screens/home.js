import { boxDateHandleMessage } from '../boxDate'

/** @param {Date} date */
export function boxDateMessage(date) {
  const message = boxDateHandleMessage(date)
  const messages = {
    'Good Morning': 'Buenos Días',
    'Good Afternoon': 'Buenas Tardes',
    'Good Night': 'Buenas Noches'
  }
  return messages[message]
}
