import { getStats } from '@/lib/sanity/queries'
import StatGrid from '@/components/Statistics/StatGrid'

export default async function StatSection() {
  const stats = await getStats()
  return <StatGrid stats={stats} />
}