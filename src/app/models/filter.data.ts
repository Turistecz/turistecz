import { Category } from "./filter.model";

export const categories: Category[] = [
    {
        type: 'museos_exposiciones',
        name: 'Museos/Exposiciones',
        keywords: ['museo', 'museum', 'lonja'],
    },
    {
        type: 'monumentos_esculturas',
        name: 'Monumentos/Esculturas',
        keywords: ['puerta', 'estatua', 'murallas'],
    },
    {
        type: 'zonas_verdes',
        name: 'Zonas verdes',
        keywords: ['parque', 'canal'],
    },
    {
        type: 'arquitectura',
        name: 'Arquitectura',
        keywords: ['basilica', 'iglesia', 'palacio', 'casa', 'catedral', 'puente', 'zuda', 'mercado'],
    },
    {
        type: 'arte_mudejar',
        name: 'Arte mudéjar',
        keywords: ['aljaferia', 'la seo', 'san pablo', 'magdalena'],

    },
    {
        type: 'arte_romano',
        name: 'Arte romano',
        keywords: ['murallas', 'caesaraugusta'],

    }
]