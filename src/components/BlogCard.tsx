import { Calendar, Clock3 } from 'lucide-react'

type BlogCardProps = {
  title: string
  description?: string
  tags: string[]
  date?: string
  readingTime?: string
  image: string
  imageAlt: string
  compact?: boolean
}

function BlogCard({ title, description, tags, date, readingTime, image, imageAlt, compact = false }: BlogCardProps) {
  return (
    <article
      className={`rounded-[22px] border border-[#1b2231] bg-[#171d2a] ${
        compact ? 'grid grid-cols-[1fr_auto] items-center gap-3 p-4 sm:gap-5 sm:p-6 md:p-7' : 'grid md:grid-cols-[1.45fr_2fr]'
      }`}
    >
      {!compact ? (
        <img src={image} alt={imageAlt} className="h-full w-full rounded-t-[22px] object-cover md:rounded-l-[22px] md:rounded-tr-none" />
      ) : null}

      <div className={compact ? '' : 'p-5 sm:p-6 md:p-8'}>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-2.5 py-1 text-[12px] font-medium leading-none ${
                tag === 'Sunhill News' || tag === 'Recommended'
                  ? 'border-[#f3a854] text-[#f3a854]'
                  : 'border-[#404554] text-[#d2d5db]'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3
          className={`mt-4 font-bold leading-[1.14] text-[#e6e8ee] ${
            compact ? 'text-[19px] sm:text-[22px] md:text-[24px]' : 'text-[24px] sm:text-[28px] md:text-[40px]'
          }`}
        >
          {title}
        </h3>
        {description ? (
          <p className="mt-4 max-w-[560px] text-[16px] leading-[1.5] text-[#919aa8] sm:text-[17px] md:mt-5 md:text-[19px]">{description}</p>
        ) : null}
        {date && readingTime ? (
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[13px] text-[#8f97a5] sm:mt-5 sm:gap-5">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              {readingTime}
            </span>
          </div>
        ) : null}
      </div>

      {compact ? <img src={image} alt={imageAlt} className="h-[74px] w-[74px] rounded-2xl object-cover sm:h-[90px] sm:w-[90px]" /> : null}
    </article>
  )
}

export default BlogCard
