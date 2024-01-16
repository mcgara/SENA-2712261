import { View, StyleSheet } from 'react-native'
import CircleButton from './CircleButton'

/**
 * @typedef {import('../contexts/Api').ApiContextValue} ApiContextValue
 * @typedef {{ api: ApiContextValue }} PadButtonsApiProps
 * @type {import('react').FC<PadButtonsApiProps>}
 * @param {PadButtonsApiProps}
 */
export function PadButtonsApi({ api }) {
  return (
    <View style={styles.container}>
      <CircleButton text='Usuarios' onPress={() => api.route.set('/user')} />
      <CircleButton text='Comidas' onPress={() => api.route.set('/food')} />
      <CircleButton text='Categorias' onPress={() => api.route.set('/food_category')} />
      <CircleButton text='Pedidos' onPress={() => api.route.set('/order')} />
      <CircleButton text='Facturas' onPress={() => api.route.set('/invoice')} />
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  }
})

export default PadButtonsApi
