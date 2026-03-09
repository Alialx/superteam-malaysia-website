import { getImageCards } from '@/lib/sanity/queries'
import ImageCardClient from './ImageCardClient'

const COL_SPANS = [2, 1, 2, 1, 2]

export default async function ImageCards() {
  const cards = await getImageCards()

  return (
    <div className="grid grid-cols-8 gap-2" style={{ height: "160px" }}>
      {cards.slice(0, 5).map((card, index) => (
        <ImageCardClient
          key={card._id}
          title={card.title}
          image={card.image}
          index={index}
          className={`col-span-${COL_SPANS[index]} h-full`}
        />
      ))}
    </div>
  )
}