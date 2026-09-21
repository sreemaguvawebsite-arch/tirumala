-- Supabase SQL Schema for Temple Admin Panel
-- Run these commands in your Supabase SQL Editor

-- Create Gallery Items Table
CREATE TABLE gallery_items (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT CHECK (category IN ('ceremony', 'temple', 'festival', 'other')) DEFAULT 'other',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Seva Items Table
CREATE TABLE seva_items (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  duration TEXT,
  category TEXT CHECK (category IN ('pooja', 'abhishekam', 'darshan', 'other')) DEFAULT 'other',
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) - For basic security
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE seva_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since no authentication required)
CREATE POLICY "Allow public read access on gallery_items" ON gallery_items
  FOR SELECT USING (true);

CREATE POLICY "Allow public write access on gallery_items" ON gallery_items
  FOR ALL USING (true);

CREATE POLICY "Allow public read access on seva_items" ON seva_items
  FOR SELECT USING (true);

CREATE POLICY "Allow public write access on seva_items" ON seva_items
  FOR ALL USING (true);

-- Insert sample data for Gallery
INSERT INTO gallery_items (title, description, image_url, category) VALUES
('Temple Ceremony', 'Beautiful ceremony at the temple with devotees participating in traditional rituals', 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop', 'ceremony'),
('Temple Architecture', 'Magnificent temple architecture showcasing traditional South Indian design', 'https://images.unsplash.com/photo-1545577944-ac3c9c4e9038?w=500&h=300&fit=crop', 'temple'),
('Festival Celebration', 'Vibrant festival celebrations with colorful decorations and devotees', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop', 'festival'),
('Peaceful Meditation', 'Devotees in peaceful meditation within the temple premises', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop', 'other');

-- Insert sample data for Sevas
INSERT INTO seva_items (name, description, price, duration, category, available) VALUES
('Suprabhatam Seva', 'Early morning wake-up service for Lord Venkateswara with chanting and prayers', 500.00, '30 minutes', 'pooja', true),
('Abhishekam', 'Sacred bathing ceremony of the deity with milk, honey, and holy water', 1500.00, '45 minutes', 'abhishekam', true),
('Special Darshan', 'VIP darshan with priority access and longer viewing time of the deity', 300.00, '15 minutes', 'darshan', true),
('Archana', 'Personal prayer service with name chanting and flower offerings', 200.00, '20 minutes', 'pooja', true),
('Kalyanotsavam', 'Divine marriage ceremony celebration with elaborate rituals', 2500.00, '2 hours', 'other', false),
('Sahasra Namavali', 'Chanting of 1000 names of Lord Venkateswara', 750.00, '1 hour', 'pooja', true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at field
CREATE TRIGGER update_gallery_items_updated_at BEFORE UPDATE ON gallery_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seva_items_updated_at BEFORE UPDATE ON seva_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();