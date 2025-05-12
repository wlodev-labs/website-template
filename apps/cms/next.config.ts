import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'
import { withWlodev } from '@wlodev/payload/next/withWlodev'

const nextConfig: NextConfig = {
    // Your Next.js config here
}

export default withPayload(withWlodev(nextConfig), {
    devBundleServerPackages: false,
})
