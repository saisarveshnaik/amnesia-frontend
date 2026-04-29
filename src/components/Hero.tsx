type HeroProps = {
  image: string
  arrowRight: string
}

function Hero({ image, arrowRight }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#0f1523] bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(255,0,132,0.2),transparent_42%),radial-gradient(circle_at_66%_36%,rgba(28,94,255,0.18),transparent_40%)]" />
      <div className="relative mx-auto grid w-full max-w-[2200px] grid-cols-1 items-center gap-8 px-[15px] pb-8 pt-12 md:px-[30px] lg:grid-cols-[1fr_1.08fr] lg:pb-0 lg:pt-10 xl:px-[70px]">
        <div className="max-w-[520px] pb-12 lg:pb-20">
          <h1 className="text-[38px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#e8eaef] md:text-[60px]">
            Internet freedom has
            <br />
            a name
          </h1>
          <p className="mt-7 max-w-[500px] text-[17px] leading-[1.5] text-[#9aa2b0] md:text-[22px]">
            Connect to Amnezia services or create your own private VPN in just a few steps
          </p>
          <button
            type="button"
            className="mt-10 inline-flex h-[56px] items-center gap-3 rounded-[14px] bg-[#f3ad62] px-8 text-[20px] font-bold text-[#21180d] shadow-[0_6px_24px_rgba(255,170,84,0.28)] transition hover:bg-[#ffc27b]"
          >
            Choose a VPN
            <img src={arrowRight} alt="" className="h-6 w-6" />
          </button>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <img
            src={image}
            alt="Amnezia app on a phone"
            className="w-full max-w-[610px] rounded-[28px] object-contain lg:max-w-[700px]"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
