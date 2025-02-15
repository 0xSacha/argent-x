import { useMemo } from "react"

import { fetcherWithArgentApiHeadersForNetwork } from "../../shared/api/fetcher"
import { KnownNetworksType } from "../../shared/networks"
import { useAppState } from "../app.state"

/**
 * Returns an SWR-compliant fetcher which will apply the expected API headers to each request,
 * including the currently selected network
 *
 * @see fetcherWithArgentApiHeadersForNetwork
 */

export const useArgentApiFetcher = () => {
  const { switcherNetworkId } = useAppState()
  const fetcher = useMemo(() => {
    return fetcherWithArgentApiHeadersForNetwork(
      switcherNetworkId as KnownNetworksType,
    )
  }, [switcherNetworkId])
  return fetcher
}
