import { FaDiscord, FaInstagram, FaRedditAlien, FaTelegramPlane, FaTiktok, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

type FooterProps = {
  logo: string
  googlePlay: string
  appStore: string
}

function Footer({ logo, googlePlay, appStore }: FooterProps) {
  const footerLinkClass = 'text-[16px] font-medium leading-[1.45] text-[#f6b45e] transition-colors hover:text-[#ffc987] md:text-[18px]'

  return (
    <footer className="border-t border-[#141c2b] pt-10 text-[#d7dae1] md:pt-14">
      <div className="grid gap-8 border-b border-[#141c2b] pb-8 sm:grid-cols-2 md:gap-10 md:pb-10 lg:grid-cols-[1.15fr_1fr_1fr_1.25fr]">
        <div>
          <img src={logo} alt="Amnezia" className="h-[74px] w-auto sm:h-[92px] md:h-[120px]" />
        </div>

        <div>
          <h4 className="text-[16px] font-semibold uppercase tracking-[0.06em] text-[#d5d9e0] md:text-[18px]">PRODUCTS</h4>
          <ul className="mt-3 space-y-2">
            <li><a className={footerLinkClass} href="#">Amnezia Premium</a></li>
            <li><a className={footerLinkClass} href="#">Amnezia Free</a></li>
            <li><a className={footerLinkClass} href="#">Amnezia Self-hosted</a></li>
            <li><a className={footerLinkClass} href="#">Amnezia Business</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[16px] font-semibold uppercase tracking-[0.06em] text-[#d5d9e0] md:text-[18px]">AMNEZIA</h4>
          <ul className="mt-3 space-y-2">
            <li><a className={footerLinkClass} href="#">AmneziaWG</a></li>
            <li><a className={footerLinkClass} href="#">About us</a></li>
            <li><a className={footerLinkClass} href="#">Switch to Amnezia Premium with a 50% discount</a></li>
            <li><a className={footerLinkClass} href="#">Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[16px] font-semibold uppercase tracking-[0.06em] text-[#d5d9e0] md:text-[18px]">CONTACTS</h4>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-[18px] text-[#e4e7ed]">
            <a href="#" aria-label="Telegram"><FaTelegramPlane /></a>
            <a href="#" aria-label="Reddit"><FaRedditAlien /></a>
            <a href="#" aria-label="Discord"><FaDiscord /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="TikTok"><FaTiktok /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
            <a href="#" aria-label="X"><FaXTwitter /></a>
          </div>
          <div className="mt-3 space-y-1">
            <p className="break-all text-[16px] font-medium text-[#f6b45e] md:text-[18px]">partners@amnezia.org</p>
            <p className="break-all text-[16px] font-medium text-[#f6b45e] md:text-[18px]">support@amnezia.org</p>
          </div>
        </div>
      </div>

      <div className="border-b border-[#141c2b] py-7 md:py-8">
        <h4 className="text-[16px] font-semibold uppercase tracking-[0.06em] text-[#d5d9e0] md:text-[18px]">DOWNLOAD AMNEZIA VPN</h4>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <img src={googlePlay} alt="Get it on Google Play" className="h-[35px] w-auto md:h-[42px]" />
          <img src={appStore} alt="Download on the App Store" className="h-[35px] w-auto md:h-[42px]" />
          <a href="#" className="text-[16px] font-medium text-[#f6b45e] md:text-[18px]">All download options</a>
        </div>
      </div>

      <div className="space-y-3 py-6 text-center text-[11px] text-[#7f8899] sm:text-[12px] md:space-y-4 md:py-8 md:text-[14px]">
        <p>Privacy and Acceptable Use Policy</p>
        <p>Payment and Terms of Use Policy</p>
        <p>(c) 2026 Amnezia. All rights reserved. EUPHORIATECH LIMITED Address: Akropoleos, 82 2nd floor 2012, Nicosia, Cyprus Reg number HE 484287</p>
      </div>
    </footer>
  )
}

export default Footer

