'use client'

import { Bell, Menu } from 'lucide-react'
import { useDemoContext, rubros, type RubroKey } from '@/context/DemoContext'

type HeaderProps = {
  onMenuToggle?: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { rubro, setRubro } = useDemoContext()

  return (
    <header className="h-14 sm:h-16 flex-shrink-0 bg-[#0d1526] border-b border-white/[0.07] flex items-center justify-between px-4 sm:px-6 gap-3">

      {/* Left: hamburger (mobile) + DemoSwitcher */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-1.5 rounded hover:bg-white/[0.06] text-white/40 hover:text-white/80 transition-colors flex-shrink-0"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Demo context switcher */}
        <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.07] rounded p-0.5">
          {rubros.map((r) => (
            <button
              key={r.key}
              onClick={() => setRubro(r.key as RubroKey)}
              className={`px-3 py-1 rounded text-[11px] font-medium tracking-wide transition-all ${
                rubro.key === r.key
                  ? 'bg-[#4A9DC8] text-white shadow-sm'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.05]'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button className="relative p-1.5 rounded hover:bg-white/[0.06] text-white/40 hover:text-white/80 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-white/60" />
        </button>
        <div className="h-4 w-px bg-white/10 mx-1.5" />
        <div className="w-7 h-7 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-xs text-white/70 font-medium cursor-pointer hover:bg-white/15 transition-colors">
          A
        </div>
      </div>

    </header>
  )
}
