import { View, StyleSheet } from 'react-native'
import BarButtonApiMode from './BarButtonApiMode'

/**
 * @typedef {Pick<import('./BarButtonApiMode').BarButtonApiModeProps, 'api'>} BarApiModeProps
 * @type {import('react').FC<BarApiModeProps>}
 * @param {BarApiModeProps}
 */
export function BarApiMode({ api }) {
  return (
    <View style={styles.container}>
      <BarButtonApiMode api={api} mode='LIST' text='Listado' />
      <BarButtonApiMode api={api} mode='SEARCH' text='Buscar' />
      <BarButtonApiMode api={api} mode='CREATE' text='Crear' />
      <BarButtonApiMode api={api} mode='UPDATE' text='Actualizar' />
      <BarButtonApiMode api={api} mode='REPLACE' text='Remplazar' />
      <BarButtonApiMode api={api} mode='DELETE' text='Eliminar' />
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    columnGap: 5,
    flexWrap: 'wrap'
  }
})

export default BarApiMode
