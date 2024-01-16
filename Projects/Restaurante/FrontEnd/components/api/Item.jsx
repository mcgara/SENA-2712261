import { useId } from 'react'
import { View, Text, StyleSheet } from 'react-native'

/**
 * @typedef {import('./Index').ApiRoutesData} ApiRoutesData
 * @typedef {{ data?: ApiRoutesData }} ApiItemProps
 * @type {import('react').FC<ApiItemProps>}
 * @param {ApiItemProps}
 */
export function ApiItem({ data }) {
  /** @type {{ [T in ApiRoutesData as number]: { [K in keyof T as number]: [K, T[K]] }[number][] }[number]}} */
  const item = Object.entries(data)
  
  return (
    <View>
      {item.map(([prop, value], i) => <Text key={i}>{prop}: {value}</Text>)}
    </View>
  )
}

export default ApiItem
