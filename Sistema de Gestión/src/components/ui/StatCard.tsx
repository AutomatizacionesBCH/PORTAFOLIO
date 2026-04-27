import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'

type StatCardProps = {
  label: string
  value: string
  delta?: string
  deltaDirection?: 'up' | 'down' | 'neutral'
  icon?: LucideIcon
  iconColor?: string
  sublabel?: string
}

export function StatCard({
  label,
  value,
  delta,
  deltaDirection = 'neutral',
  icon: Icon,
  iconColor = 'text-white/60',
  sublabel,
}: StatCardProps) {
  return (
    <div className="bg-[#162035] border border-white/[0.07] rounded-lg p-5 hover:border-white/[0.13] transition-colors">
      <div className="flex items-start justify-between">
        <span className="text-[10px] font-semibold text-white/35 uppercase tracking-widest">
          {label}
        </span>
        {Icon && (
          <div className="w-7 h-7 rounded bg-white/[0.06] flex items-center justify-center">
            <Icon className={cn('w-3.5 h-3.5', iconColor)} />
          </div>
        )}
      </div>

      <div className="mt-3">
        <span className="text-2xl font-bold text-white font-mono">{value}</span>
      </div>

      {(delta || sublabel) && (
        <div className="mt-2 flex items-center gap-1.5">
          {delta && (
            <span
              className={cn(
                'flex items-center gap-0.5 text-xs font-medium',
                deltaDirection === 'up' && 'text-emerald-400',
                deltaDirection === 'down' && 'text-red-400',
                deltaDirection === 'neutral' && 'text-white/40'
              )}
            >
              {deltaDirection === 'up' && <TrendingUp className="w-3 h-3" />}
              {deltaDirection === 'down' && <TrendingDown className="w-3 h-3" />}
              {delta}
            </span>
          )}
          {sublabel && <span className="text-xs text-white/30">{sublabel}</span>}
        </div>
      )}
    </div>
  )
}
