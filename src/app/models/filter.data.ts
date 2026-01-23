import { Category } from "./filter.model";

export const categories: Category[] = [
    {
        type: 'museosExposiciones',
        name: 'Museos, exposiciones',
        keywords: ['museo', 'museum', 'lonja'],
    },
    {
        type: 'monumentosEsculturas',
        name: 'Monumentos, esculturas',
        keywords: ['puerta', 'estatua', 'murallas'],
    },
    {
        type: 'zonasVerdes',
        name: 'Zonas verdes',
        keywords: ['parque', 'canal'],
    },
    {
        type: 'arquitectura',
        name: 'Arquitectura',
        keywords: ['basilica', 'iglesia', 'palacio', 'casa', 'catedral', 'puente', 'zuda', 'mercado'],
    },
    {
        type: 'arteMudejar',
        name: 'Arte mudéjar',
        keywords: ['aljaferia', 'la seo', 'san pablo', 'magdalena'],

    },
    {
        type: 'arteRomano',
        name: 'Arte romano',
        keywords: ['murallas', 'caesaraugusta'],

    }
]