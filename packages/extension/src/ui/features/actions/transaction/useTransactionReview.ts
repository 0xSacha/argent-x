import { useCallback } from "react"
import { Call } from "starknet"

import { ARGENT_TRANSACTION_REVIEW_API_ENABLED } from "../../../../shared/api/constants"
import { argentApiNetworkForNetwork } from "../../../../shared/api/fetcher"
import { KnownNetworksType } from "../../../../shared/networks"
import { isPrivacySettingsEnabled } from "../../../../shared/settings"
import {
  ApiTransactionReviewResponse,
  fetchTransactionReview,
} from "../../../../shared/transactionReview.service"
import { useConditionallyEnabledSWR } from "../../../services/swr"
import { useArgentApiFetcher } from "../../../services/useArgentApiFetcher"
import { useBackgroundSettingsValue } from "../../../services/useBackgroundSettingsValue"
import { Account } from "../../accounts/Account"

export interface IUseTransactionReview {
  account?: Account
  transactions: Call | Call[]
  actionHash: string
}

export const useTransactionReviewEnabled = () => {
  const { value: privacyUseArgentServicesEnabled } = useBackgroundSettingsValue(
    "privacyUseArgentServices",
  )
  /** ignore `privacyUseArgentServices` entirely when the Privacy Settings UI is disabled */
  if (!isPrivacySettingsEnabled) {
    return ARGENT_TRANSACTION_REVIEW_API_ENABLED
  }
  return (
    ARGENT_TRANSACTION_REVIEW_API_ENABLED && privacyUseArgentServicesEnabled
  )
}

export const useTransactionReview = ({
  account,
  transactions,
  actionHash,
}: IUseTransactionReview) => {
  const fetcher = useArgentApiFetcher()
  const transactionReviewEnabled = useTransactionReviewEnabled()
  const transactionReviewFetcher = useCallback(async () => {
    if (!account) {
      return
    }
    const network = argentApiNetworkForNetwork(
      account.networkId as KnownNetworksType,
    )
    const accountAddress = account.address
    return fetchTransactionReview({
      network,
      accountAddress,
      transactions,
      fetcher,
    })
  }, [account, transactions])
  return useConditionallyEnabledSWR<ApiTransactionReviewResponse>(
    transactionReviewEnabled,
    [actionHash, "transactionReview"],
    transactionReviewFetcher,
  )
}
