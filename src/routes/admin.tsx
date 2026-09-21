import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Image,
  Calendar,
  DollarSign,
  Clock,
  Eye,
  EyeOff,
  Lock,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  galleryService, 
  sevaService, 
  supabase,
  type GalleryItem, 
  type SevaItem 
} from "@/lib/supabase";

const ADMIN_PIN = "123456987";
const PIN_SESSION_KEY = "admin-authenticated";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      {
        title: "Admin Panel - Narayana Tirumala",
      },
      {
        name: "description",
        content: "Admin panel for managing gallery and seva items",
      },
    ],
  }),
  component: AdminPanel,
});

function PinAuthScreen({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pin === ADMIN_PIN) {
      // Store authentication in sessionStorage
      sessionStorage.setItem(PIN_SESSION_KEY, "true");
      onAuthenticated();
    } else {
      setError("Invalid PIN. Please try again.");
      setAttempts(prev => prev + 1);
      setPin("");
      
      // Add slight delay after failed attempts
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-soft to-navy flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-gold/20 bg-navy-soft/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
            <Shield className="h-8 w-8 text-gold" />
          </div>
          <CardTitle className="text-2xl font-display text-ivory">
            Admin Access
          </CardTitle>
          <p className="text-sm text-ivory/60">
            Enter PIN to access the admin panel
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="bg-navy/50 border-gold/30 text-ivory text-center text-lg tracking-widest"
                maxLength={9}
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-400 text-center">{error}</p>
              )}
              {attempts > 2 && (
                <p className="mt-2 text-xs text-ivory/40 text-center">
                  Multiple failed attempts detected
                </p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gold text-navy hover:bg-gold/90"
              disabled={pin.length < 6}
            >
              <Lock className="mr-2 h-4 w-4" />
              Access Admin Panel
            </Button>
          </form>
          
          <div className="mt-6 pt-4 border-t border-gold/20">
            <p className="text-xs text-ivory/40 text-center">
              Secured admin access for Narayana Tirumala
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'gallery' | 'sevas'>('gallery');
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [sevaItems, setSevaItems] = useState<SevaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem(PIN_SESSION_KEY) === "true";
    setIsAuthenticated(isAuth);
    if (isAuth) {
      loadData();
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem(PIN_SESSION_KEY);
    setIsAuthenticated(false);
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    loadData();
  };

  // Load data
  const loadData = async () => {
    try {
      setIsLoading(true);
      const [gallery, sevas] = await Promise.all([
        galleryService.getAll(),
        sevaService.getAll()
      ]);
      setGalleryItems(gallery);
      setSevaItems(sevas);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show PIN screen if not authenticated
  if (!isAuthenticated) {
    return <PinAuthScreen onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-soft to-navy">
      <header className="border-b border-gold/20 bg-navy/90 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-semibold text-ivory">
                Admin Panel
              </h1>
              <p className="text-sm text-ivory/60">
                Manage gallery and seva items
              </p>
              {!supabase && (
                <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-gold/20 px-2 py-1 text-xs text-gold">
                  <div className="h-2 w-2 rounded-full bg-gold"></div>
                  Demo Mode - Changes saved locally
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="ghost"
                className="text-ivory hover:bg-ivory/10"
              >
                <a href="/">← Back to Site</a>
              </Button>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-red-400 hover:bg-red-400/10"
              >
                <Lock className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl p-6">
        {/* Tabs */}
        <div className="mb-6 flex space-x-1 rounded-lg bg-navy-soft/50 p-1">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
              activeTab === 'gallery'
                ? 'bg-gold text-navy shadow-md'
                : 'text-ivory hover:bg-ivory/10'
            }`}
          >
            <Image className="mr-2 inline h-4 w-4" />
            Gallery Management
          </button>
          <button
            onClick={() => setActiveTab('sevas')}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
              activeTab === 'sevas'
                ? 'bg-gold text-navy shadow-md'
                : 'text-ivory hover:bg-ivory/10'
            }`}
          >
            <Calendar className="mr-2 inline h-4 w-4" />
            Seva Management
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="text-center text-ivory">Loading...</div>
        ) : (
          <>
            {activeTab === 'gallery' && (
              <GalleryManagement
                items={galleryItems}
                setItems={setGalleryItems}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                showAddForm={showAddForm}
                setShowAddForm={setShowAddForm}
              />
            )}
            {activeTab === 'sevas' && (
              <SevaManagement
                items={sevaItems}
                setItems={setSevaItems}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                showAddForm={showAddForm}
                setShowAddForm={setShowAddForm}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Gallery Management Component
function GalleryManagement({ 
  items, 
  setItems, 
  editingItem, 
  setEditingItem,
  showAddForm,
  setShowAddForm 
}: {
  items: GalleryItem[];
  setItems: (items: GalleryItem[]) => void;
  editingItem: string | null;
  setEditingItem: (id: string | null) => void;
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
}) {
  const [formData, setFormData] = useState<Partial<GalleryItem>>({});

  const handleSave = async () => {
    try {
      if (editingItem && editingItem !== 'new') {
        // Update existing
        const updated = await galleryService.update(parseInt(editingItem), formData);
        setItems(items.map(item => item.id === parseInt(editingItem) ? updated : item));
        console.log('Gallery item updated:', updated.title); // Debug log
      } else {
        // Create new
        const created = await galleryService.create(formData as Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>);
        setItems([created, ...items]);
        console.log('Gallery item created:', created.title); // Debug log
      }
      setEditingItem(null);
      setShowAddForm(false);
      setFormData({});
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await galleryService.delete(id);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-display text-ivory">Gallery Items</h2>
        <Button
          onClick={() => {
            setShowAddForm(true);
            setEditingItem('new');
            setFormData({});
          }}
          className="bg-gold text-navy hover:bg-gold/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Gallery Item
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingItem) && (
        <Card className="border-gold/20 bg-navy-soft/50">
          <CardHeader>
            <CardTitle className="text-ivory">
              {editingItem === 'new' ? 'Add New Gallery Item' : 'Edit Gallery Item'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Title"
              value={formData.title || ''}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="bg-navy/50 border-gold/30 text-ivory"
            />
            <Textarea
              placeholder="Description"
              value={formData.description || ''}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="bg-navy/50 border-gold/30 text-ivory"
            />
            <Input
              placeholder="Image URL"
              value={formData.image_url || ''}
              onChange={(e) => setFormData({...formData, image_url: e.target.value})}
              className="bg-navy/50 border-gold/30 text-ivory"
            />
            <select
              value={formData.category || ''}
              onChange={(e) => setFormData({...formData, category: e.target.value as GalleryItem['category']})}
              className="w-full rounded-md border border-gold/30 bg-navy/50 px-3 py-2 text-ivory"
            >
              <option value="">Select Category</option>
              <option value="ceremony">Ceremony</option>
              <option value="temple">Temple</option>
              <option value="festival">Festival</option>
              <option value="other">Other</option>
            </select>
            
            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-gold text-navy hover:bg-gold/90">
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setEditingItem(null);
                  setShowAddForm(false);
                  setFormData({});
                }}
                className="text-ivory hover:bg-ivory/10"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gallery Items Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="border-gold/20 bg-navy-soft/50">
            <CardContent className="p-4">
              <div className="aspect-video rounded-md bg-navy/50 mb-3 overflow-hidden">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-ivory/50">
                    <Image className="h-8 w-8" />
                  </div>
                )}
              </div>
              
              <h3 className="font-medium text-ivory truncate">{item.title}</h3>
              <p className="text-sm text-ivory/60 line-clamp-2 mt-1">{item.description}</p>
              
              <div className="flex items-center justify-between mt-3">
                <Badge variant="secondary" className="bg-gold/20 text-gold">
                  {item.category}
                </Badge>
                
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingItem(item.id.toString());
                      setFormData(item);
                    }}
                    className="h-8 w-8 p-0 text-ivory hover:bg-ivory/10"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(item.id)}
                    className="h-8 w-8 p-0 text-red-400 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Seva Management Component
function SevaManagement({ 
  items, 
  setItems, 
  editingItem, 
  setEditingItem,
  showAddForm,
  setShowAddForm 
}: {
  items: SevaItem[];
  setItems: (items: SevaItem[]) => void;
  editingItem: string | null;
  setEditingItem: (id: string | null) => void;
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
}) {
  const [formData, setFormData] = useState<Partial<SevaItem>>({});

  const handleSave = async () => {
    try {
      if (editingItem && editingItem !== 'new') {
        // Update existing
        const updated = await sevaService.update(parseInt(editingItem), formData);
        setItems(items.map(item => item.id === parseInt(editingItem) ? updated : item));
        console.log('Seva updated:', updated.name); // Debug log
      } else {
        // Create new
        const created = await sevaService.create(formData as Omit<SevaItem, 'id' | 'created_at' | 'updated_at'>);
        setItems([created, ...items]);
        console.log('Seva created:', created.name); // Debug log
      }
      setEditingItem(null);
      setShowAddForm(false);
      setFormData({});
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await sevaService.delete(id);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-display text-ivory">Seva Items</h2>
        <Button
          onClick={() => {
            setShowAddForm(true);
            setEditingItem('new');
            setFormData({});
          }}
          className="bg-gold text-navy hover:bg-gold/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Seva
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingItem) && (
        <Card className="border-gold/20 bg-navy-soft/50">
          <CardHeader>
            <CardTitle className="text-ivory">
              {editingItem === 'new' ? 'Add New Seva' : 'Edit Seva'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Seva Name"
              value={formData.name || ''}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-navy/50 border-gold/30 text-ivory"
            />
            <Textarea
              placeholder="Description"
              value={formData.description || ''}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="bg-navy/50 border-gold/30 text-ivory"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Price (₹)"
                value={formData.price || ''}
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                className="bg-navy/50 border-gold/30 text-ivory"
              />
              <Input
                placeholder="Duration (e.g., 30 mins)"
                value={formData.duration || ''}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="bg-navy/50 border-gold/30 text-ivory"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={formData.category || ''}
                onChange={(e) => setFormData({...formData, category: e.target.value as SevaItem['category']})}
                className="flex-1 rounded-md border border-gold/30 bg-navy/50 px-3 py-2 text-ivory"
              >
                <option value="">Select Category</option>
                <option value="pooja">Pooja</option>
                <option value="abhishekam">Abhishekam</option>
                <option value="darshan">Darshan</option>
                <option value="other">Other</option>
              </select>
              <label className="flex items-center gap-2 text-ivory">
                <input
                  type="checkbox"
                  checked={formData.available || false}
                  onChange={(e) => setFormData({...formData, available: e.target.checked})}
                  className="rounded border-gold/30"
                />
                Available
              </label>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-gold text-navy hover:bg-gold/90">
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setEditingItem(null);
                  setShowAddForm(false);
                  setFormData({});
                }}
                className="text-ivory hover:bg-ivory/10"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seva Items Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="border-gold/20 bg-navy-soft/50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-ivory">{item.name}</h3>
                <div className="flex items-center gap-1">
                  {item.available ? (
                    <Eye className="h-4 w-4 text-green-400" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-red-400" />
                  )}
                  <Badge variant={item.available ? "default" : "secondary"}>
                    {item.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-ivory/60 line-clamp-2 mb-3">{item.description}</p>
              
              <div className="flex items-center gap-4 mb-3 text-sm">
                <div className="flex items-center gap-1 text-gold">
                  <DollarSign className="h-3 w-3" />
                  ₹{item.price}
                </div>
                <div className="flex items-center gap-1 text-ivory/60">
                  <Clock className="h-3 w-3" />
                  {item.duration}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-gold/20 text-gold">
                  {item.category}
                </Badge>
                
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingItem(item.id.toString());
                      setFormData(item);
                    }}
                    className="h-8 w-8 p-0 text-ivory hover:bg-ivory/10"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(item.id)}
                    className="h-8 w-8 p-0 text-red-400 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

