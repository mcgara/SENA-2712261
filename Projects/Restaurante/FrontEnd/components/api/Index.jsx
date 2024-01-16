import ApiList from './List'

/**
 * @typedef {import('../../service/types').ApiRoutes} ApiRoutes
 * @typedef {import('../../service/types').IApiRoutes} IApiRoutes
 * @typedef {import('../../service/types').AllApiRoutes} AllApiRoutes
 * @typedef {import('../../service/types').ApiRoutesData} ApiRoutesData
 * @typedef {import('../../service/types').IApiRoutesData} IApiRoutesData
 * 
 * @typedef {import('../../contexts/Api').ApiContextValue} ApiContextValue
 * @typedef {import('../../contexts/Api').ApiMode} ApiMode
 * @typedef {{ api: ApiContextValue }} ComponentApiProps
 * @typedef {import('react').FC<ComponentApiProps>} ComponentApi
*/

/** @type {Record<ApiMode, ComponentApi>} */
const componentsApi = {
  LIST: ApiList
}

/**
 * @type {ComponentApi}
 * @param {ComponentApiProps} props
 */
export function GetComponentApi(props) {
  const ComponentApi = componentsApi[props.api.mode.value]
  return <ComponentApi {...props} />
}

export default GetComponentApi
