import { createClient } from '@supabase/supabase-js'
import { eventBus, EVENTS } from './events'

// For demo purposes, using placeholder URLs
// In production, you'll need to replace these with your actual Supabase project credentials
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'demo-key'

// Check if Supabase is properly configured
const isSupabaseConfigured = 
  process.env.VITE_SUPABASE_URL && 
  process.env.VITE_SUPABASE_ANON_KEY &&
  !process.env.VITE_SUPABASE_URL.includes('your-project-ref') &&
  !process.env.VITE_SUPABASE_ANON_KEY.includes('your-anon-key')

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null

// Database table schemas
export interface GalleryItem {
  id: number
  title: string
  description: string
  image_url: string
  category: 'ceremony' | 'temple' | 'festival' | 'other'
  created_at: string
  updated_at: string
}

export interface SevaItem {
  id: number
  name: string
  description: string
  price: number
  duration: string
  category: 'pooja' | 'abhishekam' | 'darshan' | 'other'
  available: boolean
  created_at: string
  updated_at: string
}

// Simple cross-tab communication using localStorage events
export const broadcastUpdate = (type: 'gallery' | 'seva') => {
  // Only in browser environment
  if (!isBrowser) return;
  
  // Trigger storage event to notify other tabs
  const event = { type, timestamp: Date.now() };
  localStorage.setItem('admin-update', JSON.stringify(event));
  localStorage.removeItem('admin-update'); // Trigger the storage event
};

// Mock data for demo purposes
const mockGalleryData: GalleryItem[] = [
  {
    id: 1,
    title: "Temple Ceremony",
    description: "Beautiful ceremony at the temple with devotees participating in traditional rituals",
    image_url: "/src/assets/gallery-ceremony.jpg",
    category: "ceremony",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "Temple Corridor", 
    description: "Peaceful corridor showing the temple architecture and spiritual atmosphere",
    image_url: "/src/assets/gallery-corridor.jpg",
    category: "temple",
    created_at: "2024-01-14T10:00:00Z",
    updated_at: "2024-01-14T10:00:00Z"
  },
  {
    id: 3,
    title: "Festival Lights",
    description: "Illuminated temple during festival celebrations with beautiful lamp arrangements",
    image_url: "/src/assets/gallery-lamps.jpg",
    category: "festival",
    created_at: "2024-01-13T10:00:00Z",
    updated_at: "2024-01-13T10:00:00Z"
  }
];

const mockSevaData: SevaItem[] = [
  {
    id: 1,
    name: "Suprabhatam Seva",
    description: "Early morning wake-up service for Lord Venkateswara with chanting and prayers",
    price: 500,
    duration: "30 minutes",
    category: "pooja",
    available: true,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    name: "Abhishekam",
    description: "Sacred bathing ceremony of the deity with milk, honey, and holy water",
    price: 1500,
    duration: "45 minutes", 
    category: "abhishekam",
    available: true,
    created_at: "2024-01-14T10:00:00Z",
    updated_at: "2024-01-14T10:00:00Z"
  },
  {
    id: 3,
    name: "Special Darshan",
    description: "VIP darshan with priority access and longer viewing time of the deity",
    price: 300,
    duration: "15 minutes",
    category: "darshan",
    available: false,
    created_at: "2024-01-13T10:00:00Z",
    updated_at: "2024-01-13T10:00:00Z"
  },
  {
    id: 4,
    name: "Archana",
    description: "Personal prayer service with name chanting and flower offerings",
    price: 200,
    duration: "20 minutes",
    category: "pooja", 
    available: true,
    created_at: "2024-01-12T10:00:00Z",
    updated_at: "2024-01-12T10:00:00Z"
  }
];

// Browser storage keys
const GALLERY_STORAGE_KEY = 'temple-gallery-data';
const SEVA_STORAGE_KEY = 'temple-seva-data';

// Check if we're in the browser (not server-side)
const isBrowser = typeof window !== 'undefined';

