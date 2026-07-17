type HeroProps = {
  image: string
  arrowRight: string
}

function Hero({ image, arrowRight }: HeroProps) {
  return (
    <section id="home" className="relative scroll-mt-24 overflow-hidden border-b border-[#0f1523] bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(255,0,132,0.2),transparent_42%),radial-gradient(circle_at_66%_36%,rgba(28,94,255,0.18),transparent_40%)]" />
      <div className="relative mx-auto grid w-full max-w-[2200px] grid-cols-1 items-center gap-8 px-[15px] pb-8 pt-10 md:px-[30px] lg:grid-cols-[1fr_1.08fr] lg:pb-0 lg:pt-10 xl:px-[70px]">
        <div className="max-w-[520px] pb-4 text-center md:pb-8 lg:pb-20 lg:text-left">
          <h1 className="text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#e8eaef] sm:text-[42px] md:text-[60px]">
            Internet freedom has
            <br />
            a name
          </h1>
          <p className="mt-6 max-w-[500px] text-[16px] leading-[1.5] text-[#9aa2b0] md:text-[22px]">
            Connect to Sunhill Secure VPN in just a few steps
          </p>
          <a
            href="#products"
            className="mt-8 inline-flex h-[52px] w-full items-center justify-center gap-3 rounded-[14px] bg-[#f3ad62] px-6 text-[18px] font-bold text-[#21180d] shadow-[0_6px_24px_rgba(255,170,84,0.28)] transition hover:bg-[#ffc27b] sm:mt-10 sm:w-auto sm:px-8 sm:text-[20px]"
          >
            Choose a VPN
            <img src={arrowRight} alt="" className="h-6 w-6" />
          </a>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <img
            src={image}
            alt="Sunhill Secure VPN app on a phone"
            className="w-full max-w-[610px] rounded-[20px] object-contain sm:rounded-[24px] lg:max-w-[700px] lg:rounded-[28px]"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
