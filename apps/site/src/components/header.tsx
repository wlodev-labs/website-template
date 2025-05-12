import { type Header as HeaderType, type Setting } from '@utils/cms'
import { Image } from 'astro:assets'
import { CMSLink } from './cmsLink'
import { cn } from '@/utils/ui'

export const Header = async ({
    data,
    websiteSettings,
    invertHeaderColor = false,
}: {
    data: HeaderType
    websiteSettings: Setting
    invertHeaderColor?: boolean
}) => {
    return (
        <header className='container px-4 mx-auto relative z-20'>
            <div
                className={cn('py-8 flex justify-between', {
                    'text-white': invertHeaderColor,
                })}
            >
                <a href='/'>
                    {!websiteSettings ||
                    !websiteSettings.logo ||
                    typeof websiteSettings.logo === 'string' ? (
                        <div className='font-semibold'>
                            {websiteSettings.companyName ??
                                'Logo / Company name'}
                        </div>
                    ) : (
                        <Image
                            src={websiteSettings.logo.url}
                            alt='Logo'
                            width={websiteSettings.logo.width}
                            height={websiteSettings.logo.height}
                            loading='eager'
                            class='max-w-[9.375rem] w-full h-[34px]'
                        />
                    )}
                </a>
                <Nav data={data} invertHeaderColor={invertHeaderColor} />
            </div>
        </header>
    )
}

const Nav = ({
    data,
    invertHeaderColor,
}: {
    data: HeaderType
    invertHeaderColor?: boolean
}) => {
    const navItems = data?.navItems || []
    return (
        <nav className='flex gap-8 items-center'>
            {navItems.map(({ link }, i) => {
                return (
                    <CMSLink
                        key={i}
                        {...link}
                        appearance='link'
                        className={cn('', {
                            'text-white': invertHeaderColor,
                        })}
                    />
                )
            })}
        </nav>
    )
}
