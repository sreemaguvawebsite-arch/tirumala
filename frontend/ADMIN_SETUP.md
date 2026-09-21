# Temple Admin Panel Setup Guide

## 🎯 Overview
The admin panel allows you to manage gallery images and temple sevas (services) through a simple web interface at `/admin`. Changes made in the admin panel will automatically reflect on the main website.

## 🚀 Quick Start (No Setup Required)
The admin panel works immediately with demo data. Simply:
1. Visit `http://localhost:8080/admin`
2. Start managing gallery and seva items
3. Changes are stored locally for demo purposes

## 📊 Supabase Integration (Production Setup)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project or use existing one
3. Wait for project to be ready

### Step 2: Set Up Database
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste the contents of `supabase-schema.sql`
3. Click **Run** to create tables and sample data

### Step 3: Configure Environment Variables
1. Copy `.env.example` to `.env`
2. Go to **Settings > API** in Supabase
3. Copy your Project URL and anon key
4. Update `.env` with your credentials:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Restart Development Server
```bash
npm run dev
```

## 🎨 Admin Panel Features

### Gallery Management
- ✅ Add new gallery images
- ✅ Edit titles, descriptions, and categories
- ✅ Delete images
- ✅ Organize by categories (ceremony, temple, festival, other)
- ✅ Real-time preview on main site

### Seva Management  
- ✅ Add new temple services (sevas)
- ✅ Set prices and duration
- ✅ Mark as available/unavailable
- ✅ Categorize (pooja, abhishekam, darshan, other)
- ✅ Instant updates on services section

## 🔧 Admin Panel Access
- **URL**: `http://localhost:8080/admin`
- **No Password Required**: Direct access as requested
- **Navigation**: Discreet "Admin" link in top navbar

## 📱 Features

### Gallery Section (Main Site)
- Displays admin-managed gallery items
- Horizontal scrolling carousel
- Click to view full-size images
- Category badges
- Falls back to static images if no admin data

### Services Section (Main Site)  
- Shows admin-managed seva items
- Displays pricing and duration
- Only shows available sevas
- Falls back to static services if no admin data

## 🛡️ Security Notes
- Current setup: No authentication (as requested)
- Production recommendation: Add authentication
- Row Level Security (RLS) enabled in Supabase
- Public policies allow full CRUD access

## 🔄 Data Flow
1. Admin adds/edits content at `/admin`
2. Data saves to Supabase database
3. Main site automatically fetches updated content
4. Changes appear instantly on website

## 📂 File Structure
```
src/
├── routes/
│   ├── admin.tsx          # Admin panel interface
│   └── index.tsx          # Main site (updated)
├── components/
│   ├── DynamicServicesSection.tsx    # Dynamic services
│   ├── DynamicGallerySection.tsx     # Dynamic gallery
│   └── IntroVideo.tsx               # Intro video
├── lib/
│   └── supabase.ts        # Database operations
├── .env.example           # Environment template
└── supabase-schema.sql    # Database schema
```

## 🎯 Usage Examples

### Adding Gallery Item
1. Go to `/admin`
2. Click "Gallery Management" tab
3. Click "Add Gallery Item"
4. Fill in title, description, image URL, category
5. Click "Save"
6. Item appears on main site instantly

### Managing Sevas
1. Go to `/admin`  
2. Click "Seva Management" tab
3. Click "Add Seva"
4. Enter name, description, price, duration, category
5. Set availability status
6. Click "Save" 
7. Available sevas show on main site

## 🆘 Troubleshooting

### Admin Panel Not Loading
- Check console for errors
- Verify Supabase credentials in `.env`
- Ensure development server is running

### Images Not Displaying
- Verify image URLs are accessible
- Use HTTPS URLs for production
- Check browser console for loading errors

### Data Not Saving
- Check Supabase project status
- Verify API keys are correct
- Check network tab for failed requests

## 🎨 Customization
- Colors follow temple theme (navy, gold, ivory)
- Responsive design works on all devices
- UI components use shadcn/ui library
- Consistent with main site design

The admin panel is now ready to use! Visit `/admin` to start managing your temple's content. 🙏