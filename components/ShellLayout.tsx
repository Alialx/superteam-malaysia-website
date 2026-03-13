'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname.startsWith('/sanity-studio')

  return (
    <>
      {!isStudio && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isStudio && <Footer />}
    </>
  )
}