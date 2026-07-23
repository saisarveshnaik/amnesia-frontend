import type { ReactNode } from 'react'

type ProductCardProps = {
  title: string
  accentWord: string
  accentClass: string
  subtitle: string
  price: string
  features: { icon: ReactNode; text: string }[]
  highlighted?: boolean
  onGet?: () => void
  isGetLoading?: boolean
  isSubscribed?: boolean
  onViewCode?: () => void
}

function ProductCard({
  title,
  accentWord,
  accentClass,
  subtitle,
  price,
  features,
  highlighted = false,
  onGet,
  isGetLoading = false,
  isSubscribed = false,
  onViewCode,
}: ProductCardProps) {
  return (
    <article
      className={`rounded-[22px] border bg-[#050910] p-5 sm:p-6 md:p-8 lg:p-[60px] ${
        highlighted
          ? 'border-[#9636f4] shadow-[0_0_0_1px_rgba(204,61,255,0.35),0_0_36px_rgba(190,59,255,0.16)]'
          : 'border-[#1a2435]'
      }`}
    >
      <h3 className="text-[32px] font-bold leading-[1.06] tracking-[-0.01em] text-[#e8eaef] sm:text-[40px] md:text-[48px]">
        {title} <span className={accentClass}>{accentWord}</span>
      </h3>
      <p className="mt-4 text-[17px] font-normal leading-[1.45] text-[#c9ced8] sm:text-[19px] md:text-[22px] lg:text-[24px]">{subtitle}</p>
      <p className="mt-5 text-[21px] font-medium tracking-[-0.02em] text-[#e4e6eb] sm:text-[24px]">{price}</p>

      {isSubscribed ? (
        <div className="mt-6 flex h-11 w-full items-center justify-between rounded-[12px] border border-[#2f7d52] bg-[#0f2419] px-4 text-[15px] font-semibold text-[#5fe3a0] sm:mt-7 sm:h-12 sm:text-[16px]">
          <span>Subscribed</span>
          {onViewCode ? (
            <button type="button" onClick={onViewCode} className="font-bold text-[#f5b56d] underline-offset-2 hover:underline">
              View code
            </button>
          ) : null}
        </div>
      ) : (
        <button
          type="button"
          onClick={onGet}
          disabled={isGetLoading}
          className={`mt-6 inline-flex h-11 w-full items-center justify-center rounded-[12px] border text-[18px] font-bold transition sm:mt-7 sm:h-12 sm:text-[20px] ${
            highlighted
              ? 'border-[#f4ad61] bg-[#f4ad61] text-[#24170a] shadow-[0_0_22px_rgba(255,170,90,0.24)] hover:bg-[#ffc27b]'
              : 'border-[#f4ad61] text-[#f5b56d] hover:bg-[#f4ad61]/10'
          } disabled:cursor-not-allowed disabled:opacity-75`}
        >
          {isGetLoading ? 'Processing...' : 'Get'}
        </button>
      )}

      <ul className="mt-7 space-y-4 sm:mt-8">
        {features.map((feature) => (
          <li key={feature.text} className="flex items-start gap-3 text-[16px] leading-[1.5] text-[#a6adb9] sm:gap-4 md:gap-5 md:text-[20px] md:leading-[28px]">
            <span className="mt-0.5 text-[#d5d9e2]">{feature.icon}</span>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default ProductCard
