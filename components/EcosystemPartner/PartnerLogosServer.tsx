import { getPartners } from '@/lib/sanity/queries'
import PartnersSectionClient from '@/components/EcosystemPartner/PartnerLogos'

export default async function PartnerSection() {
  const partners = await getPartners()
  return <PartnersSectionClient partners={partners} />
}