// Initialize storage with mock data if empty (only in browser)
if (isBrowser) {
  if (!localStorage.getItem(GALLERY_STORAGE_KEY)) {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(mockGalleryData));
  }
  if (!localStorage.getItem(SEVA_STORAGE_KEY)) {
    localStorage.setItem(SEVA_STORAGE_KEY, JSON.stringify(mockSevaData));
  }
}

let nextGalleryId = Math.max(...mockGalleryData.map(item => item.id)) + 1;
let nextSevaId = Math.max(...mockSevaData.map(item => item.id)) + 1;

// Database operations for Gallery
export const galleryService = {
  async getAll(): Promise<GalleryItem[]> {
    if (!supabase) {
      // Get data from localStorage (browser only)
      if (isBrowser) {
        const stored = localStorage.getItem(GALLERY_STORAGE_KEY);
        const data = stored ? JSON.parse(stored) : mockGalleryData;
        console.log('Gallery getAll - returning stored data:', data.length, 'items');
        return Promise.resolve(data);
      } else {
        // Return mock data for server-side rendering
        return Promise.resolve(mockGalleryData);
      }
    }

    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async create(item: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>): Promise<GalleryItem> {
    if (!supabase) {
      // Use localStorage for demo (browser only)
      if (!isBrowser) {
        throw new Error('Cannot create items on server-side');
      }
      
      const stored = localStorage.getItem(GALLERY_STORAGE_KEY);
      const currentData = stored ? JSON.parse(stored) : [];
      
      const newItem: GalleryItem = {
        ...item,
        id: nextGalleryId++,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const updatedData = [newItem, ...currentData];
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updatedData));
      
      console.log('Gallery item created:', newItem.title);
      broadcastUpdate('gallery');
      eventBus.emit(EVENTS.GALLERY_UPDATED);
      
      return Promise.resolve(newItem);
    }

    const { data, error } = await supabase
      .from('gallery_items')
      .insert([item])
      .select()
      .single()
    
    if (error) throw error
    eventBus.emit(EVENTS.GALLERY_UPDATED);
    return data
  },

  async update(id: number, item: Partial<Omit<GalleryItem, 'id' | 'created_at'>>): Promise<GalleryItem> {
    if (!supabase) {
      // Use localStorage for demo (browser only)
      if (!isBrowser) {
        throw new Error('Cannot update items on server-side');
      }
      
      const stored = localStorage.getItem(GALLERY_STORAGE_KEY);
      const currentData = stored ? JSON.parse(stored) : [];
      const itemIndex = currentData.findIndex((g: GalleryItem) => g.id === id);
      
      if (itemIndex === -1) throw new Error('Item not found');
      
      const updatedItem = {
        ...currentData[itemIndex],
        ...item,
        updated_at: new Date().toISOString()
      };
      
      currentData[itemIndex] = updatedItem;
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(currentData));
      
      console.log('Gallery item updated:', updatedItem.title);
      broadcastUpdate('gallery');
      eventBus.emit(EVENTS.GALLERY_UPDATED);
      
      return Promise.resolve(updatedItem);
    }

    const { data, error } = await supabase
      .from('gallery_items')
      .update({ ...item, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    eventBus.emit(EVENTS.GALLERY_UPDATED);
    return data
  },

  async delete(id: number): Promise<void> {
    if (!supabase) {
      // Use localStorage for demo (browser only)
      if (!isBrowser) {
        throw new Error('Cannot delete items on server-side');
      }
      
      const stored = localStorage.getItem(GALLERY_STORAGE_KEY);
      const currentData = stored ? JSON.parse(stored) : [];
      const filteredData = currentData.filter((item: GalleryItem) => item.id !== id);
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(filteredData));
      
      console.log('Gallery item deleted:', id);
      broadcastUpdate('gallery');
      eventBus.emit(EVENTS.GALLERY_UPDATED);
      
      return Promise.resolve();
    }

    const { error } = await supabase
      .from('gallery_items')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    eventBus.emit(EVENTS.GALLERY_UPDATED);
  }
}

