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
}: ProductCardProps) {
  return (
    <article
      className={`rounded-[22px] border bg-[#050910] p-8 md:p-8 lg:p-[60px] ${
        highlighted
          ? 'border-[#9636f4] shadow-[0_0_0_1px_rgba(204,61,255,0.35),0_0_36px_rgba(190,59,255,0.16)]'
          : 'border-[#1a2435]'
      }`}
    >
      <h3 className="text-[48px] font-bold leading-[1.04] tracking-[-0.01em] text-[#e8eaef]">
        {title} <span className={accentClass}>{accentWord}</span>
      </h3>
      <p className="mt-4 text-[20px] font-normal leading-[1.4] text-[#c9ced8] md:text-[22px] lg:text-[24px]">{subtitle}</p>
      <p className="mt-5 text-[24px] font-medium tracking-[-0.02em] text-[#e4e6eb]">{price}</p>

      <button
        type="button"
        onClick={onGet}
        disabled={isGetLoading}
        className={`mt-7 inline-flex h-12 w-full items-center justify-center rounded-[12px] border text-[20px] font-bold transition ${
          highlighted
            ? 'border-[#f4ad61] bg-[#f4ad61] text-[#24170a] shadow-[0_0_22px_rgba(255,170,90,0.24)] hover:bg-[#ffc27b]'
            : 'border-[#f4ad61] text-[#f5b56d] hover:bg-[#f4ad61]/10'
        } disabled:cursor-not-allowed disabled:opacity-75`}
      >
        {isGetLoading ? 'Processing...' : 'Get'}
      </button>

      <ul className="mt-8 space-y-4">
        {features.map((feature) => (
          <li key={feature.text} className="flex items-start gap-4 text-[17px] leading-[28px] text-[#a6adb9] md:gap-5 md:text-[20px]">
            <span className="mt-0.5 text-[#d5d9e2]">{feature.icon}</span>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default ProductCard
