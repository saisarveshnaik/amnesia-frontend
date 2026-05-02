type FeatureCardProps = {
  title: string
  description: string
  image: string
  imageAlt: string
  centered?: boolean
}

function FeatureCard({ title, description, image, imageAlt, centered = false }: FeatureCardProps) {
  return (
    <article className="rounded-[18px] border border-[#1a2435] bg-[linear-gradient(155deg,#161b24_0%,#0f1320_45%,#121826_100%)] p-5 sm:p-6 md:p-10">
      <div className={centered ? 'flex flex-col items-center text-center' : ''}>
        <h3 className="text-[22px] font-bold leading-[1.2] tracking-[-0.01em] text-[#ebedf2] sm:text-[26px] md:text-[32px]">{title}</h3>
        <p className="mt-4 max-w-[580px] text-[16px] leading-[1.5] text-[#919aa8] sm:text-[17px] md:mt-5 md:text-[20px]">{description}</p>
      </div>
      <img
        src={image}
        alt={imageAlt}
        className={`mt-6 ${centered ? 'mx-auto max-h-[160px] sm:max-h-[190px]' : 'max-h-[160px] sm:max-h-[188px]'} w-auto object-contain md:mt-8`}
      />
    </article>
  )
}

export default FeatureCard
