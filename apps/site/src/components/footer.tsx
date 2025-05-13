import { Mail, PhoneCall } from 'lucide-react'
import type { Setting } from '@/utils/payload'

export const Footer = async ({
    websiteSettings,
}: {
    websiteSettings: Setting
}) => {
    return (
        <footer className='container px-4 mx-auto'>
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between border-t border-neutral-200 py-8 lg:py-16'>
                <div className='flex-1'>
                    <a href='/'>
                        {!websiteSettings ||
                        !websiteSettings.logo ||
                        typeof websiteSettings.logo === 'string' ? (
                            <div className='font-semibold'>
                                {websiteSettings.companyName ??
                                    'Logo / Company name'}
                            </div>
                        ) : // TODO: Implement image comoponent in react
                        null}
                    </a>
                    {websiteSettings.address && (
                        <div className='mt-4 text-sm'>
                            {websiteSettings.address}
                        </div>
                    )}
                </div>
                <div className='flex-1 flex flex-col gap-2'>
                    {websiteSettings.phones &&
                        websiteSettings.phones.map(phone => {
                            return (
                                <a
                                    key={phone.id}
                                    href={`tel:${phone.phoneNumber}`}
                                    className='flex items-center gap-2'
                                >
                                    <PhoneCall className='w-4 h-auto stroke-2 stroke-neutral-500' />
                                    <span className='text-sm'>
                                        {phone.phoneNumber}
                                    </span>
                                </a>
                            )
                        })}

                    {websiteSettings.emails &&
                        websiteSettings.emails.map(email => {
                            return (
                                <a
                                    key={email.id}
                                    href={`mailto:${email.address}`}
                                    className='flex items-center gap-2'
                                >
                                    <Mail className='w-4 h-auto stroke-2 stroke-neutral-500' />
                                    <span className='text-sm'>
                                        {email.address}
                                    </span>
                                </a>
                            )
                        })}
                </div>
                <div className='flex-1 flex flex-col gap-2'>
                    {Object.entries(websiteSettings.socialMedia).map(
                        ([socialName, socials]) => {
                            const socialNameDict = {
                                facebook: 'Facebook',
                                instagram: 'Instagram',
                                twitter: 'X / Twitter',
                            }

                            const socialIconDict = {
                                facebook: (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        x='0px'
                                        y='0px'
                                        width='100'
                                        height='100'
                                        viewBox='0 0 30 30'
                                        className='h-5 w-auto fill-neutral-500'
                                    >
                                        <path d='M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z'></path>
                                    </svg>
                                ),
                                instagram: (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        x='0px'
                                        y='0px'
                                        width='100'
                                        height='100'
                                        viewBox='0 0 24 24'
                                        className='h-5 w-auto fill-neutral-500'
                                    >
                                        <path d='M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z'></path>
                                    </svg>
                                ),
                                twitter: (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        x='0px'
                                        y='0px'
                                        width='100'
                                        height='100'
                                        viewBox='0 0 50 50'
                                        className='h-5 w-auto fill-neutral-600'
                                    >
                                        <path d='M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z'></path>
                                    </svg>
                                ),
                            }

                            return socials.map(social => {
                                return (
                                    <a
                                        key={social.id}
                                        href={social.link}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='text-sm flex items-center gap-2'
                                    >
                                        {socialIconDict[socialName]}
                                        {social.label ??
                                            socialNameDict[socialName]}
                                    </a>
                                )
                            })
                        }
                    )}
                </div>
            </div>
        </footer>
    )
}
