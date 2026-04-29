import { Plus } from 'lucide-react'

type FAQItemProps = {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-[#1b2432]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left text-[18px] font-medium text-[#eceef3] transition-colors hover:text-[#f3ab60] md:text-[25px]"
      >
        <span>{question}</span>
        <Plus className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? 'rotate-45' : ''}`} />
      </button>
      <div className={`grid overflow-hidden transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="max-w-[820px] text-[18px] leading-[1.5] text-[#9ea6b4]">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default FAQItem
