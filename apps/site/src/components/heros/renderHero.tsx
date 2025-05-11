import React from 'react'
import { HighImpactHero } from './highImpact'
import { LowImpactHero } from './lowImpact'
import { MediumImpactHero } from './mediumImpact'
import type { Page } from '@/utils/cms'

const heroes = {
    highImpact: HighImpactHero,
    lowImpact: LowImpactHero,
    mediumImpact: MediumImpactHero,
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
