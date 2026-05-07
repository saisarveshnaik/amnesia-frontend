import { type FormEvent, useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { loginUser, registerUser, type AuthUser } from '../api/authApi'
import { AUTH_TOKEN_KEY, AUTH_USER_KEY, getStoredUser } from '../auth/storage'

type NavbarProps = {
  logo: string
  githubIcon: string
  langIcon: string
  chevronDown: string
}

const inputClassName =
  'mt-2 w-full rounded-[12px] border border-[#293244] bg-[#0b111d] px-4 py-3 text-[15px] text-[#ecf0f5] outline-none transition placeholder:text-[#7f8999] focus:border-[#f4ad61]'

type AuthModalMode = 'login' | 'register'

function Navbar({ logo, githubIcon, langIcon, chevronDown }: NavbarProps) {
  const navItems = [
    { label: 'Products', href: '#products', color: 'hover:text-[#ff4fa8]' },
    { label: 'Promotions', href: '#promotions', color: 'hover:text-[#f3ad62]' },
    { label: 'Downloads', href: '#downloads', color: 'hover:text-[#37d6a3]' },
    { label: 'Security', href: '#security', color: 'hover:text-[#5aa8ff]' },
    { label: 'Blog', href: '#blog', color: 'hover:text-[#c277ff]' },
    { label: 'FAQ', href: '#faq', color: 'hover:text-[#f3ad62]' },
    { label: 'Press', href: '#press', color: 'hover:text-[#37d6a3]' },
  ]
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode | null>(null)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [isRegisterLoading, setIsRegisterLoading] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginInfo, setLoginInfo] = useState('')
  const [registerError, setRegisterError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    const user = getStoredUser()

    if (token && user) {
      setCurrentUser(user)
      return
    }

    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
  }, [])

  useEffect(() => {
    const handleOpenLogin = () => {
      setRegisterError('')
      setLoginError('')
      setAuthModalMode('login')
    }

    window.addEventListener('amnesia:open-login', handleOpenLogin)

    return () => {
      window.removeEventListener('amnesia:open-login', handleOpenLogin)
    }
  }, [])

  useEffect(() => {
    if (!authModalMode) {
      return
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAuthModalMode(null)
      }
    }

    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [authModalMode])

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isMobileMenuOpen])

  const openLoginModal = () => {
    setIsMobileMenuOpen(false)
    setRegisterError('')
    setLoginError('')
    setAuthModalMode('login')
  }

  const openRegisterModal = () => {
    setIsMobileMenuOpen(false)
    setLoginError('')
    setLoginInfo('')
    setRegisterError('')
    setAuthModalMode('register')
  }

  const switchToRegister = () => {
    setLoginError('')
    setLoginInfo('')
    setRegisterError('')
    setAuthModalMode('register')
  }

  const switchToLogin = () => {
    setRegisterError('')
    setLoginError('')
    setAuthModalMode('login')
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoginError('')
    setLoginInfo('')

    const normalizedEmail = loginEmail.trim().toLowerCase()

    if (!normalizedEmail || !loginPassword) {
      setLoginError('Please enter both email and password.')
      return
    }

    try {
      setIsLoginLoading(true)
      const response = await loginUser({
        email: normalizedEmail,
        password: loginPassword,
      })

      localStorage.setItem(AUTH_TOKEN_KEY, response.token)
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user))
      setCurrentUser(response.user)
      setAuthModalMode(null)
      setLoginPassword('')
      setLoginError('')
      setLoginInfo('')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed. Please try again.'
      setLoginError(message)
    } finally {
      setIsLoginLoading(false)
    }
  }

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setRegisterError('')

    const trimmedName = registerName.trim()
    const normalizedEmail = registerEmail.trim().toLowerCase()

    if (!trimmedName || !normalizedEmail || !registerPassword || !registerConfirmPassword) {
      setRegisterError('Please fill out all fields.')
      return
    }

    if (registerPassword.length < 6) {
      setRegisterError('Password must be at least 6 characters long.')
      return
    }

    if (registerPassword !== registerConfirmPassword) {
      setRegisterError('Password and Confirm Password do not match.')
      return
    }

    try {
      setIsRegisterLoading(true)
      await registerUser({
        name: trimmedName,
        email: normalizedEmail,
        password: registerPassword,
      })

      setRegisterName('')
      setRegisterEmail('')
      setRegisterPassword('')
      setRegisterConfirmPassword('')
      setLoginEmail(normalizedEmail)
      setLoginPassword('')
      setLoginInfo('Registration successful. Please login with your credentials.')
      setAuthModalMode('login')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed. Please try again.'
      setRegisterError(message)
    } finally {
      setIsRegisterLoading(false)
    }
  }

  const handleLogout = () => {
    setIsMobileMenuOpen(false)
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
    setCurrentUser(null)
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#172235] bg-[#05080f]/88 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[2200px] items-center justify-between px-[15px] md:px-[30px] xl:px-[70px]">
          <a href="#home" className="inline-flex items-center">
            <img src={logo} alt="Amnezia" className="h-[28px] w-auto" />
          </a>

          <nav className="hidden items-center gap-1 rounded-full border border-[#162033] bg-[#07101c]/82 px-2 py-1 xl:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`inline-flex h-9 items-center rounded-full px-3 text-[14px] font-semibold text-[#dfe5ef] transition-colors hover:bg-[#101a2b] ${item.color}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:gap-3 lg:flex">
            {currentUser ? (
              <>
                <span className="inline-flex max-w-[130px] truncate rounded-[10px] border border-[#243044] bg-[#0c1422] px-3 py-2 text-[14px] font-medium text-[#f2f4f8]">
                  {currentUser.name}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-[10px] border border-[#2b3547] px-3 py-2 text-[13px] font-semibold text-[#e4e8ef] transition hover:border-[#f1b162] hover:text-[#f1b162] md:px-4 md:text-[14px]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="rounded-[10px] border border-[#2b3547] px-3 py-2 text-[13px] font-semibold text-[#e4e8ef] transition hover:border-[#f1b162] hover:text-[#f1b162] md:px-4 md:text-[14px]"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={openRegisterModal}
                  className="rounded-[10px] bg-[#f3ad62] px-3 py-2 text-[13px] font-bold text-[#21180d] shadow-[0_4px_18px_rgba(243,173,98,0.3)] transition hover:bg-[#ffc27b] md:px-4 md:text-[14px]"
                >
                  Register
                </button>
              </>
            )}
            <button
              type="button"
              aria-label="Open GitHub"
              className="hidden rounded p-1 text-[#dde0e7] transition-colors hover:text-white lg:inline-flex"
            >
              <img src={githubIcon} alt="" className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              aria-label="Select language"
              className="hidden items-center gap-1 rounded p-1 text-[#dde0e7] transition-colors hover:text-white lg:inline-flex"
            >
              <img src={langIcon} alt="" className="h-[18px] w-[18px]" />
              <img src={chevronDown} alt="" className="h-[14px] w-[14px]" />
            </button>
          </div>

          <button
            type="button"
            className="inline-flex rounded p-1 text-[#e6e8ed] transition-colors hover:text-white xl:hidden"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen ? (
          <div className="border-t border-[#111725] px-[15px] py-4 md:px-[30px] xl:hidden">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`inline-flex items-center justify-between border-b border-[#111725] py-3 text-[16px] font-medium text-[#f2f3f6] transition-colors ${item.color}`}
                >
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>

            <div className="mt-4 flex items-center gap-4 text-[#dde0e7]">
              <button type="button" aria-label="Open GitHub" className="inline-flex rounded p-1 transition-colors hover:text-white">
                <img src={githubIcon} alt="" className="h-[18px] w-[18px]" />
              </button>
              <button
                type="button"
                aria-label="Select language"
                className="inline-flex items-center gap-1 rounded p-1 transition-colors hover:text-white"
              >
                <img src={langIcon} alt="" className="h-[18px] w-[18px]" />
                <img src={chevronDown} alt="" className="h-[14px] w-[14px]" />
              </button>
            </div>

            <div className="mt-4">
              {currentUser ? (
                <div className="space-y-2">
                  <span className="inline-flex w-full truncate rounded-[10px] border border-[#243044] bg-[#0c1422] px-3 py-2 text-[14px] font-medium text-[#f2f4f8]">
                    {currentUser.name}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-[10px] border border-[#2b3547] px-3 py-2 text-[14px] font-semibold text-[#e4e8ef] transition hover:border-[#f1b162] hover:text-[#f1b162]"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={openLoginModal}
                    className="rounded-[10px] border border-[#2b3547] px-3 py-2 text-[14px] font-semibold text-[#e4e8ef] transition hover:border-[#f1b162] hover:text-[#f1b162]"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={openRegisterModal}
                    className="rounded-[10px] bg-[#f3ad62] px-3 py-2 text-[14px] font-bold text-[#21180d] shadow-[0_4px_18px_rgba(243,173,98,0.3)] transition hover:bg-[#ffc27b]"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </header>

      {authModalMode ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#02040a]/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-[460px] overflow-hidden rounded-[20px] border border-[#1a2434] bg-[#050910] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between px-6 pt-6 md:px-7 md:pt-7">
              <h2 className="text-[28px] font-bold text-[#eef1f6]">{authModalMode === 'login' ? 'Login' : 'Register'}</h2>
              <button
                type="button"
                aria-label="Close auth modal"
                onClick={() => setAuthModalMode(null)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#aeb7c5] transition hover:bg-[#101827] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 pb-6 md:px-7 md:pb-7">
              <div className="overflow-hidden">
                <div
                  className={`flex w-[200%] transition-transform duration-300 ease-out ${
                    authModalMode === 'register' ? '-translate-x-1/2' : 'translate-x-0'
                  }`}
                >
                  <div className="flex w-1/2 shrink-0 flex-col">
                  {loginInfo ? <p className="mt-4 rounded-lg border border-[#294134] bg-[#111f17] px-3 py-2 text-[14px] text-[#9ed7ae]">{loginInfo}</p> : null}
                  {loginError ? <p className="mt-4 rounded-lg border border-[#512733] bg-[#2a1219] px-3 py-2 text-[14px] text-[#ffb3c3]">{loginError}</p> : null}

                  <form className="mt-5 space-y-4" onSubmit={handleLogin}>
                    <label className="block text-[14px] font-medium text-[#d8dde7]">
                      Email
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(event) => setLoginEmail(event.target.value)}
                        className={inputClassName}
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </label>

                    <label className="block text-[14px] font-medium text-[#d8dde7]">
                      Password
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(event) => setLoginPassword(event.target.value)}
                        className={inputClassName}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={isLoginLoading}
                      className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-[12px] bg-[#f3ad62] text-[15px] font-bold text-[#21180d] transition hover:bg-[#ffc27b] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isLoginLoading ? 'Logging in...' : 'Login'}
                    </button>
                  </form>

                  <p className="mt-auto pt-5 text-center text-[14px] text-[#aab3c2]">
                    Not a user?{' '}
                    <button
                      type="button"
                      onClick={switchToRegister}
                      className="font-semibold text-[#f3ad62] transition hover:text-[#ffc27b]"
                    >
                      Register here
                    </button>
                  </p>
                </div>

                  <div className="flex w-1/2 shrink-0 flex-col">
                  {registerError ? <p className="mt-4 rounded-lg border border-[#512733] bg-[#2a1219] px-3 py-2 text-[14px] text-[#ffb3c3]">{registerError}</p> : null}

                  <form className="mt-5 space-y-4" onSubmit={handleRegister}>
                    <label className="block text-[14px] font-medium text-[#d8dde7]">
                      Name
                      <input
                        type="text"
                        value={registerName}
                        onChange={(event) => setRegisterName(event.target.value)}
                        className={inputClassName}
                        placeholder="Enter your name"
                        autoComplete="name"
                      />
                    </label>

                    <label className="block text-[14px] font-medium text-[#d8dde7]">
                      Email
                      <input
                        type="email"
                        value={registerEmail}
                        onChange={(event) => setRegisterEmail(event.target.value)}
                        className={inputClassName}
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </label>

                    <label className="block text-[14px] font-medium text-[#d8dde7]">
                      Password
                      <input
                        type="password"
                        value={registerPassword}
                        onChange={(event) => setRegisterPassword(event.target.value)}
                        className={inputClassName}
                        placeholder="At least 6 characters"
                        autoComplete="new-password"
                      />
                    </label>

                    <label className="block text-[14px] font-medium text-[#d8dde7]">
                      Confirm Password
                      <input
                        type="password"
                        value={registerConfirmPassword}
                        onChange={(event) => setRegisterConfirmPassword(event.target.value)}
                        className={inputClassName}
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={isRegisterLoading}
                      className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-[12px] bg-[#f3ad62] text-[15px] font-bold text-[#21180d] transition hover:bg-[#ffc27b] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isRegisterLoading ? 'Creating account...' : 'Create account'}
                    </button>
                  </form>

                  <p className="mt-auto pt-5 text-center text-[14px] text-[#aab3c2]">
                    Already a user?{' '}
                    <button
                      type="button"
                      onClick={switchToLogin}
                      className="font-semibold text-[#f3ad62] transition hover:text-[#ffc27b]"
                    >
                      Login here
                    </button>
                  </p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Navbar
