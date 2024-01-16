import { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScreensContext, ApiContext } from '../../contexts/index'
import ScreenBg from '../designs/ScreenBg'
import CircleButton from '../CircleButton'
import BarApiMode from '../BarApiMode'
import PadButtonsApi from '../PadButtonsApi'
import useForceUpdate from '../../hooks/useForceUpdate'
import GetComponentApi from '../api/Index'

/** @type {Record<import('../api/Index').ApiRoutes, string>} */
const i18nTitle = {
  '/user': 'Usuarios',
  '/food': 'Comidas',
  '/food_category': 'Categorias',
  '/order': 'Pedidos',
  '/invoice': 'Facturas'
}

/** @type {import('react').FC<{}>} */
export function HomeScreen() {
  const { screenStyles } = useContext(ScreensContext)
  const api = useContext(ApiContext)

  useForceUpdate((updater) => {
    api.route.events.on('afterchange', updater)
    api.mode.events.on('afterchange', updater)
    return () => {
      api.route.events.off('afterchange', updater)
      api.mode.events.off('afterchange', updater)
    }
  }, [])

  const title = i18nTitle[api.route.value?.route] ?? 'Restaurante'

  return (
    <ScreenBg style={styles.bg}>
      <View style={[screenStyles.container, styles.container]}>
        <View style={styles.header}>
          <View style={styles.row}>
            <Text style={styles.title}>API {title}</Text>
            {
              !!api.route.value
              ? <CircleButton text='<-' scale={0.08} style={styles.button} onPress={() => api.route.set(null)} />
              : null
            }
          </View>
          <BarApiMode api={api} />
        </View>
        {
          !api.route.value
          ? <PadButtonsApi api={api} />
          : <GetComponentApi api={api} />
        }
      </View>
    </ScreenBg>
  )
}

export const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#ddd',
  },
  container: {
    alignItems: 'center',
    padding: '5%',
  },
  header: {
    width: '100%',
    paddingVertical: 20
  },
  row: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    right: 0,
    backgroundColor: '#ed0',
    borderColor: '#000',
  }
})

export default HomeScreen
