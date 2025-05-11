import { initPayloadClient } from '@wlodev/astro'
import type { Config } from '../../../cms/src/payload-types'

export const cms = initPayloadClient<Config>({
    url: `${import.meta.env.CMS_URL}/api`,
})

export * from '../../../cms/src/payload-types'
