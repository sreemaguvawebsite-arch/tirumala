// Simple event system for real-time updates between admin and main site
type EventCallback = () => void;

class EventEmitter {
  private events: { [key: string]: EventCallback[] } = {};

  on(event: string, callback: EventCallback) {
    console.log('Event listener added for:', event); // Debug log
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event: string, callback: EventCallback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  emit(event: string) {
    console.log('Event emitted:', event); // Debug log
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback());
  }
}

export const eventBus = new EventEmitter();

// Event constants
export const EVENTS = {
  GALLERY_UPDATED: 'gallery_updated',
  SEVA_UPDATED: 'seva_updated'
};