import ArgentAccountCompiledContractUrl from "../contracts/ArgentAccount.txt"
import MgtyAccountCompiledContractUrl from "../contracts/MgtyAccount.txt"
import ProxyCompiledContractUrl from "../contracts/Proxy.txt"

export type LoadContracts = (
  derivationPathBase?: string,
) => Promise<[string, string, string]>

export const loadContracts: LoadContracts = async () =>
  Promise.all(
    [
      ProxyCompiledContractUrl,
      ArgentAccountCompiledContractUrl,
      MgtyAccountCompiledContractUrl,
    ].map(async (url) => {
      const response = await fetch(url)
      return response.text()
    }) as unknown as [string, string, string],
  )
