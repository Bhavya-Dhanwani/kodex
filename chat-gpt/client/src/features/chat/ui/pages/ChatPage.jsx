import { useState, useMemo, useRef, useEffect } from 'react'
import { useAuth } from '../../../auth/hooks/useAuth'

export function ChatPage() {
  const { user, logout } = useAuth()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const messagesEndRef = useRef(null)

  // Prepopulate sidebar items matching the screenshot
  const [sidebarChats, setSidebarChats] = useState([
    { id: '1', title: 'sdkjfhsjkf' },
    { id: '2', title: 'Email to Contact SIH Winner' },
    { id: '3', title: 'Express Server Prank Code' },
    { id: '4', title: 'LocalStorage Security Risks' },
    { id: '5', title: 'TypeScript Type Assertion' },
    { id: '6', title: 'Amazon delivery issue' },
    { id: '7', title: 'Dockerfile Multi-Stage Explanati...' },
    { id: '8', title: 'Download folder as ZIP' },
    { id: '9', title: 'Taare song inquiry' },
    { id: '10', title: 'v0 vs Lovable' },
    { id: '11', title: 'AI Shorts Generator JS' },
    { id: '12', title: 'Identifying 32-bit Integer' },
    { id: '13', title: 'Time Calculation for Events' },
    { id: '14', title: 'AI Video Editor Names' },
    { id: '15', title: 'React Build in Node' },
    { id: '16', title: 'var vs let output' }
  ])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Get user name display
  const displayName = useMemo(() => {
    if (user?.name) return user.name
    if (user?.email) return user.email.split('@')[0]
    return 'Bhavya'
  }, [user])

  function handleSend(e) {
    if (e) e.preventDefault()
    if (!input.trim()) return

    const userMessageContent = input.trim()
    const newMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessageContent
    }

    setMessages((prev) => [...prev, newMsg])
    setInput('')

    // Add user message to top of recents
    const chatTitle = userMessageContent.length > 28 
      ? userMessageContent.substring(0, 25) + '...' 
      : userMessageContent;
    setSidebarChats((prev) => [
      { id: Date.now().toString(), title: chatTitle },
      ...prev
    ])

    // Simulate mock assistant response after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `It looks like you typed "${userMessageContent}", which doesn't form a recognizable word or question. Could you resend what you meant? I'm here to help.`
        }
      ])
    }, 800)
  }

  function handleNewChat() {
    setMessages([])
    setInput('')
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black text-[#FAFAFA] font-sans antialiased">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-[260px] h-full bg-[#000000] border-r border-[#1C1C1E] select-none">
        {/* Top Header */}
        <div className="flex items-center justify-between px-3.5 py-4 text-[#FAFAFA]">
          {/* Logo & Sidebar toggle */}
          <div className="flex items-center gap-2 select-none">
            <span className="text-sm font-black tracking-widest text-white">CHAD GPT</span>
          </div>
          <div className="flex items-center gap-2.5">
            {/* Search Icon */}
            <button className="p-1 hover:bg-[#1C1C1E] rounded-md transition-colors text-[#A1A1AA] hover:text-white">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="h-4.5 w-4.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            {/* Toggle Sidebar Icon */}
            <button className="p-1 hover:bg-[#1C1C1E] rounded-md transition-colors text-[#A1A1AA] hover:text-white">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="h-4.5 w-4.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Options */}
        <div className="px-3 py-1">
          <button 
            onClick={handleNewChat}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm text-white font-medium hover:bg-[#1C1C1E] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="h-4.5 w-4.5 text-[#A1A1AA]">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"></path>
              </svg>
              <span>New chat</span>
            </div>
          </button>
          
          <button className="flex items-center w-full px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:text-white hover:bg-[#1C1C1E] transition-colors mt-0.5">
            <div className="flex items-center gap-2.5">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="h-4.5 w-4.5">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <span>Library</span>
            </div>
          </button>

          {messages.length > 0 && (
            <>
              <button className="flex items-center w-full px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:text-white hover:bg-[#1C1C1E] transition-colors mt-0.5">
                <div className="flex items-center gap-2.5">
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="h-4.5 w-4.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span>Projects</span>
                </div>
              </button>
              <button className="flex items-center w-full px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:text-white hover:bg-[#1C1C1E] transition-colors mt-0.5">
                <div className="flex items-center gap-2.5">
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="h-4.5 w-4.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>Scheduled</span>
                </div>
              </button>
            </>
          )}

          {!messages.length && (
            <button className="flex items-center w-full px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:text-white hover:bg-[#1C1C1E] transition-colors mt-0.5">
              <div className="flex items-center gap-2.5">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="h-4.5 w-4.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Scheduled</span>
              </div>
            </button>
          )}

          <button className="flex items-center w-full px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:text-white hover:bg-[#1C1C1E] transition-colors mt-0.5">
            <div className="flex items-center gap-2.5">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="h-4.5 w-4.5">
                <path d="M18 12V4H6v8"></path>
                <path d="M12 12v6"></path>
                <path d="M15 15H9"></path>
                <path d="M10 22h4"></path>
              </svg>
              <span>Plugins</span>
            </div>
          </button>

          <button className="flex items-center w-full px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:text-white hover:bg-[#1C1C1E] transition-colors mt-0.5">
            <div className="flex items-center gap-2.5">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="h-4.5 w-4.5">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
              <span>More</span>
            </div>
          </button>
        </div>

        {/* Recents Section */}
        <div className="flex-1 overflow-y-auto px-3 mt-4 scrollbar-thin">
          <div className="px-3 text-xs font-semibold text-[#71717A] mb-1.5">Recents</div>
          <div className="grid gap-0.5">
            {sidebarChats.map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left px-3 py-2 text-sm rounded-lg text-[#E4E4E7] hover:bg-[#1C1C1E] hover:text-white truncate transition-colors"
              >
                {chat.title}
              </button>
            ))}
          </div>
        </div>

        {/* User Account / Profile bottom */}
        <div className="relative p-3 border-t border-[#1C1C1E] bg-[#000000]">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-[#1C1C1E] transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              {/* Avatar circle */}
              <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold text-white uppercase">
                {displayName.charAt(0)}
              </div>
              <div className="grid leading-tight">
                <span className="text-xs font-semibold text-white truncate max-w-[140px]">{displayName}</span>
                <span className="text-[10px] text-[#A1A1AA]">Go</span>
              </div>
            </div>
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="h-4 w-4 text-[#A1A1AA]">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>

          {/* Profile Popover Drawer Menu */}
          {showProfileMenu && (
            <div className="absolute bottom-16 left-3 right-3 rounded-lg border border-[#27272A] bg-[#18181B] p-1.5 shadow-2xl z-50">
              <button
                onClick={logout}
                className="flex items-center w-full px-3 py-2 rounded-md text-sm text-[#EF4444] hover:bg-neutral-800 font-semibold transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full bg-black overflow-hidden relative">
        {/* Top Header Bar */}
        <header className="flex items-center justify-between px-5 h-[56px] select-none">
          <div className="flex items-center gap-1.5">
            <button className="flex items-center gap-1 text-sm font-semibold text-[#A1A1AA] hover:text-white transition-colors">
              <span>chadgpt</span>
              <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" className="h-3 w-3 mt-0.5">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {messages.length > 0 && (
              <>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#18181B] border border-[#27272A] hover:bg-[#27272A] rounded-full text-xs font-semibold text-white transition-colors">
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="h-3.5 w-3.5">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                  <span>Share</span>
                </button>
                <button className="p-1.5 bg-[#18181B] border border-[#27272A] hover:bg-[#27272A] rounded-full text-white transition-colors">
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="h-3.5 w-3.5">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
              </>
            )}
            {!messages.length && (
              <div className="h-8 w-8 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="h-4 w-4 text-[#A1A1AA]">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
            )}
          </div>
        </header>

        {/* Message stream / Greeting Container */}
        <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-none flex flex-col">
          {messages.length === 0 ? (
            /* Screen 1: Empty state / Greeting in center */
            <div className="flex-1 flex flex-col items-center justify-center pb-24">
              <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight text-center">
                Hey, {displayName}. Ready to dive in?
              </h2>
              {/* Centered Composer */}
              <div className="w-full max-w-[720px] mt-6">
                <form onSubmit={handleSend} className="relative flex items-center bg-[#18181B] rounded-full border border-[#27272A] px-4 py-2.5 focus-within:border-zinc-500 transition-colors">
                  <button type="button" className="p-2 text-[#A1A1AA] hover:text-white transition-colors">
                    <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" className="h-4.5 w-4.5">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                  <input
                    type="text"
                    placeholder="Ask anything"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-none text-[15px] outline-none text-white placeholder-[#71717A] px-2 py-1"
                  />
                  <button 
                    type="submit" 
                    disabled={!input.trim()}
                    className="p-2 rounded-full bg-zinc-800 text-white disabled:text-zinc-600 disabled:bg-zinc-900 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" className="h-4 w-4">
                      <line x1="12" y1="19" x2="12" y2="5"></line>
                      <polyline points="5 12 12 5 19 12"></polyline>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* Screen 2: Chatting state */
            <div className="flex-1 w-full max-w-[720px] mx-auto flex flex-col gap-8 pb-32">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'user' ? (
                    /* User Message Bubble */
                    <div className="bg-[#18181B] border border-[#27272A] rounded-[24px] px-5 py-3 text-[15px] text-white max-w-[85%] leading-relaxed break-words">
                      {msg.content}
                    </div>
                  ) : (
                    /* Assistant Message plain text */
                    <div className="text-[15px] text-white leading-relaxed break-words w-full pr-10">
                      {msg.content}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Screen 2: Sticky Bottom Composer */}
        {messages.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent pt-10 pb-6 px-4">
            <div className="w-full max-w-[720px] mx-auto">
              <form onSubmit={handleSend} className="relative flex items-center bg-[#18181B] rounded-full border border-[#27272A] px-4 py-2.5 focus-within:border-zinc-500 transition-colors">
                {/* Plus trigger button */}
                <button type="button" className="p-2 text-[#A1A1AA] hover:text-white transition-colors">
                  <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" className="h-4.5 w-4.5">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Ask anything"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none text-[15px] outline-none text-white placeholder-[#71717A] px-2 py-1"
                />
                
                {/* Voice & Stop indicators */}
                <div className="flex items-center gap-2">
                  <button type="button" className="p-2 text-[#A1A1AA] hover:text-white transition-colors">
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="h-4.5 w-4.5">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" y1="19" x2="12" y2="23"></line>
                      <line x1="8" y1="23" x2="16" y2="23"></line>
                    </svg>
                  </button>
                  <button 
                    type="submit"
                    disabled={!input.trim()}
                    className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center disabled:bg-zinc-800 disabled:text-zinc-600 transition-colors cursor-pointer"
                  >
                    {/* Stop icon (square) when typing, or arrow. Let's make it match the screenshot */}
                    <div className="h-3 w-3 bg-current rounded-sm"></div>
                  </button>
                </div>
              </form>
              <div className="text-[11px] text-center text-[#71717A] mt-2.5 select-none">
                chadgpt can make mistakes. Check important info.
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
