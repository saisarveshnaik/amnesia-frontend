import { Calendar, Clock3 } from 'lucide-react'

type BlogCardProps = {
  title: string
  tags: string[]
  date?: string
  readingTime?: string
  image: string
  imageAlt: string
  compact?: boolean
}

function BlogCard({ title, tags, date, readingTime, image, imageAlt, compact = false }: BlogCardProps) {
  return (
    <article
      className={`rounded-[22px] border border-[#1b2231] bg-[#171d2a] ${
        compact ? 'grid grid-cols-[1fr_auto] items-center gap-5 p-6 md:p-7' : 'grid md:grid-cols-[1.45fr_2fr]'
      }`}
    >
      {!compact ? (
        <img src={image} alt={imageAlt} className="h-full w-full rounded-l-[22px] object-cover" />
      ) : null}

      <div className={compact ? '' : 'p-7 md:p-8'}>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-2.5 py-1 text-[12px] font-medium leading-none ${
                tag === 'Amnezia News' || tag === 'Recommended'
                  ? 'border-[#f3a854] text-[#f3a854]'
                  : 'border-[#404554] text-[#d2d5db]'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className={`mt-5 font-bold leading-[1.14] text-[#e6e8ee] ${compact ? 'text-[24px]' : 'text-[26px] md:text-[40px]'}`}>
          {title}
        </h3>
        {date && readingTime ? (
          <div className="mt-5 flex items-center gap-5 text-[13px] text-[#8f97a5]">
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

      {compact ? <img src={image} alt={imageAlt} className="h-[90px] w-[90px] rounded-2xl object-cover" /> : null}
    </article>
  )
}

export default BlogCard
