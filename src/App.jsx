import { useEffect, useMemo, useState } from 'react'
import { mockArticles, mockCategories } from './mockData.js'

const API_BASE = 'https://api.mediastack.com/v1';

function formatDate(d){
  return new Intl.DateTimeFormat('en-US', { weekday:'long', month:'long', day:'2-digit', year:'numeric' }).format(d)
}

function Pill({label, value, active, onClick}){
  return (
    <button
      className={`px-6 py-2 border-2 border-black text-xs whitespace-nowrap font-spectral ${active? 'bg-accent border-accent text-white font-bold':'bg-pill border-black font-bold'}`}
      onClick={onClick}
    >{label}</button>
  )
}

function ArticleCard({article, onOpen, onBookmark, isBookmarked}){
  const img = article.image || article.urlToImage || '/Image_not_found.jpg';
  return (
    <div className="grid grid-cols-[1fr_112px] gap-3 bg-white/5  cursor-pointer hover:bg-white/10 transition-colors" role="article" onClick={onOpen}>
      <div className="flex flex-col justify-between">
        <div className='pl-2'>
          <h3 className="font-bold text-[15px] leading-snug text-ink mb-2">{article.title}</h3>
          <p className="text-inkSoft text-[13px] line-clamp-2 leading-relaxed">{article.description || article.snippet || article.summary}</p>
        </div>
      </div>
      <div className="w-full aspect-square overflow-hidden bg-[#d7bbaa]">
        <img 
          src={img} 
          alt="" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/Image_not_found.jpg';
          }}
        />
      </div>
    </div>
  )
}

