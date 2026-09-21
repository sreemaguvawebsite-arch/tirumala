import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { galleryService, type GalleryItem } from "@/lib/supabase";
import { eventBus, EVENTS } from "@/lib/events";

// Fallback images if Supabase is not available
import lampsImage from "@/assets/gallery-lamps.jpg";
import corridorImage from "@/assets/gallery-corridor.jpg";
import ceremonyImage from "@/assets/gallery-ceremony.jpg";

const fallbackGallery = [
  {
    id: 1,
    title: "Festival Lights",
    description: "Beautiful lamp arrangements during festival celebrations",
    image_url: lampsImage,
    category: "festival" as const
  },
  {
    id: 2,
    title: "Temple Corridor",
    description: "Peaceful temple corridors showcasing traditional architecture",
    image_url: corridorImage,
    category: "temple" as const
  },
  {
    id: 3,
    title: "Sacred Ceremony",
    description: "Traditional ceremonies conducted at the temple",
    image_url: ceremonyImage,
    category: "ceremony" as const
  }
];

export default function DynamicGallerySection() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useGalleryData, setUseGalleryData] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadGalleryItems();
    
    // Listen for gallery updates from admin panel (same tab)
    const handleGalleryUpdate = () => {
      console.log('Gallery update event received, reloading data...'); // Debug
      setTimeout(loadGalleryItems, 100); // Small delay to ensure data is saved
    };
    
    // Listen for cross-tab updates via localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin-update') {
        const update = e.newValue ? JSON.parse(e.newValue) : null;
        if (update && update.type === 'gallery') {
          console.log('Cross-tab gallery update detected, reloading data...');
          setTimeout(loadGalleryItems, 100);
        }
      }
    };
    
    eventBus.on(EVENTS.GALLERY_UPDATED, handleGalleryUpdate);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      eventBus.off(EVENTS.GALLERY_UPDATED, handleGalleryUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const loadGalleryItems = async () => {
    try {
      const items = await galleryService.getAll();
      console.log('Raw gallery items from service:', items); // Debug: see all items
      setGalleryItems(items);
      // Force to use gallery data
      setUseGalleryData(true);
      console.log('Loaded gallery:', items.length, 'items', 'useGalleryData: FORCED TO TRUE'); // Debug log
    } catch (error) {
      console.error('Error loading gallery items:', error);
      setGalleryItems(fallbackGallery as GalleryItem[]);
      setUseGalleryData(true); // Even with fallback, show it
    } finally {
      setIsLoading(false);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainer.current) return;
    
    const scrollAmount = 300;
    const currentScroll = scrollContainer.current.scrollLeft;
    
    scrollContainer.current.scrollTo({
      left: direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  };

  const displayItems = useGalleryData ? galleryItems : fallbackGallery;

  if (isLoading) {
    return (
      <section className="bg-ivory py-24 text-navy lg:py-28">
        <div className="mx-auto max-w-site px-6 text-center">
          <div className="text-navy/60">Loading gallery...</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-ivory py-24 text-navy lg:py-28">
        <div className="mx-auto max-w-site px-6 lg:px-14">
          <div className="mb-12 text-center">
            <p className="eyebrow text-gold-dark">Experience the divine</p>
            <h2 className="section-title mt-2">
              {useGalleryData ? "Temple Gallery" : "Sacred Moments"}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-navy/75">
              {useGalleryData 
                ? "Explore the beauty and spirituality of our temple through these captured moments."
                : "Witness the beauty of our temple, ceremonies, and the spiritual atmosphere that surrounds us."
              }
            </p>
          </div>

          <div className="relative">
            {/* Navigation Buttons */}
            <div className="absolute -left-6 top-1/2 z-10 -translate-y-1/2 lg:-left-14">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scroll('left')}
                className="h-12 w-12 rounded-full bg-white/90 text-navy shadow-lg hover:bg-white hover:shadow-xl"
                aria-label="Previous images"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>

            <div className="absolute -right-6 top-1/2 z-10 -translate-y-1/2 lg:-right-14">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scroll('right')}
                className="h-12 w-12 rounded-full bg-white/90 text-navy shadow-lg hover:bg-white hover:shadow-xl"
                aria-label="Next images"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Gallery Grid */}
            <div
              ref={scrollContainer}
              className="scrollbar-hidden flex gap-6 overflow-x-auto pb-4"
            >
              {(() => {
                console.log('Gallery rendering:', { useGalleryData, itemsLength: displayItems.length }); // Debug
                return displayItems.map((item) => {
                  console.log('Rendering gallery item:', item.title, 'image:', item.image_url); // Debug
                  return (
                    <div
                      key={item.id}
                      className="group relative w-80 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl"
                      onClick={() => setSelectedImage(item)}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 transition-opacity group-hover:opacity-100">
                        <h3 className="font-display text-lg font-semibold">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-white/90">
                          {item.description}
                        </p>
                      </div>

                      <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                          <Eye className="h-5 w-5 text-white" />
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-gold/90 px-3 py-1 text-xs font-medium text-navy capitalize">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-xl font-display font-semibold text-white">
                {selectedImage.title}
              </h3>
              <p className="mt-2 text-white/90">
                {selectedImage.description}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute right-4 top-4 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <ArrowRight className="h-5 w-5 rotate-45" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}