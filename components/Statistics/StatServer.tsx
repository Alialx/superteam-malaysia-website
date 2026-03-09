import { getStats } from '@/lib/sanity/queries'
import { StatsGrid } from '@/components/Statistics/StatGrid'

export default async function StatSection() {
  const stats = await getStats()
  return <StatsGrid stats={stats} />
}