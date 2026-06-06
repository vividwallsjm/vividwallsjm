export type GalleryCategory = 'All' | 'Residential' | 'Commercial' | 'Hotel' | 'Restaurant' | 'Signage';

export interface GalleryProject {
  id: number;
  name: string;
  category: Exclude<GalleryCategory, 'All'>;
  image: string;
  location: string;
  size: string;
  material: string;
  story: string;
  colors: [string, string];
  accent: string;
}

export const galleryProjects: GalleryProject[] = [
  // Residential — 3 tiles
  { id: 1,  name: 'Tile 1',  category: 'Residential', image: '/tile-photos/tile-1.jpg',  location: 'Kingston', size: '', material: '', story: '', colors: ['#1a4a2e', '#2d7a4a'], accent: '#a8e6c1' },
  { id: 2,  name: 'Tile 2',  category: 'Residential', image: '/tile-photos/tile-2.jpg',  location: 'Kingston', size: '', material: '', story: '', colors: ['#7a3a0a', '#c47a2a'], accent: '#f0d070' },
  { id: 3,  name: 'Tile 3',  category: 'Residential', image: '/tile-photos/tile-3.jpg',  location: 'Kingston', size: '', material: '', story: '', colors: ['#5a4a3a', '#8a7a6a'], accent: '#d0c0b0' },
  // Commercial — 2 tiles
  { id: 4,  name: 'Tile 4',  category: 'Commercial',  image: '/tile-photos/tile-4.jpg',  location: 'Kingston', size: '', material: '', story: '', colors: ['#1A1A1A', '#2D2D2D'], accent: '#E02226' },
  { id: 5,  name: 'Tile 5',  category: 'Commercial',  image: '/tile-photos/tile-5.jpg',  location: 'Kingston', size: '', material: '', story: '', colors: ['#1A1A1A', '#3a3a5a'], accent: '#aaaaff' },
  // Hotel — 3 tiles
  { id: 6,  name: 'Tile 6',  category: 'Hotel',       image: '/tile-photos/tile-6.jpg',  location: 'Montego Bay', size: '', material: '', story: '', colors: ['#0a4a7a', '#1a8abf'], accent: '#e0f4ff' },
  { id: 7,  name: 'Tile 7',  category: 'Hotel',       image: '/tile-photos/tile-7.jpg',  location: 'Ocho Rios', size: '', material: '', story: '', colors: ['#1a4a1a', '#3a7a3a'], accent: '#90e090' },
  { id: 8,  name: 'Tile 8',  category: 'Hotel',       image: '/tile-photos/tile-8.jpg',  location: 'Negril', size: '', material: '', story: '', colors: ['#4a2a0a', '#9a6a2a'], accent: '#e0c080' },
  // Restaurant — 2 tiles
  { id: 10, name: 'Tile 10', category: 'Restaurant',  image: '/tile-photos/tile-10.jpg', location: 'Kingston', size: '', material: '', story: '', colors: ['#7a2a0a', '#e05a1a'], accent: '#f0b060' },
  // Signage — 2 tiles
  { id: 11, name: 'Tile 11', category: 'Signage',     image: '/tile-photos/tile-11.jpg', location: 'Kingston', size: '', material: '', story: '', colors: ['#1A1A1A', '#8C1518'], accent: '#E02226' },
];

export const categories: GalleryCategory[] = ['All', 'Residential', 'Commercial', 'Hotel', 'Restaurant', 'Signage'];
