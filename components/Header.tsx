import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { LoginModal } from "@/components/LoginModal"
import { User, Menu, X, ChevronDown } from "lucide-react"
import cookie from "js-cookie"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  profile?: string
  role?: string
}

interface PageData {
  SiteName?: string
  HeroImage?: string
}

interface HeaderProps {
  pageData?: PageData
}

export function Header({ pageData: initialPageData }: HeaderProps) {
  const [showLogin, setShowLogin] = useState(false)
  const [page, setPageData] = useState<PageData>(initialPageData || {})
  const [user, setUser] = useState<User | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  async function getUser() {
    const token = cookie.get("token")
    if (!token) {
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          cookie.remove("token")
          setUser(null)
          return
        }
        throw new Error("Failed to fetch user");
      }

      const data = await res.json();
      setUser(data);
      setError(null)
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred')
      cookie.remove("token")
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleLogin() {
    setIsLoading(true)
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/user/auth/google`
    } catch (error) {
      console.error('Google login error:', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUser()
    setIsClient(true)

    if (!initialPageData) {
      async function fetchData() {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/page`)
          const data = await res.json()
          setPageData(data)
        } catch (error) {
          console.error('Error fetching page data:', error)
        }
      }
      fetchData()
    }
  }, [initialPageData])

  const token = isClient ? cookie.get("token") : null

  async function logout() {
    try {
      const currentToken = cookie.get("token")

      if (currentToken) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${currentToken}`,
            'Content-Type': 'application/json',
          },
        }).catch(() => {})
      }
    } catch (error) {
      console.error('Server logout error:', error)
    } finally {
      cookie.remove("token", { path: '/' })
      cookie.remove("token")
      setUser(null)
      setShowUserMenu(false)
      window.location.href = "/"
    }
  }

  const UserProfileButton = () => {
    if (isLoading) {
      return (
        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
      )
    }

    if (!user) return null

    return (
      <div className="relative" ref={userMenuRef}>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          {user.profile ? (
            <img
              src={user.profile}
              alt={user.name}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-luxury to-luxury-light flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          )}
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-foreground truncate max-w-24">
              {user.name}
            </p>
            {user.role && (
              <p className="text-xs text-muted-foreground capitalize">
                {user.role}
              </p>
            )}
          </div>
          <ChevronDown size={16} className="text-muted-foreground" />
        </Button>

        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg z-50">
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                {user.profile ? (
                  <img
                    src={user.profile}
                    alt={user.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-luxury to-luxury-light flex items-center justify-center">
                    <User size={24} className="text-white" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.name}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {user.email}
                  </p>
                  {user.role && (
                    <span className="inline-block px-2 py-1 text-xs bg-luxury/10 text-luxury rounded-full capitalize mt-1">
                      {user.role}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-2">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  logout()
                }}
                className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [showUserMenu])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src={page?.HeroImage || "/fav.ico"}
            alt="Roar Realty" 
            className="h-10 w-10 rounded-xl p-1"
            style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.1))' }}
          />
          <span className="text-xl font-bold bg-gradient-to-r from-luxury to-luxury-light bg-clip-text text-transparent">
            <a href="/">{page?.SiteName || "Roar Realty"}</a>
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-foreground hover:text-luxury transition-colors">Home</a>
          <a href="/properties" className="text-foreground hover:text-luxury transition-colors">Properties</a>
          <a href="#about" className="text-foreground hover:text-luxury transition-colors">About</a>
          <a href="#contact" className="text-foreground hover:text-luxury transition-colors">Contact</a>
          {user?.role === 'admin' && (
            <a href="/admin" className="text-foreground hover:text-luxury transition-colors">Admin</a>
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          {isClient && (
            token && user ? (
              <UserProfileButton />
            ) : (
              <Button 
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="bg-gradient-to-r from-luxury to-luxury-light text-white hover:from-luxury-dark hover:to-luxury font-semibold disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Login with Google'}
              </Button>
            )
          )}
        </div>

        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          {isClient && token && user && <UserProfileButton />}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <a 
              href="/" 
              className="block text-foreground hover:text-luxury transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="/properties" 
              className="block text-foreground hover:text-luxury transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Properties
            </a>
            <a 
              href="#about" 
              className="block text-foreground hover:text-luxury transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#contact" 
              className="block text-foreground hover:text-luxury transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            {user?.role === 'admin' && (
              <a 
                href="/admin" 
                className="block text-foreground hover:text-luxury transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </a>
            )}

            {isClient && !token && !user && (
              <Button 
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsMobileMenuOpen(false)
                  setTimeout(() => {
                    handleGoogleLogin()
                  }, 100)
                }}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-luxury to-luxury-light text-white hover:from-luxury-dark hover:to-luxury font-semibold disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Login with Google'}
              </Button>
            )}
          </nav>
        </div>
      )}

      <LoginModal open={showLogin} onOpenChange={setShowLogin} />
    </header>
  )
}