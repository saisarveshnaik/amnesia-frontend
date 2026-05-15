import { useEffect, useRef, useState } from 'react'
import {
  Ban,
  CodeXml,
  Cpu,
  Download,
  Globe,
  Heart,
  MapPin,
  Shield,
  Smartphone,
  Tv,
  Workflow,
  X,
} from 'lucide-react'
import { FaAndroid, FaApple, FaGithub, FaLinux, FaWindows } from 'react-icons/fa'
import BlogCard from './components/BlogCard'
import FAQItem from './components/FAQItem'
import FeatureCard from './components/FeatureCard'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import SectionHeading from './components/SectionHeading'
import { getAuthToken, getStoredUser } from './auth/storage'
import { createPremiumPayment, getPaymentStatus, storeCompletedPayment } from './api/paymentApi'

import githubIcon from '../assets/afc75747-a67c-450e-84ae-3f63f45e01cc.svg'
import languageIcon from '../assets/2b6a48d4-db47-4003-ab9f-da7cdd74e5da.svg'
import logoMain from '../assets/logo-with-a-w-glow.svg'
import chevronDown from '../assets/58f88098-0b2d-4747-a0a3-c31978e2c625.svg'
import chevronRight from '../assets/42f2618e-d2ca-4441-b883-c8e6266c142a.svg'
import arrowRight from '../assets/a2b59169-3954-4f8a-9022-f528c6cb1dcb.svg'

import heroImage from '../assets/image_10.jpeg'
import businessImage from '../assets/image.jpeg'
import phonePromoImage from '../assets/image.webp'
import blogFeatureImage from '../assets/image_1.jpeg'
import blogIranImage from '../assets/image_33.jpeg'
import blogAwgImage from '../assets/image_20.jpeg'
import change50Image from '../assets/change50.bbe39ade.webp'
import awgGlowImage from '../assets/image_11.png'
import wgV2Image from '../assets/wgImg.7d47ef47.webp'
import securityBadgeImage from '../assets/image_10.png'
import logoSymbol from '../assets/logo-a-sym.svg'
import flagKR from '../assets/KR.svg'
import flagEE from '../assets/EE.svg'
import flagAE from '../assets/AE.svg'
import flagPT from '../assets/PT.svg'
import pressCybernews from '../assets/0254b7bc-aac5-4b5f-957d-8f2add615c91.svg'
import pressWired from '../assets/bd63430b-e92d-410c-8793-30615fd085a9.svg'
import pressTechradar from '../assets/4b42cbad-69e9-46fe-b8ed-d877adec71a3.svg'
import pressTf from '../assets/torrentfreak-preview.png'
import pressMedianama from '../assets/medianama.3c495983.png'

const faqItems = [
  {
    question: 'I need a regular VPN, what should I choose?',
    answer:
      'Choose Amnezia Premium for classic VPN usage with reliable regional routing and the strongest day-to-day performance.',
  },
  {
    question: 'What data does Amnezia collect?',
    answer:
      'Amnezia focuses on privacy-first architecture and minimal telemetry required for service quality and support.',
  },
  {
    question: 'Is AmneziaVPN a free app?',
    answer:
      'Yes. You can use Amnezia Free and also self-host your own server. Premium adds paid fast locations and extra comfort features.',
  },
  {
    question: 'A lot is blocked in my country, what is suitable for me?',
    answer:
      'Use Amnezia Free for restricted regions first, then switch to Amnezia Premium for more locations and higher speed when needed.',
  },
  {
    question: 'Which Amnezia services let me choose a protocol?',
    answer:
      'Self-hosted and advanced setups allow protocol choice, including AmneziaWG and Xray-based routes for custom scenarios.',
  },
]

