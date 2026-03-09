import { sanityClient} from '@/lib/sanity/client'
import { getFAQs } from '@/lib/sanity/queries'

import FAQSection from './FAQSection'

export default async function FAQ() {
    const faqs = await getFAQs()
    return <FAQSection faqs={faqs} />
  }