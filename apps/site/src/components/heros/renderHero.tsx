import React from 'react'
import { PrimaryHero } from './primaryHero'
import type { Page } from '@/utils/cms'

const heroes = {
    primary: PrimaryHero,
}

export const RenderHero: React.FC<Page['hero']> = props => {
    const { type } = props || {}
    if (!type || type === 'none') {
        return null
    }

    const HeroToRender = heroes[type]
    if (!HeroToRender) {
        return null
    }
    return <HeroToRender {...props} />
}
