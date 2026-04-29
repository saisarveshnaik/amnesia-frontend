import type { ReactNode } from 'react'

type SectionHeadingProps = {
  label?: string
  title?: string
  align?: 'left' | 'center'
  action?: ReactNode
}

function SectionHeading({ label, title, align = 'center', action }: SectionHeadingProps) {
  const alignClass = align === 'left' ? 'items-start text-left' : 'items-center text-center'

  return (
    <div className={`flex w-full justify-between gap-4 ${align === 'left' ? 'items-end' : 'items-center'}`}>
      <div className={`flex flex-col ${alignClass}`}>
        {label ? <p className="text-[17px] font-normal uppercase tracking-[0.02em] text-[#8d919d] md:text-[22px]">{label}</p> : null}
        {title ? <h2 className="text-[34px] font-bold leading-[1.1] tracking-[-0.01em] text-[#e9ebf0] md:text-[48px]">{title}</h2> : null}
      </div>
      {action}
    </div>
  )
}

export default SectionHeading
