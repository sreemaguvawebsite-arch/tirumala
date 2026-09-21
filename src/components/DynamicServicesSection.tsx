import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Church, Users, Flower2, MapPin, BookOpen, HandHeart, Clock, DollarSign } from "lucide-react";
import { sevaService, type SevaItem } from "@/lib/supabase";
import { eventBus, EVENTS } from "@/lib/events";

// Fallback services if no data is available
const fallbackServices = [
  {
    icon: Church,
    title: "Temple Services",
    text: "Poojas, Sevas and special darshan arrangements.",
  },
  {
    icon: Users,
    title: "Community Support", 
    text: "Annadanam, educational support and welfare programs.",
  },
  {
    icon: Flower2,
    title: "Spiritual Events",
    text: "Festivals, bhajans and special programs.",
  },
  {
    icon: MapPin,
    title: "Pilgrimage Assistance",
    text: "Travel support and guidance for Tirumala visits.",
  },
  {
    icon: BookOpen,
    title: "Knowledge & Awareness",
    text: "Spiritual talks, literature and workshops.",
  },
  {
    icon: HandHeart,
    title: "Seva Opportunities", 
    text: "Be a part of our service initiatives.",
  },
];

const categoryIcons = {
  pooja: Church,
  abhishekam: Flower2,
  darshan: Users,
  other: HandHeart
};

export default function DynamicServicesSection() {
  const [sevaItems, setSevaItems] = useState<SevaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useSevaData, setUseSevaData] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    loadSevaItems();
    
    // Listen for seva updates from admin panel (same tab)
    const handleSevaUpdate = () => {
      console.log('Seva update event received, reloading data...'); // Debug
      setTimeout(loadSevaItems, 100); // Small delay to ensure data is saved
    };
    
    // Listen for cross-tab updates via localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin-update') {
        const update = e.newValue ? JSON.parse(e.newValue) : null;
        if (update && update.type === 'seva') {
          console.log('Cross-tab seva update detected, reloading data...');
          setTimeout(loadSevaItems, 100);
        }
      }
    };
    
    eventBus.on(EVENTS.SEVA_UPDATED, handleSevaUpdate);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      eventBus.off(EVENTS.SEVA_UPDATED, handleSevaUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const loadSevaItems = async () => {
    try {
      const items = await sevaService.getAll();
      console.log('Raw seva items from service:', items); // Debug: see all items
      const availableItems = items.filter(item => item.available);
      console.log('Available seva items:', availableItems); // Debug: see filtered items
      setSevaItems(availableItems);
      // Always use seva data - show admin content
      setUseSevaData(true);
      setLastUpdated(new Date());
      console.log('Loaded sevas:', availableItems.length, 'items', 'useSevaData: TRUE'); // Debug log
    } catch (error) {
      console.error('Error loading seva items:', error);
      setUseSevaData(true); // Still show admin interface even on error
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section
        id="services"
        className="relative overflow-hidden bg-navy py-24 text-ivory lg:py-28"
      >
        <div className="services-glow absolute inset-0" />
        <div className="relative mx-auto max-w-site px-6 text-center">
          <div className="text-ivory/60">Loading services...</div>
        </div>
      </section>
    );
  }

  console.log('DynamicServicesSection rendering:', { 
    useSevaData, 
    sevaItemsLength: sevaItems.length, 
    isLoading,
    sevaItems: sevaItems.map(item => ({ name: item.name, available: item.available }))
  }); // Debug log

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-navy py-24 text-ivory lg:py-28"
    >
      <div className="services-glow absolute inset-0" />

      <div className="relative mx-auto grid max-w-site gap-12 px-6 lg:grid-cols-[0.66fr_1.5fr] lg:items-center lg:px-14">
        <div>
          <p className="eyebrow">Our services</p>

          <h2 className="section-title mt-2 text-ivory">
            Temple Sevas
          </h2>

          <p className="mt-5 max-w-sm text-sm leading-6 text-ivory/75">
            Experience divine blessings through our traditional temple services and sevas.
          </p>

          {/* Debug indicator */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-2">
              <p className="text-xs text-ivory/40">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
              <button 
                onClick={() => {
                  console.log('Manual refresh clicked');
                  loadSevaItems();
                }}
                className="mt-1 text-xs text-gold hover:text-gold/80"
              >
                🔄 Refresh Data
              </button>
            </div>
          )}

          <Button
            asChild
            variant="gold"
            size="pill"
            className="mt-7"
          >
            <a href="#contact">
              Book Your Seva
              <ArrowRight />
            </a>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sevaItems.length > 0 ? (
            // Render admin seva items
            sevaItems.slice(0, 6).map((seva) => {
              console.log('Rendering seva:', seva.name, 'available:', seva.available); // Debug log
              const IconComponent = categoryIcons[seva.category] || HandHeart;
              
              return (
                <article
                  key={seva.id}
                  className="service-card group"
                >
                  <IconComponent
                    className="h-9 w-9 text-gold"
                    strokeWidth={1.5}
                  />

                  <h3 className="mt-4 font-display text-lg font-semibold">
                    {seva.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-ivory/75">
                    {seva.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-gold">
                      <DollarSign className="h-3 w-3" />
                      <span>₹{seva.price}</span>
                    </div>
                    <div className="flex items-center gap-1 text-ivory/60">
                      <Clock className="h-3 w-3" />
                      <span>{seva.duration}</span>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            // Show message when no sevas available
            <div className="col-span-full text-center text-ivory/60 py-8">
              <HandHeart className="mx-auto h-12 w-12 text-gold/50 mb-4" />
              <p className="text-lg">No sevas available</p>
              <p className="text-sm mt-2">Add some sevas in the admin panel to see them here!</p>
              <a 
                href="/admin" 
                className="inline-block mt-4 px-4 py-2 bg-gold text-navy rounded-md hover:bg-gold/90 transition-colors"
              >
                Go to Admin Panel
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}