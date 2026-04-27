import { cn } from '@/lib/utils'

type BadgeVariant = 'active' | 'inactive' | 'pending' | 'warning' | 'info'

const variantStyles: Record<BadgeVariant, string> = {
  active:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/15',
  inactive: 'bg-white/[0.05] text-white/40 border-white/[0.08]',
  pending:  'bg-amber-500/10 text-amber-400 border-amber-500/15',
  warning:  'bg-red-500/10 text-red-400 border-red-500/15',
  info:     'bg-[#4a9eff]/10 text-[#4a9eff] border-[#4a9eff]/15',
}

const dotStyles: Record<BadgeVariant, string> = {
  active:   'bg-emerald-400',
  inactive: 'bg-white/30',
  pending:  'bg-amber-400',
  warning:  'bg-red-400',
  info:     'bg-[#4a9eff]',
}

const defaultLabels: Record<BadgeVariant, string> = {
  active:   'Activo',
  inactive: 'Inactivo',
  pending:  'Pendiente',
  warning:  'Alerta',
  info:     'Info',
}

type BadgeProps = {
  variant: BadgeVariant
  label?: string
}

export function Badge({ variant, label }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium border',
        variantStyles[variant]
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotStyles[variant])} />
      {label ?? defaultLabels[variant]}
    </span>
  )
}
