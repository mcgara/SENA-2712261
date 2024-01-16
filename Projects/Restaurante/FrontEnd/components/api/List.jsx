import { ScrollView, StyleSheet } from 'react-native'
import { toArray } from '../../utils'
import ApiItem from './Item'
import useAsyncValue from '../../hooks/useAsyncValue'

/**
 * @typedef {import('./Index').ApiRoutesData} ApiRoutesData
 * @typedef {import('./Index').ComponentApiProps} ComponentApiProps
 * @typedef {ComponentApiProps & {
 *   fields?: Partial<ApiRoutesData>
 * }} ApiListProps
 * @type {import('react').FC<ApiListProps>}
 * @param {ApiListProps}
 */
export function ApiList({ api, fields }) {
  let [items] = useAsyncValue(async () => await api.route.value.find(fields), [], [])

  return (
    <ScrollView>
      {items.map((dataItem, i) => <ApiItem key={i} data={dataItem} />)}
    </ScrollView>
  )
}

export default ApiList
