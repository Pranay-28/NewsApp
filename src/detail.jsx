import { useMemo, useState } from 'react'

function getParams(){
  const p = new URLSearchParams(location.search)
  return {
    title: p.get('title')||'',
    image: p.get('image')||'',
    author: p.get('author')||'',
    url: p.get('url')||'',
    description: p.get('description')||'',
  }
}

export default function Detail(){
  const params = useMemo(()=>getParams(), [])
  const [bookmarked, setBookmarked] = useState(()=>{
    const set = new Set(JSON.parse(localStorage.getItem('BOOKMARKS')||'[]'))
    return set.has(params.url)
  })

  function toggle(){
    const set = new Set(JSON.parse(localStorage.getItem('BOOKMARKS')||'[]'))
    if(set.has(params.url)) set.delete(params.url); else set.add(params.url)
    localStorage.setItem('BOOKMARKS', JSON.stringify([...set]))
    setBookmarked(set.has(params.url))
  }

  const shareLink = encodeURIComponent(params.url)
  const shareText = encodeURIComponent(params.title)

  return (
    <div className="min-h-screen bg-paper">
    <div className="px-4 border-b-2 border-black m-3">
      <header className="flex items-center justify-between  py-3 bg-gradient-to-b from-[#edd3c4] to-paper">
        <button 
          className="w-8 h-8 relative bg-pill border-2 border-ink rounded-md shadow-[2px_2px_0_0_#2b241f,4px_4px_0_0_#8a7a71] hover:shadow-[1px_1px_0_0_#2b241f,2px_2px_0_0_#8a7a71] active:shadow-[0px_0px_0_0_#2b241f,1px_1px_0_0_#8a7a71] active:translate-x-[1px] active:translate-y-[1px] transition-all duration-150" 
          onClick={()=>history.back()}
          aria-label="Back"
        >
          <div className="absolute inset-0 flex justify-center items-center">
            <span className="text-ink font-bold text-lg">←</span>
          </div>
        </button>
        <div className="font-spectral uppercase tracking-[1px] font-bold text-center">
          <span className="text-[18px] text-ink">NEWS</span><span className="text-[18px] text-ink">DETAILS</span>
        </div>
        <button 
          className={`w-7 h-7 flex-shrink-0 border-2 border-ink rounded ${bookmarked?'bg-accent border-accent text-white':''}`} 
          onClick={toggle} 
          aria-label="Bookmark"
        >
          <svg className="w-4 h-4 mx-auto mt-1" fill={bookmarked ? "white" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
        
      </header>
    </div>

    



             {/* Header */}

    
       

      <div className="px-4 border-2 border-black m-3 mt-4">
       <main className="px-2 pb-8 max-w-[980px] mx-auto ">
        {/* Article Content */}
        <article className="mt-4">
          <h1 className="font-spectral font-bold text-[20px] leading-snug text-ink mb-4">{params.title}</h1>
          
          {(params.image || params.image !== '') && (
            <div className="aspect-[16/9] overflow-hidden bg-[#d7bbaa] rounded-md mb-4">
              <img 
                src={params.image || '/Image_not_found.jpg'} 
                alt="" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/Image_not_found.jpg';
                }}
              />
            </div>
          )}
          
          <p className="text-inkSoft font-plex text-sm mb-4">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} by <span className='font-bold'> {params.author || 'Unknown'}</span>
          </p>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="font-plex text-sm text-ink">Share this post</span>
            <a 
              className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center text-sm font-bold" 
              target="_blank" 
              rel="noopener" 
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`}
              aria-label="Share on Facebook"
            >
              f
            </a>
            <a 
              className="w-8 h-8 bg-green-600 text-white rounded flex items-center justify-center text-sm font-bold" 
              target="_blank" 
              rel="noopener" 
              href={`https://wa.me/?text=${shareText}%20${shareLink}`}
              aria-label="Share on WhatsApp"
            >
              W
            </a>
          </div>
          
          <div className="text-ink font-spectral leading-relaxed">
            {params.description ? (
              <div>
                <p className="mb-4 text-lg">
                  {params.description}
                </p>
                {params.url && (
                  <div className="mt-6 pt-4 border-t border-gray-300">
                    <a 
                      href={params.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-bold text-sm"
                    >
                      Read full article 
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-inkSoft italic">
                No description available for this article.
              </p>
            )}
          </div>
        </article>
      </main>
      </div>
      
    </div>
  )
} 