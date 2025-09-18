import { Category } from "./filter.model";

export const categories: Category[] = [
    {
        type: 'museos',
        name: 'Museos/Exposiciones',
        keywords: ['museo', 'museum', 'lonja'],
        icon: 'fa-solid fa-landmark'
    },
    {
        type: 'monumentos',
        name: 'Monumentos/Esculturas',
        keywords: ['puerta', 'estatua', 'murallas'],
        icon: 'fa-solid fa-monument'
    },
    {
        type: 'zonas-verdes',
        name: 'Zonas verdes',
        keywords: ['parque', 'canal'],
        icon: 'fa-solid fa-tree'
    },
    {
        type: 'arquitectura',
        name: 'Arquitectura',
        keywords: ['basilica', 'iglesia', 'palacio', 'casa', 'catedral', 'puente', 'zuda', 'mercado'],
            icon: 'fa-solid fa-building'
    },
    {
        type: 'mudejar',
        name: 'Arte mudéjar',
        keywords: ['aljaferia', 'la seo', 'san pablo', 'magdalena'],
        icon: 'fa-solid fa-torii-gate'
    },
    {
        type: 'romano',
        name: 'Arte romano',
        keywords: ['murallas', 'caesaraugusta'],
        icon: 'fa-solid fa-archway'
    }
]