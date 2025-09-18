import { Category } from "./filter.model";

export const categories: Category[] = [
    {
        type: 'museos',
        name: 'Museos/Exposiciones',
        keywords: ['museo', 'museum', 'lonja'],
    },
    {
        type: 'monumentos',
        name: 'Monumentos/Esculturas',
        keywords: ['puerta', 'estatua', 'murallas'],
    },
    {
        type: 'zonas-verdes',
        name: 'Zonas verdes',
        keywords: ['parque', 'canal'],
    },
    {
        type: 'arquitectura',
        name: 'Arquitectura',
        keywords: ['basilica', 'iglesia', 'palacio', 'casa', 'catedral', 'puente', 'zuda', 'mercado'],
    },
    {
        type: 'mudejar',
        name: 'Arte mudéjar',
        keywords: ['aljaferia', 'la seo', 'san pablo', 'magdalena'],

    },
    {
        type: 'romano',
        name: 'Arte romano',
        keywords: ['murallas', 'caesaraugusta'],

    }
]