'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/config/navigation'

type SidebarItemProps = {
  item: NavItem
  isActive: boolean
  onNavClick?: () => void
}

export function SidebarItem({ item, isActive, onNavClick }: SidebarItemProps) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      onClick={onNavClick}
      className={cn(
        'relative flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors',
        isActive
          ? 'bg-white/[0.08] text-white font-medium'
          : 'text-white/45 hover:bg-white/[0.04] hover:text-white/75'
      )}
    >
      {isActive && (
        <span className="absolute left-0 top-2 bottom-2 w-px bg-white/60 rounded-r-full" />
      )}
      <Icon
        className={cn(
          'w-4 h-4 flex-shrink-0',
          isActive ? 'text-white/90' : 'text-white/35'
        )}
      />
      <span>{item.label}</span>
    </Link>
  )
}
