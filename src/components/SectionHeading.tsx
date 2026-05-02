import type { ReactNode } from 'react'

type SectionHeadingProps = {
  label?: string
  title?: string
  align?: 'left' | 'center'
  action?: ReactNode
}

function SectionHeading({ label, title, align = 'center', action }: SectionHeadingProps) {
  const alignClass = align === 'left' ? 'items-start text-left' : 'items-center text-center'
  const wrapperClass =
    align === 'left'
      ? 'flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between'
      : 'flex-col items-center gap-3 text-center'

  return (
    <div className={`flex w-full ${wrapperClass}`}>
      <div className={`flex flex-col ${alignClass}`}>
        {label ? <p className="text-[14px] font-normal uppercase tracking-[0.02em] text-[#8d919d] sm:text-[17px] md:text-[22px]">{label}</p> : null}
        {title ? <h2 className="text-[30px] font-bold leading-[1.1] tracking-[-0.01em] text-[#e9ebf0] md:text-[48px]">{title}</h2> : null}
      </div>
      {action}
    </div>
  )
}

export default SectionHeading
