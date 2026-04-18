export type GalleryCategory = 'All' | 'Residential' | 'Commercial' | 'Hotel' | 'Restaurant' | 'Signage';

export interface GalleryProject {
  id: number;
  name: string;
  category: Exclude<GalleryCategory, 'All'>;
  location: string;
  size: string;
  material: string;
  story: string;
  colors: [string, string];
  accent: string;
}

export const galleryProjects: GalleryProject[] = [
  {
    id: 1,
    name: 'Tropical Canopy Living Room',
    category: 'Residential',
    location: 'Cherry Gardens, Kingston',
    size: '6m × 3m (18 m²)',
    material: 'Painted plaster wall',
    story: 'A Kingston family wanted to bring the lush Jamaican rainforest into their living room. We printed a sweeping tropical canopy mural floor-to-ceiling, with hyper-realistic palm fronds and a hidden hummingbird detail the owners discovered weeks later.',
    colors: ['#1a4a2e', '#2d7a4a'],
    accent: '#a8e6c1',
  },
  {
    id: 2,
    name: 'Abstract Geometric Office Feature',
    category: 'Commercial',
    location: 'New Kingston Business District',
    size: '8m × 2.7m (21.6 m²)',
    material: 'Drywall / plasterboard',
    story: 'A fintech startup in New Kingston needed a bold, modern identity for their open-plan office. We designed and printed a large-scale geometric abstract mural in the company\'s brand colours, instantly transforming the bland white wall into a statement backdrop for video calls and client visits.',
    colors: ['#1A1A1A', '#2D2D2D'],
    accent: '#E02226',
  },
  {
    id: 3,
    name: 'Oceanfront Lobby Panorama',
    category: 'Hotel',
    location: 'Montego Bay Strip',
    size: '12m × 3m (36 m²)',
    material: 'Concrete block (sealed)',
    story: 'A boutique hotel needed an arresting arrival experience. We printed a photorealistic panoramic ocean view spanning the entire lobby wall — guests are greeted by crystal-clear turquoise Caribbean waters the moment they step inside.',
    colors: ['#0a4a7a', '#1a8abf'],
    accent: '#e0f4ff',
  },
  {
    id: 4,
    name: 'Spice Island Restaurant Feature Wall',
    category: 'Restaurant',
    location: 'Devon House, Kingston',
    size: '5m × 2.5m (12.5 m²)',
    material: 'Brick wall (sealed)',
    story: 'A heritage Jamaican restaurant wanted a wall that told the story of Jamaica\'s spice trade. We produced a richly detailed 3D-embossed mural showing scotch bonnet peppers, allspice berries, and ginger root with a tactile raised effect guests can feel.',
    colors: ['#7a1a0a', '#c43b1a'],
    accent: '#f0a070',
  },
  {
    id: 5,
    name: 'Brand Identity Retail Wall',
    category: 'Signage',
    location: 'Portmore Mall',
    size: '4m × 3m (12 m²)',
    material: 'MDF panel (installed)',
    story: 'A local fashion brand needed an Instagram-worthy backdrop in their new retail space. We printed the full logo, brand pattern, and campaign imagery at ultra-high resolution. Foot traffic and social media tags increased by 40% in the first month.',
    colors: ['#1A1A1A', '#8C1518'],
    accent: '#E02226',
  },
  {
    id: 6,
    name: 'Sunset Bedroom Escape',
    category: 'Residential',
    location: 'Stony Hill, Kingston',
    size: '4m × 2.8m (11.2 m²)',
    material: 'Painted plaster wall',
    story: 'A couple wanted their master bedroom to feel like a permanent sunset retreat. We printed a gradient Jamaican horizon — soft oranges, deep purples, and silhouetted Blue Mountains — across the full feature wall behind the headboard.',
    colors: ['#7a3a0a', '#c47a2a'],
    accent: '#f0d070',
  },
  {
    id: 7,
    name: 'Rooftop Bar Skyline Mural',
    category: 'Commercial',
    location: 'Downtown Kingston',
    size: '10m × 2.5m (25 m²)',
    material: 'Concrete block exterior (weather-sealed)',
    story: 'A rooftop bar needed a visual anchor for their outdoor space. We printed a stylised Kingston skyline silhouette on the exposed concrete parapet wall — durable enough to withstand the Caribbean heat, rain, and sea breeze year-round.',
    colors: ['#1A1A1A', '#3a3a5a'],
    accent: '#aaaaff',
  },
  {
    id: 8,
    name: 'Eco-Resort Lobby Immersion',
    category: 'Hotel',
    location: 'Ocho Rios Hillside',
    size: '14m × 3.2m (44.8 m²)',
    material: 'Smooth render wall',
    story: 'An eco-resort wanted guests to feel immersed in nature from the moment of arrival. Three connected walls in the lobby were printed with a wrap-around rainforest scene featuring endemic Jamaican wildlife — the Swallowtail butterfly, the Doctor Bird, and Red-billed Streamertail.',
    colors: ['#1a4a1a', '#3a7a3a'],
    accent: '#90e090',
  },
  {
    id: 9,
    name: 'Jerk Pit Feature Mural',
    category: 'Restaurant',
    location: 'Spanish Town Road, Kingston',
    size: '6m × 2.5m (15 m²)',
    material: 'Cinder block (sealed)',
    story: 'A beloved local jerk spot wanted a mural that captured the energy of Jamaican street food culture. We printed a vibrant, graffiti-inspired scene of a jerk drum, smoke rising, and bold typography: "Real Jerk. Real Jamaica." The owners say it\'s become a local landmark.',
    colors: ['#7a2a0a', '#e05a1a'],
    accent: '#f0b060',
  },
  {
    id: 10,
    name: '3D Stone Archway Illusion',
    category: 'Residential',
    location: 'Norbrook, Kingston',
    size: '3.5m × 3m (10.5 m²)',
    material: 'Smooth plaster wall',
    story: 'A homeowner wanted to add architectural character to a plain hallway wall. Using our 3D UV embossed technique, we created a photorealistic stone archway illusion with deep shadow detail — visitors consistently reach out to touch it, convinced it is real stone.',
    colors: ['#5a4a3a', '#8a7a6a'],
    accent: '#d0c0b0',
  },
];

export const categories: GalleryCategory[] = ['All', 'Residential', 'Commercial', 'Hotel', 'Restaurant', 'Signage'];