// Database operations for Sevas
export const sevaService = {
  async getAll(): Promise<SevaItem[]> {
    if (!supabase) {
      // Get data from localStorage (browser only)
      if (isBrowser) {
        const stored = localStorage.getItem(SEVA_STORAGE_KEY);
        const data = stored ? JSON.parse(stored) : mockSevaData;
        console.log('Seva getAll - returning stored data:', data.length, 'items');
        return Promise.resolve(data);
      } else {
        // Return mock data for server-side rendering
        return Promise.resolve(mockSevaData);
      }
    }

    const { data, error } = await supabase
      .from('seva_items')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data || []
  },

  async create(item: Omit<SevaItem, 'id' | 'created_at' | 'updated_at'>): Promise<SevaItem> {
    if (!supabase) {
      // Use localStorage for demo (browser only)
      if (!isBrowser) {
        throw new Error('Cannot create items on server-side');
      }
      
      const stored = localStorage.getItem(SEVA_STORAGE_KEY);
      const currentData = stored ? JSON.parse(stored) : [];
      
      const newItem: SevaItem = {
        ...item,
        id: nextSevaId++,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const updatedData = [newItem, ...currentData];
      localStorage.setItem(SEVA_STORAGE_KEY, JSON.stringify(updatedData));
      
      console.log('Seva created:', newItem.name);
      broadcastUpdate('seva');
      eventBus.emit(EVENTS.SEVA_UPDATED);
      
      return Promise.resolve(newItem);
    }

    const { data, error } = await supabase
      .from('seva_items')
      .insert([item])
      .select()
      .single()
    
    if (error) throw error
    eventBus.emit(EVENTS.SEVA_UPDATED);
    return data
  },

  async update(id: number, item: Partial<Omit<SevaItem, 'id' | 'created_at'>>): Promise<SevaItem> {
    if (!supabase) {
      // Use localStorage for demo (browser only)
      if (!isBrowser) {
        throw new Error('Cannot update items on server-side');
      }
      
      const stored = localStorage.getItem(SEVA_STORAGE_KEY);
      const currentData = stored ? JSON.parse(stored) : [];
      const itemIndex = currentData.findIndex((s: SevaItem) => s.id === id);
      
      if (itemIndex === -1) throw new Error('Item not found');
      
      const updatedItem = {
        ...currentData[itemIndex],
        ...item,
        updated_at: new Date().toISOString()
      };
      
      currentData[itemIndex] = updatedItem;
      localStorage.setItem(SEVA_STORAGE_KEY, JSON.stringify(currentData));
      
      console.log('Seva updated:', updatedItem.name);
      broadcastUpdate('seva');
      eventBus.emit(EVENTS.SEVA_UPDATED);
      
      return Promise.resolve(updatedItem);
    }

    const { data, error } = await supabase
      .from('seva_items')
      .update({ ...item, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    eventBus.emit(EVENTS.SEVA_UPDATED);
    return data
  },

  async delete(id: number): Promise<void> {
    if (!supabase) {
      // Use localStorage for demo (browser only)
      if (!isBrowser) {
        throw new Error('Cannot delete items on server-side');
      }
      
      const stored = localStorage.getItem(SEVA_STORAGE_KEY);
      const currentData = stored ? JSON.parse(stored) : [];
      const filteredData = currentData.filter((item: SevaItem) => item.id !== id);
      localStorage.setItem(SEVA_STORAGE_KEY, JSON.stringify(filteredData));
      
      console.log('Seva deleted:', id);
      broadcastUpdate('seva');
      eventBus.emit(EVENTS.SEVA_UPDATED);
      
      return Promise.resolve();
    }

    const { error } = await supabase
      .from('seva_items')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    eventBus.emit(EVENTS.SEVA_UPDATED);
  }
}