const staticPages = {
  '/amneziawg': {
    eyebrow: 'AMNEZIAWG',
    title: 'AmneziaWG Protocol',
    description:
      'A high-performance VPN protocol built for restricted networks, combining WireGuard speed with additional traffic masking for stronger resistance to blocking.',
    image: awgGlowImage,
    imageAlt: 'AmneziaWG protocol',
    highlights: [
      'Fast encrypted tunnels for daily VPN use',
      'Extra obfuscation against traffic inspection',
      'Available in Amnezia Premium and self-hosted setups',
    ],
  },
  '/about': {
    eyebrow: 'ABOUT US',
    title: 'Internet freedom has a name',
    description:
      'Amnezia helps people connect privately, bypass network restrictions, and create personal VPN infrastructure with clear controls and open-source technology.',
    image: heroImage,
    imageAlt: 'Amnezia app interface',
    highlights: [
      'Privacy-first VPN tools for individuals and teams',
      'Self-hosted and managed VPN options',
      'Focused on access, security, and practical reliability',
    ],
  },
  '/premium-discount': {
    eyebrow: 'SPECIAL OFFER',
    title: 'Switch to Amnezia Premium with a 50% discount',
    description:
      'Move from a VPN that stopped working to Amnezia Premium and get fast regional routing, stronger protocols, and support for everyday private access.',
    image: change50Image,
    imageAlt: '50 percent discount',
    highlights: [
      'Premium VPN locations with high-speed access',
      'Supports AmneziaWG and XRay VLESS Reality protocols',
      'Built for reliable browsing in restricted networks',
    ],
  },
}