export default function App(){
  const apiKey = import.meta.env.VITE_MEDIASTACK_API_KEY || ''
  console.log('API key:', apiKey)

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [articles, setArticles] = useState([])
  const [featured, setFeatured] = useState(null)
  const [bookmarks, setBookmarks] = useState(() => new Set(JSON.parse(localStorage.getItem('BOOKMARKS')||'[]')))
  const [loading, setLoading] = useState(false)
  const [useMockData, setUseMockData] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [region, setRegion] = useState('world') // 'world' or 'india'
  const cats = useMemo(()=>[
    {label:'General', value:'general'},
    {label:'Business', value:'business'},
    {label:'Technology', value:'technology'},
    {label:'Sports', value:'sports'},
    {label:'Entertainment', value:'entertainment'},
    {label:'Health', value:'health'},
    {label:'Science', value:'science'},
  ],[])

  useEffect(()=>{ localStorage.setItem('BOOKMARKS', JSON.stringify([...bookmarks])) },[bookmarks])

  async function fetchNews(params={}){
    if(useMockData){
      setLoading(true)
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const categoryArticles = mockCategories[params.category || category || '']
      const filtered = query ? categoryArticles.filter(a => 
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.description.toLowerCase().includes(query.toLowerCase())
      ) : categoryArticles
      
      setArticles(filtered)
      setFeatured(filtered[0] || null)
      setLoading(false)
      return
    }

    if(!apiKey){ 
      console.log('No API key found. Please add VITE_MEDIASTACK_API_KEY to your .env file')
      setLoading(false)
      return 
    }
    
    setLoading(true)
    try {
      const url = new URL(`${API_BASE}/news`)
      const search = params.q || query || 'technology'
      url.searchParams.set('access_key', apiKey)
      url.searchParams.set('language','en')
      url.searchParams.set('limit', '20')
      
         if (region === 'india') {
       url.searchParams.set('countries', 'in');  // India-specific
     } else {
       // For global news, get news from multiple countries
       url.searchParams.set('countries', 'us,au,jp,cn');  // US, Australia, Japan, China
     }

      
      if(params.category && params.category !== 'general'){ 
        url.searchParams.set('categories', params.category) 
      }
      
      if(search && search !== 'technology'){
        url.searchParams.set('q', search)
      }

      console.log('Fetching from:', url.toString())
      console.log('Region:', region)
      const res = await fetch(url)
      const data = await res.json()
      
      if(data.error){
        console.error('API Error:', data.error)
        setLoading(false)
        return
      }
      
      console.log('API Response:', data)
      const list = data.data || []
      setArticles(list)
      setFeatured(list[0] || null)
    } catch (error) {
      console.error('Fetch error:', error)
    }
    setLoading(false)
  }

  function openArticle(a){
    const url = new URL('/article', window.location.origin)
    url.searchParams.set('title', a.title)
    url.searchParams.set('image', a.image||'')
    url.searchParams.set('author', a.author||'')
    url.searchParams.set('url', a.url)
    url.searchParams.set('description', a.description||a.summary||'')
    window.location.assign(url.toString())
  }

  function toggleBookmark(id){
    const next = new Set(bookmarks)
    if(next.has(id)) next.delete(id); else next.add(id)
    setBookmarks(next)
  }

  useEffect(()=>{ 
    if (apiKey) {
      fetchNews({}) 
    }
  }, [useMockData, apiKey, region])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMenu && !event.target.closest('.menu-container')) {
        setShowMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-[#edd3c4] to-paper">
        <div className="relative menu-container">
          <button 
            className="w-8 h-8 relative bg-pill border-2 border-ink rounded-md shadow-[2px_2px_0_0_#2b241f,4px_4px_0_0_#8a7a71] hover:shadow-[1px_1px_0_0_#2b241f,2px_2px_0_0_#8a7a71] active:shadow-[0px_0px_0_0_#2b241f,1px_1px_0_0_#8a7a71] active:translate-x-[1px] active:translate-y-[1px] transition-all duration-150" 
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Menu"
          >
            <div className="absolute inset-0 flex flex-col justify-center items-center gap-1">
              <div className="w-4 h-0.5 bg-ink rounded-full shadow-sm"></div>
              <div className="w-4 h-0.5 bg-ink rounded-full shadow-sm"></div>
              <div className="w-4 h-0.5 bg-ink rounded-full shadow-sm"></div>
            </div>
          </button>
          
          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute top-full left-0 mt-2 bg-white border-2 border-black shadow-lg z-50 min-w-[120px]">
              <button 
                className={`w-full px-4 py-2 text-left font-spectral text-sm hover:bg-gray-100 ${region === 'world' ? 'bg-accent text-white' : ''}`}
                onClick={() => {
                  setRegion('world')
                  setShowMenu(false)
                }}
              >
                🌍 World
              </button>
              <button 
                className={`w-full px-4 py-2 text-left font-spectral text-sm hover:bg-gray-100 ${region === 'india' ? 'bg-accent text-white' : ''}`}
                onClick={() => {
                  setRegion('india')
                  setShowMenu(false)
                }}
              >
                🇮🇳 India
              </button>
            </div>
          )}
        </div>
        <div className="font-libre uppercase tracking-[1px] font-bold text-center">
          <span className="text-[22px] text-ink">NEWS</span><span className="text-[22px] text-accent">PAPER</span>
        </div>
        <div className="w-7 h-7 rounded-full border border-ink bg-[#d9b6a3]" />
      </header>

      <main className="px-4 pb-8 max-w-[980px] mx-auto">
        {/* Date */}
        <p className="font-libre font-bold text-[12px]  mb-3 text-center">{formatDate(new Date())}</p>
        
        {/* API Status */}
        {!useMockData && (
          <div className="text-center mb-3">
            <span className={`inline-block px-2 py-1 text-xs font-plex rounded ${apiKey ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {apiKey ? '🟢 MediaStack API Connected' : '🔴 API Key Missing'}
            </span>
            <span className="ml-2 inline-block px-2 py-1 text-xs font-plex rounded bg-blue-100 text-blue-800">
              {region === 'india' ? '🇮🇳 India News' : '🌍 Global News'}
            </span>
          </div>
        )}

        {/* Search Bar */}
        <label className="flex items-center gap-2 border-2 border-black px-3 py-2 mb-4">
          <span className="text-ink">🔎</span>
          <input 
            value={query} 
            onChange={(e)=>setQuery(e.target.value)} 
            type="search" 
            placeholder="Explore news" 
            className="flex-1 bg-transparent outline-none font-spectral text-ink placeholder-black" 
          />
          <button className="bg-accent text-white px-3 py-1 rounded font-plex text-sm" onClick={()=>fetchNews({})}>Go</button>
        </label>

        {/* Featured Article */}
        {featured && (
          <section className="mb-6 border-2 border-black">
            <div className="aspect-[16/9] overflow-hidden bg-[#d7bbaa] rounded-md mb-3 p-3 pb-1">
              <img 
                src={featured.image || featured.urlToImage || '/Image_not_found.jpg'} 
                alt="" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/Image_not_found.jpg';
                }}
              />
            </div>
            <div className="flex items-start justify-between pl-3 pr-3 pt-0">
              <h2 className="font-spectral font-bold text-[18px] leading-snug text-ink pr-5 flex-1">{featured.title}</h2>
              <button className={`w-7 h-7 flex-shrink-0 border border-ink rounded ${bookmarks.has(featured.url)?'bg-accent border-accent text-white':''}`} onClick={()=>toggleBookmark(featured.url)} aria-label="Bookmark">
                <svg className="w-4 h-4 mx-auto mt-1" fill={bookmarks.has(featured.url) ? "white" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
           <button className="text-accent pl-3 pb-2 underline-offset-4 font-spectral text-sm" onClick={()=>openArticle(featured)}>Read more <span className='text-black font-bold text-lg'>→</span></button>
            
          </section>
        )}

        {/* Category Pills */}
        <nav className="flex gap-2 overflow-auto py-3 mb-4 scrollbar-hide">
          {cats.map(c=> (
            <Pill key={c.label} label={c.label} value={c.value} active={category===c.value} onClick={()=>{ setCategory(c.value); fetchNews({ category: c.value }) }} />
          ))}
        </nav>

        {/* Articles List */}
        {loading ? (
          <p className="text-center text-muted mt-4">Loading…</p>
        ) : (
          <section className="grid gap-5">
            {articles.slice(1).map((a, index) => (
              <div key={a.url} className={index < articles.slice(1).length - 1 ? 'border-b-2 border-black pb-3' : ''}>
                <ArticleCard article={a} onOpen={()=>openArticle(a)} onBookmark={()=>toggleBookmark(a.url)} isBookmarked={bookmarks.has(a.url)} />
              </div>
            ))}
          </section>
        )}

        <footer className="mt-6 text-center text-muted border-t border-dashed border-stroke pt-4 font-plex">
          © {new Date().getFullYear()} Newspaper · {useMockData ? 'Demo Mode' : 'Powered by MediaStack'}
        </footer>
      </main>
    </div>
  )
}

