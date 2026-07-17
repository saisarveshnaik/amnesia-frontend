type FooterProps = {
  logo: string
}

function Footer({ logo }: FooterProps) {
  const footerLinkClass = 'text-[16px] font-medium leading-[1.45] text-[#f6b45e] transition-colors hover:text-[#ffc987] md:text-[18px]'

  return (
    <footer className="border-t border-[#141c2b] pt-10 text-[#d7dae1] md:pt-14">
      <div className="grid gap-8 border-b border-[#141c2b] pb-8 sm:grid-cols-2 md:gap-10 md:pb-10 lg:grid-cols-[1.15fr_1fr_1fr_1.25fr]">
        <div>
          <div className="flex items-center gap-4">
            <img src={logo} alt="" className="h-[74px] w-[74px] object-contain sm:h-[92px] sm:w-[92px]" />
            <span className="max-w-[190px] text-[22px] font-bold leading-tight text-[#eef2f7]">Sunhill Secure VPN</span>
          </div>
        </div>

        <div>
          <h4 className="text-[16px] font-semibold uppercase tracking-[0.06em] text-[#d5d9e0] md:text-[18px]">PRODUCTS</h4>
          <ul className="mt-3 space-y-2">
            <li><a className={footerLinkClass} href="/#premium">Sunhill Secure VPN Premium</a></li>
            <li><a className={footerLinkClass} href="/#free">Sunhill Secure VPN Free</a></li>
            <li><a className={footerLinkClass} href="/#business">Sunhill Secure VPN Business</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[16px] font-semibold uppercase tracking-[0.06em] text-[#d5d9e0] md:text-[18px]">SUNHILL SECURE VPN</h4>
          <ul className="mt-3 space-y-2">
            <li><a className={footerLinkClass} href="/sunhillwg">SunhillWG</a></li>
            <li><a className={footerLinkClass} href="/about">About us</a></li>
            <li><a className={footerLinkClass} href="/premium-discount">Switch to Premium with a 50% discount</a></li>
            <li><a className={footerLinkClass} href="/blog">Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[16px] font-semibold uppercase tracking-[0.06em] text-[#d5d9e0] md:text-[18px]">CONTACTS</h4>
          <div className="mt-3 space-y-1">
            <a className={`${footerLinkClass} block break-all`} href="mailto:partners@sunhillservices.com">partners@sunhillservices.com</a>
            <a className={`${footerLinkClass} block break-all`} href="mailto:support@sunhillservices.com">support@sunhillservices.com</a>
          </div>
        </div>
      </div>

      <div className="space-y-3 py-6 text-center text-[11px] text-[#7f8899] sm:text-[12px] md:space-y-4 md:py-8 md:text-[14px]">
        <p>Privacy and Acceptable Use Policy</p>
        <p>Payment and Terms of Use Policy</p>
        <p>(c) 2026 Sunhill Secure VPN. All rights reserved. Sun Hill Services LP (UK registration SL035113). Address: 101 Rose Street Lane Edinburgh Scotland UK - EH23JG</p>
      </div>
    </footer>
  )
}

export default Footer