function App() {
  const [openedFaq, setOpenedFaq] = useState<number | null>(null)
  const [isPremiumPaymentLoading, setIsPremiumPaymentLoading] = useState(false)
  const [premiumPaymentError, setPremiumPaymentError] = useState('')
  const [paymentCheckoutUrl, setPaymentCheckoutUrl] = useState('')
  const [vpnCode, setVpnCode] = useState('')
  const [isCopyingCode, setIsCopyingCode] = useState(false)
  const paymentFlowIdRef = useRef(0)
  const currentPath = window.location.pathname.toLowerCase()
  const isPaymentReturnPage = currentPath === '/premium-payment-success' || currentPath === '/premium-payment-failure'

  useEffect(() => {
    if (!isPaymentReturnPage) {
      return
    }

    const closeTimer = window.setTimeout(() => {
      window.close()
    }, 150)

    return () => {
      window.clearTimeout(closeTimer)
    }
  }, [isPaymentReturnPage])

  if (isPaymentReturnPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#04070e] px-6 text-center text-[#d9deea]">
        <p className="text-[18px] md:text-[20px]">Payment processed. You can close this window.</p>
      </div>
    )
  }

  const staticPage = staticPages[currentPath as keyof typeof staticPages]

  if (staticPage || currentPath === '/blog') {
    return (
      <div className="min-h-screen bg-[#04070e] text-white">
        <Navbar
          logo={logoMain}
          githubIcon={githubIcon}
          langIcon={languageIcon}
          chevronDown={chevronDown}
        />

        <main className="mx-auto w-full max-w-[2200px] px-[15px] pb-12 pt-10 sm:px-5 md:px-[30px] md:pt-16 xl:px-[70px]">
          {currentPath === '/blog' ? (
            <section className="min-h-[58vh]">
              <SectionHeading title="Amnezia Blog" align="left" />
              <div className="mt-8">
                <BlogCard
                  title="Split tunneling: what it is and why you need it"
                  tags={['Articles', 'Free']}
                  image={blogFeatureImage}
                  imageAlt="Split tunneling article"
                />
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <BlogCard
                  compact
                  title="Internet Censorship in Iran: Trends and Outlook for 2026"
                  tags={['Articles', 'Iran']}
                  date="Apr 03"
                  readingTime="5 min"
                  image={blogIranImage}
                  imageAlt="Iran article"
                />
                <BlogCard
                  compact
                  title="AmneziaWG 2.0 is here"
                  tags={['Amnezia News', 'Recommended']}
                  date="Mar 25"
                  readingTime="2 min"
                  image={blogAwgImage}
                  imageAlt="AmneziaWG 2.0 article"
                />
              </div>
            </section>
          ) : (
            <section className="grid min-h-[58vh] items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-[14px] font-bold uppercase tracking-[0.18em] text-[#f3ad62] md:text-[16px]">{staticPage.eyebrow}</p>
                <h1 className="mt-4 max-w-[760px] text-[38px] font-extrabold leading-[1.08] text-[#eef1f6] sm:text-[48px] md:text-[64px]">
                  {staticPage.title}
                </h1>
                <p className="mt-5 max-w-[720px] text-[17px] leading-[1.55] text-[#a8b1c0] sm:text-[19px] md:text-[22px]">
                  {staticPage.description}
                </p>
                <ul className="mt-7 space-y-3 text-[16px] text-[#d8dde7] sm:text-[18px]">
                  {staticPage.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#f3ad62]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden rounded-[22px] border border-[#1a2434] bg-[#050910]">
                <img src={staticPage.image} alt={staticPage.imageAlt} className="h-full max-h-[520px] w-full object-cover" />
              </div>
            </section>
          )}

          <Footer logo={logoMain} />
        </main>
      </div>
    )
  }

  const handlePremiumGetClick = async () => {
    const token = getAuthToken()
    const user = getStoredUser()

    if (!token || !user) {
      window.dispatchEvent(new Event('amnesia:open-login'))
      return
    }

    setPremiumPaymentError('')
    setIsPremiumPaymentLoading(true)
    const flowId = paymentFlowIdRef.current + 1
    paymentFlowIdRef.current = flowId

    try {
      const paymentData = await createPremiumPayment(token)

      if (paymentFlowIdRef.current !== flowId) {
        return
      }

      setPaymentCheckoutUrl(paymentData.checkoutUrl)

      const startTime = Date.now()
      const timeoutMs = 5 * 60 * 1000
      const terminalStatuses = new Set(['completed', 'failed', 'refunded', 'cancelled', 'canceled'])
      let latestStatus = paymentData.status.toLowerCase()

      while (Date.now() - startTime < timeoutMs) {
        await new Promise((resolve) => setTimeout(resolve, 4000))

        if (paymentFlowIdRef.current !== flowId) {
          return
        }

        const statusData = await getPaymentStatus(token, paymentData.transactionId)
        latestStatus = statusData.status.toLowerCase()

        if (terminalStatuses.has(latestStatus)) {
          break
        }
      }

      if (paymentFlowIdRef.current !== flowId) {
        return
      }

      if (latestStatus !== 'completed') {
        throw new Error(
          latestStatus
            ? `Payment did not complete. Current status: ${latestStatus}.`
            : 'Payment did not complete within the expected time.',
        )
      }

      const storedPayment = await storeCompletedPayment(token, paymentData.transactionId)
      setVpnCode(storedPayment.vpnCode)
      setPaymentCheckoutUrl('')
    } catch (error) {
      if (paymentFlowIdRef.current === flowId) {
        const message = error instanceof Error ? error.message : 'Unable to complete payment. Please try again.'
        setPremiumPaymentError(message)
        setPaymentCheckoutUrl('')
      }
    } finally {
      if (paymentFlowIdRef.current === flowId) {
        setIsPremiumPaymentLoading(false)
      }
    }
  }

  const handleClosePaymentPopup = () => {
    paymentFlowIdRef.current += 1
    setPaymentCheckoutUrl('')
    setIsPremiumPaymentLoading(false)
  }

  const handleCopyVpnCode = async () => {
    if (!vpnCode || isCopyingCode) {
      return
    }

    try {
      setIsCopyingCode(true)
      await navigator.clipboard.writeText(vpnCode)
    } finally {
      setTimeout(() => {
        setIsCopyingCode(false)
      }, 1200)
    }
  }

  return (
    <div className="min-h-screen bg-[#04070e] text-white">
      <Navbar
        logo={logoMain}
        githubIcon={githubIcon}
        langIcon={languageIcon}
        chevronDown={chevronDown}
      />

      <Hero image={heroImage} arrowRight={arrowRight} />

      <main className="mx-auto w-full max-w-[2200px] px-[15px] pb-12 pt-10 sm:px-5 md:px-[30px] md:pt-20 xl:px-[70px]">
        <section id="products" className="scroll-mt-24">
          <SectionHeading label="OUR PRODUCTS" />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div id="premium" className="scroll-mt-24">
              <ProductCard
                title="Amnezia"
                accentWord="Premium"
                accentClass="text-[#d10d90]"
                subtitle="A classic VPN with strong privacy and region switching"
                price="from 4.00 $ /month"
                highlighted
                onGet={handlePremiumGetClick}
                isGetLoading={isPremiumPaymentLoading}
                features={[
                  { icon: <Globe className="h-6 w-6 md:h-[30px] md:w-[30px]" />, text: 'Access to any sites and apps' },
                  { icon: <Download className="h-6 w-6 md:h-[30px] md:w-[30px]" />, text: 'Unlimited traffic at high speed' },
                  {
                    icon: <MapPin className="h-6 w-6 md:h-[30px] md:w-[30px]" />,
                    text: '20 countries for changing virtual location, including P2P',
                  },
                  {
                    icon: <Cpu className="h-6 w-6 md:h-[30px] md:w-[30px]" />,
                    text: 'Supports AmneziaWG 1.5 and XRay VLESS Reality protocols',
                  },
                  { icon: <Smartphone className="h-6 w-6 md:h-[30px] md:w-[30px]" />, text: 'Use up to 7 devices on one subscription' },
                  { icon: <Tv className="h-6 w-6 md:h-[30px] md:w-[30px]" />, text: 'Support for Android TV and routers' },
                  { icon: <Heart className="h-6 w-6 md:h-[30px] md:w-[30px]" />, text: '24/7 caring support' },
                ]}
              />
            </div>

            <div id="free" className="scroll-mt-24">
              <ProductCard
                title="Amnezia"
                accentWord="Free"
                accentClass="text-[#0f68ff]"
                subtitle="Free VPN for countries with active content blocking"
                price="0 $ /month"
                features={[
                  {
                    icon: <Globe className="h-6 w-6 md:h-[30px] md:w-[30px]" />,
                    text: 'Access to Instagram, Facebook, X (Twitter) and many more, but no YouTube',
                  },
                  { icon: <Download className="h-6 w-6 md:h-[30px] md:w-[30px]" />, text: 'Speed limited up to 8 Mbps' },
                  { icon: <Ban className="h-6 w-6 md:h-[30px] md:w-[30px]" />, text: 'No location selection' },
                  { icon: <Cpu className="h-6 w-6 md:h-[30px] md:w-[30px]" />, text: 'Supports AmneziaWG 1.5 protocol' },
                ]}
              />
            </div>
          </div>

          <div id="self-hosted" className="mt-6 scroll-mt-24 rounded-[20px] border border-[#192331] bg-[#050910] px-5 py-6 sm:px-7 sm:py-8 md:px-12 md:py-12">
            <div className="mx-auto flex max-w-[680px] flex-col items-center text-center">
              <img src={logoSymbol} alt="Amnezia symbol" className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24" />
              <h3 className="mt-4 text-[32px] font-bold leading-[1.06] text-[#ebedf2] sm:mt-5 sm:text-[40px] md:text-[48px]">Amnezia Self-hosted</h3>
              <p className="mt-3 text-[17px] leading-[1.5] text-[#9ba4b2] sm:mt-4 sm:text-[20px] md:text-[22px] lg:text-[24px]">
                Service for creating your own VPN on your own server
              </p>
              <div className="mt-7 flex w-full flex-col items-center gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:gap-6">
                <button
                  type="button"
                  className="inline-flex h-11 w-full items-center justify-center rounded-[12px] border border-[#f4ad61] px-6 text-[18px] font-bold text-[#f4ad61] transition hover:bg-[#f4ad61]/10 sm:h-12 sm:w-auto sm:min-w-36 sm:text-[20px]"
                >
                  Get
                </button>
                <span className="text-[18px] text-[#9ea6b4] sm:text-[20px] md:text-[22px]">0 $ /month</span>
              </div>
            </div>

            <div className="mt-7 grid gap-4 border-t border-[#1a2434] pt-6 sm:mt-9 sm:pt-7 md:grid-cols-2 xl:grid-cols-4">
              <div className="flex items-start gap-3 text-[16px] text-[#d8dce5] sm:text-[17px] md:gap-5 md:text-[20px]">
                <Workflow className="mt-0.5 h-6 w-6 md:h-[30px] md:w-[30px]" />
                <span>Support for 8 protocols, including AmneziaWG and Xray</span>
              </div>
              <div className="flex items-start gap-3 text-[16px] text-[#d8dce5] sm:text-[17px] md:gap-5 md:text-[20px]">
                <Workflow className="mt-0.5 h-6 w-6 md:h-[30px] md:w-[30px]" />
                <span>Split tunneling</span>
              </div>
              <div className="flex items-start gap-3 text-[16px] text-[#d8dce5] sm:text-[17px] md:gap-5 md:text-[20px]">
                <CodeXml className="mt-0.5 h-6 w-6 md:h-[30px] md:w-[30px]" />
                <span>Open source</span>
              </div>
              <div className="flex items-start gap-3 text-[16px] text-[#d8dce5] sm:text-[17px] md:gap-5 md:text-[20px]">
                <Shield className="mt-0.5 h-6 w-6 md:h-[30px] md:w-[30px]" />
                <span>KillSwitch feature</span>
              </div>
            </div>
          </div>

          <div id="business" className="mt-6 grid scroll-mt-24 overflow-hidden rounded-[20px] border border-[#192331] bg-[#050910] lg:grid-cols-[1fr_1.15fr]">
            <div className="p-5 sm:p-6 md:p-12">
              <h3 className="text-[24px] font-bold text-[#f0f2f6] md:text-[32px]">
                Amnezia <span className="text-[#0067ff]">Business</span>
              </h3>
              <p className="mt-4 text-[17px] leading-[1.45] text-[#9ca4b2] sm:text-[20px] md:text-[22px] lg:text-[24px]">
                We'll set up a fast and stable VPN for your company's employees
              </p>
              <div className="mt-7 flex flex-col items-start gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-5">
                <button
                  type="button"
                  className="inline-flex h-11 w-full items-center justify-center rounded-[12px] border border-[#f4ad61] px-6 text-[18px] font-bold text-[#f4ad61] transition hover:bg-[#f4ad61]/10 sm:h-12 sm:w-auto sm:min-w-36 sm:text-[20px]"
                >
                  Get
                </button>
                <span className="text-[18px] text-[#9ea6b4] sm:text-[20px] md:text-[22px]">8$ month per user</span>
              </div>
            </div>
            <div className="relative">
              <img src={businessImage} alt="Business workspace" className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050910_0%,transparent_42%)] lg:bg-[linear-gradient(90deg,#050910_0%,transparent_45%)]" />
            </div>
          </div>
        </section>

        <section id="promotions" className="mt-20 scroll-mt-24">
          <SectionHeading label="NEWS & PROMOTIONS" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article id="switch-discount" className="scroll-mt-24 rounded-[20px] border border-[#1a2433] bg-[#171d29] p-5 sm:p-6 md:p-8">
              <img src={change50Image} alt="50 percent discount" className="w-[72%] max-w-[240px] object-contain" />
              <h3 className="mt-6 text-[20px] font-medium leading-[1.2] text-[#edf0f5] sm:text-[22px] md:mt-8 md:text-[24px] lg:text-[28px]">Bought another VPN and it stopped working?</h3>
              <p className="mt-4 text-[16px] leading-[1.5] text-[#98a0af] sm:text-[18px] md:text-[22px]">Switch to Amnezia Premium with a 50% discount</p>
              <button type="button" className="mt-8 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2d333f]">
                <img src={chevronRight} alt="" className="h-5 w-5" />
              </button>
            </article>

            <article className="rounded-[20px] border border-[#1a2433] bg-[#050910] p-5 sm:p-6 md:p-8">
              <div className="grid w-[140px] grid-cols-2 gap-2 md:w-[180px]">
                <img src={flagKR} alt="Korea" className="h-[30px] w-[42px] rounded-sm object-cover md:h-[44px] md:w-[62px]" />
                <img src={flagEE} alt="Estonia" className="h-[30px] w-[42px] rounded-sm object-cover md:h-[44px] md:w-[62px]" />
                <img src={flagAE} alt="UAE" className="h-[30px] w-[42px] rounded-sm object-cover md:h-[44px] md:w-[62px]" />
                <img src={flagPT} alt="Portugal" className="h-[30px] w-[42px] rounded-sm object-cover md:h-[44px] md:w-[62px]" />
              </div>
              <h3 className="mt-6 text-[20px] font-medium leading-[1.2] text-[#edf0f5] sm:text-[22px] md:mt-8 md:text-[24px] lg:text-[28px]">
                New locations in Amnezia <span className="text-[#df138f]">Premium</span>
              </h3>
              <p className="mt-4 text-[16px] leading-[1.5] text-[#98a0af] sm:text-[18px] md:text-[22px]">
                Connect to premium servers in Portugal, Estonia, South Korea, and UAE with maximum speed and security.
              </p>
              <button type="button" className="mt-8 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2d333f]">
                <img src={chevronRight} alt="" className="h-5 w-5" />
              </button>
            </article>

            <article className="rounded-[20px] border border-[#1a2433] bg-[#050910] p-5 sm:p-6 md:p-8">
              <img src={wgV2Image} alt="AmneziaWG v2.0" className="w-[88%] max-w-[280px] object-contain" />
              <h3 className="mt-6 text-[20px] font-medium leading-[1.2] text-[#edf0f5] sm:text-[22px] md:mt-8 md:text-[24px] lg:text-[28px]">Updated AmneziaWG 2.0 Protocol</h3>
              <p className="mt-4 text-[16px] leading-[1.5] text-[#98a0af] sm:text-[18px] md:text-[22px]">
                Next-level VPN obfuscation against DPI - maximum protection and performance.
              </p>
              <button type="button" className="mt-8 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2d333f]">
                <img src={chevronRight} alt="" className="h-5 w-5" />
              </button>
            </article>
          </div>
        </section>

        <section id="downloads" className="mt-20 grid scroll-mt-24 items-center gap-12 lg:grid-cols-[0.9fr_1fr]">
          <div className="relative mx-auto">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(22,75,255,0.28),transparent_70%)] blur-2xl" />
            <img src={phonePromoImage} alt="Amnezia app screen" className="relative mx-auto w-[220px] sm:w-[280px] md:w-[420px]" />
            <div className="mt-4 flex items-center justify-center gap-2 text-[18px] text-[#c8832c]">
              <FaWindows />
              <FaApple />
              <FaLinux />
              <FaAndroid />
              <FaGithub />
            </div>
          </div>
          <div>
            <h3 className="text-[28px] font-bold leading-[1.1] text-[#eceef3] sm:text-[32px] md:text-[40px]">All services in one app</h3>
            <p className="mt-5 max-w-[680px] text-[16px] leading-[1.5] text-[#9ea6b4] sm:text-[17px] md:mt-6 md:text-[20px]">
              With AmneziaVPN, you can create a self-hosted VPN on your own server, connect to our classic VPN - Amnezia Premium, or get free access to blocked websites with the Amnezia Free service.
            </p>
            <button
              type="button"
              className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-[14px] bg-[#f3ad62] px-6 text-[18px] font-bold text-[#21180d] shadow-[0_6px_24px_rgba(255,170,84,0.28)] transition hover:bg-[#ffc27b] sm:h-14 sm:w-auto sm:min-w-44 sm:px-8 sm:text-[20px]"
            >
              Download
            </button>
          </div>
        </section>

        <section id="security" className="mt-20 grid scroll-mt-24 gap-4 md:grid-cols-2">
          <FeatureCard
            title="Works in countries with the highest level of internet censorship"
            description="The AmneziaWG protocol combines the speed and performance of the popular WireGuard protocol with additional protection against detection and blocking. The source code is available at Github"
            image={awgGlowImage}
            imageAlt="AmneziaWG"
          />
          <FeatureCard
            title="Top-level security"
            description="In 2022 and 2024, Amnezia VPN successfully passed security audits conducted by 7ASecurity."
            image={securityBadgeImage}
            imageAlt="Audited by 7ASecurity"
            centered
          />
        </section>

        <section id="blog" className="mt-20 scroll-mt-24">
          <SectionHeading
            title="Amnezia Blog"
            align="left"
            action={
              <a href="/blog" className="inline-flex items-center gap-2 text-[16px] font-semibold text-[#f3ab60] transition hover:text-[#ffc987] sm:text-[20px]">
                All articles
                <img src={arrowRight} alt="" className="h-6 w-6" />
              </a>
            }
          />

          <div className="mt-6">
            <BlogCard
              title="Split tunneling: what it is and why you need it"
              tags={['Articles', 'Free']}
              image={blogFeatureImage}
              imageAlt="Split tunneling article"
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <BlogCard
              compact
              title="Internet Censorship in Iran: Trends and Outlook for 2026"
              tags={['Articles', 'Iran']}
              date="Apr 03"
              readingTime="5 min"
              image={blogIranImage}
              imageAlt="Iran article"
            />
            <BlogCard
              compact
              title="AmneziaWG 2.0 is here"
              tags={['Amnezia News', 'Recommended']}
              date="Mar 25"
              readingTime="2 min"
              image={blogAwgImage}
              imageAlt="AmneziaWG 2.0 article"
            />
          </div>
        </section>

        <section id="faq" className="mt-20 grid scroll-mt-24 gap-6 border-t border-[#182130] pt-8 md:mt-24 md:grid-cols-[1fr_2.2fr]">
          <h2 className="text-[30px] font-extrabold leading-[1.08] tracking-[-0.01em] text-[#edf0f5] sm:text-[34px] md:text-[48px]">
            Frequently
            <span className="md:block"> Asked</span>
            <span className="md:block"> Questions</span>
          </h2>
          <div>
            {faqItems.map((item, index) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={openedFaq === index}
                onToggle={() => setOpenedFaq(openedFaq === index ? null : index)}
              />
            ))}
          </div>
        </section>

        <section id="press" className="mt-20 scroll-mt-24 text-center md:mt-24">
          <h2 className="text-[30px] font-extrabold text-[#e9ebf0] sm:text-[34px] md:text-[48px]">They write about Amnezia</h2>
          <div className="mt-10 grid grid-cols-2 items-center gap-6 sm:gap-8 md:mt-12 md:grid-cols-5">
            <img src={pressCybernews} alt="Cybernews" className="mx-auto h-8 w-auto md:h-12" />
            <img src={pressWired} alt="Wired" className="mx-auto h-8 w-auto md:h-12" />
            <img src={pressTechradar} alt="TechRadar" className="mx-auto h-8 w-auto md:h-12" />
            <img src={pressTf} alt="TorrentFreak" className="mx-auto h-8 w-auto md:h-12" />
            <img src={pressMedianama} alt="Medianama" className="col-span-2 mx-auto h-8 w-auto md:col-span-1 md:h-10" />
          </div>
        </section>

        <Footer logo={logoMain} />
      </main>

      {premiumPaymentError ? (
        <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-[560px] rounded-xl border border-[#5f2b35] bg-[#2a1219] px-4 py-3 text-[14px] text-[#ffc4d2] shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
          {premiumPaymentError}
        </div>
      ) : null}

      {paymentCheckoutUrl ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#02040a]/80 p-4 backdrop-blur-sm">
          <div className="flex h-[min(760px,calc(100vh-32px))] w-full max-w-[480px] flex-col overflow-hidden rounded-[20px] border border-[#1a2434] bg-[#050910] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between border-b border-[#172234] px-4 py-3">
              <div>
                <h3 className="text-[18px] font-bold text-[#eef1f6]">Complete payment</h3>
                <p className="mt-0.5 text-[13px] text-[#9ea7b6]">Amnezia Premium</p>
              </div>
              <button
                type="button"
                aria-label="Close payment popup"
                onClick={handleClosePaymentPopup}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#aeb7c5] transition hover:bg-[#101827] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <iframe
              src={paymentCheckoutUrl}
              title="KiwiPayment checkout"
              className="min-h-0 flex-1 border-0 bg-white"
              allow="payment *"
            />
          </div>
        </div>
      ) : null}

      {vpnCode ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#02040a]/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-[460px] rounded-[20px] border border-[#1a2434] bg-[#050910] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)] md:p-7">
            <h3 className="text-[28px] font-bold text-[#eef1f6]">Your VPN code</h3>
            <p className="mt-3 text-[15px] text-[#b8c1d1]">Use this code to activate your Amnezia Premium access.</p>
            <div className="mt-5 rounded-[12px] border border-[#243249] bg-[#0b111d] px-4 py-3 text-[20px] font-bold tracking-[0.04em] text-[#f4ad61]">
              {vpnCode}
            </div>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={handleCopyVpnCode}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-[12px] bg-[#f3ad62] text-[15px] font-bold text-[#21180d] transition hover:bg-[#ffc27b]"
              >
                {isCopyingCode ? 'Copied!' : 'Copy'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setVpnCode('')
                  setPremiumPaymentError('')
                }}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-[12px] border border-[#2b3547] text-[15px] font-semibold text-[#e4e8ef] transition hover:border-[#f1b162] hover:text-[#f1b162]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
