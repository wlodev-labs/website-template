import { PayloadSDK } from '@payloadcms/sdk'
import type { Config } from '../../../cms/src/payload-types'

export const payload = new PayloadSDK<Config>({
    baseURL: `${import.meta.env.CMS_URL}/api`,
})
// Make the types from the cms available in the site
export * from '../../../cms/src/payload-types'
