import { Pressable, Text, StyleSheet } from 'react-native'
import useForceUpdate from '../hooks/useForceUpdate'

/**
 * @typedef {import('../contexts/Api').ApiContextValue} ApiContextValue
 * @typedef {import('../contexts/Api').ApiMode} ApiMode
 * @typedef {{
 *   api: ApiContextValue
 *   mode: ApiMode
 *   text?: string
 * }} BarButtonApiModeProps
 * @type {import('react').FC<BarButtonApiModeProps>}
 * @param {BarButtonApiModeProps}
 */
export function BarButtonApiMode({ api, mode, text }) {
  useForceUpdate(updater => {
    api.mode.events.on('afterchange', updater)
    return () => api.mode.events.off('afterchange', updater)
  }, [])

  const isMode = mode === api.mode.value

  return (
    <Pressable
      style={[styles.button, isMode ? styles.isMode : {}]}
      onPress={() => api.mode.set(mode)}
    >
      <Text style={styles.text}>
        {text}
      </Text>
    </Pressable>
  )
}

export const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    height: '100%',
    alignItems: 'center',
    borderRadius: 25
  },
  text: {
    fontSize: 16,
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  isMode: {
    backgroundColor: '#ff0',
    borderWidth: 1.5,
  }
})

export default BarButtonApiMode
