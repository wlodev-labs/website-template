import { withPayload } from '@payloadcms/next/withPayload'
import { withWlodev } from '@wlodev/payload/withWlodev'

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Your Next.js config here
}

export default withPayload(withWlodev(nextConfig), {
    devBundleServerPackages: false,
})
