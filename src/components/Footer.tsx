type FooterProps = {
  logo: string
}

function Footer({ logo }: FooterProps) {
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
            <li><a className={footerLinkClass} href="/#premium">Amnezia Premium</a></li>
            <li><a className={footerLinkClass} href="/#free">Amnezia Free</a></li>
            <li><a className={footerLinkClass} href="/#self-hosted">Amnezia Self-hosted</a></li>
            <li><a className={footerLinkClass} href="/#business">Amnezia Business</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[16px] font-semibold uppercase tracking-[0.06em] text-[#d5d9e0] md:text-[18px]">AMNEZIA</h4>
          <ul className="mt-3 space-y-2">
            <li><a className={footerLinkClass} href="/amneziawg">AmneziaWG</a></li>
            <li><a className={footerLinkClass} href="/about">About us</a></li>
            <li><a className={footerLinkClass} href="/premium-discount">Switch to Amnezia Premium with a 50% discount</a></li>
            <li><a className={footerLinkClass} href="/blog">Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[16px] font-semibold uppercase tracking-[0.06em] text-[#d5d9e0] md:text-[18px]">CONTACTS</h4>
          <div className="mt-3 space-y-1">
            <a className={`${footerLinkClass} block break-all`} href="mailto:partners@amneziavpnservice.org">partners@amneziavpnservice.org</a>
            <a className={`${footerLinkClass} block break-all`} href="mailto:support@amneziavpnservice.org">support@amneziavpnservice.org</a>
          </div>
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
