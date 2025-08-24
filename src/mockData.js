export const mockArticles = [
  {
    id: "1",
    title: "New era of vintage fashion: Teenagers are looking for new types of vintage fashions",
    description: "Young people are increasingly drawn to retro styles, creating a resurgence in vintage clothing markets. From 90s grunge to 70s disco, the demand for authentic period pieces has never been higher.",
    snippet: "Young people are increasingly drawn to retro styles, creating a resurgence in vintage clothing markets.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    author: "Sarah Johnson",
    url: "https://example.com/vintage-fashion-trend",
    published: "2024-02-09T10:00:00Z"
  },
  {
    id: "2", 
    title: "Volutpat sit neque faucius iaculis duis nec non",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    author: "Michael Chen",
    url: "https://example.com/article-2",
    published: "2024-02-09T09:30:00Z"
  },
  {
    id: "3",
    title: "Viverra vel pretium ultri cies sit vulputate at",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    snippet: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    author: "Emma Davis",
    url: "https://example.com/article-3", 
    published: "2024-02-09T08:45:00Z"
  },
  {
    id: "4",
    title: "Dictum sorry volutpat justo quis sodales magna",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    snippet: "Duis aute irure dolor in reprehenderit in voluptate velit.",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop",
    author: "David Wilson",
    url: "https://example.com/article-4",
    published: "2024-02-09T07:15:00Z"
  },
  {
    id: "5",
    title: "Retro gaming consoles making a comeback in modern homes",
    description: "Classic gaming systems from the 80s and 90s are finding new life as collectors and nostalgic gamers seek authentic experiences.",
    snippet: "Classic gaming systems from the 80s and 90s are finding new life.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    author: "Alex Thompson",
    url: "https://example.com/retro-gaming",
    published: "2024-02-09T06:30:00Z"
  },
  {
    id: "6",
    title: "Vinyl records outsell digital downloads for first time in decades",
    description: "The resurgence of vinyl continues as music lovers rediscover the warm sound and tactile experience of physical records.",
    snippet: "The resurgence of vinyl continues as music lovers rediscover.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop",
    author: "Lisa Rodriguez",
    url: "https://example.com/vinyl-resurgence",
    published: "2024-02-09T05:45:00Z"
  },
  {
    id: "7",
    title: "Polaroid cameras experiencing renaissance among young photographers",
    description: "Instant photography is back in vogue as Gen Z embraces the unique aesthetic and immediate gratification of instant film.",
    snippet: "Instant photography is back in vogue as Gen Z embraces.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
    author: "Chris Martinez",
    url: "https://example.com/polaroid-renaissance",
    published: "2024-02-09T04:20:00Z"
  },
  {
    id: "8",
    title: "Typewriters making unexpected return to modern offices",
    description: "Some companies are reintroducing typewriters for creative writing sessions, citing improved focus and reduced digital distractions.",
    snippet: "Some companies are reintroducing typewriters for creative writing.",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=800&auto=format&fit=crop",
    author: "Rachel Green",
    url: "https://example.com/typewriter-return",
    published: "2024-02-09T03:10:00Z"
  }
];

export const mockCategories = {
  "": mockArticles,
  "economy": mockArticles.filter((_, i) => i % 2 === 0),
  "sports": mockArticles.filter((_, i) => i % 3 === 0),
  "technology": mockArticles.filter((_, i) => i % 2 === 1),
  "entertainment": mockArticles.filter((_, i) => i % 4 === 0),
  "world": mockArticles.filter((_, i) => i % 3 === 1),
  "science": mockArticles.filter((_, i) => i % 4 === 1)
}; 