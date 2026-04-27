'use client'

import { usePathname } from 'next/navigation'
import { useDemoContext } from '@/context/DemoContext'
import { SidebarItem } from './SidebarItem'

export function Sidebar({ onNavClick }: { onNavClick?: () => void }) {
  const pathname = usePathname()
  const { rubro } = useDemoContext()

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0d1526] border-r border-white/[0.07] flex flex-col h-screen">

      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/[0.07]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium tracking-[0.18em] text-white uppercase">
              Automatizaciones
            </span>
            <span className="border border-white px-1.5 py-0.5 text-[10px] font-bold text-white tracking-widest">
              BCH
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/40 tracking-wide">
              Sistema de Gestión
            </span>
            <span className="bg-white/10 text-white/50 px-1.5 py-px rounded-sm text-[9px] font-semibold tracking-widest uppercase">
              Demo
            </span>
          </div>
        </div>
      </div>

      {/* Empresa activa */}
      <div className="px-5 py-3 border-b border-white/[0.07] bg-white/[0.02]">
        <p className="text-[9px] font-semibold text-white/25 uppercase tracking-widest mb-0.5">Empresa activa</p>
        <p className="text-[12px] font-semibold text-white/90 truncate">{rubro.empresa}</p>
        <p className="text-[10px] text-white/35 truncate">{rubro.rubro}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest px-3 mb-2">
          Módulos
        </p>
        {rubro.navItems.map((item) => (
          <SidebarItem
            key={item.href}
            item={item}
            isActive={
              pathname === item.href || pathname.startsWith(item.href + '/')
            }
            onNavClick={onNavClick}
          />
        ))}
      </nav>

      {/* User footer */}
      <div className="p-4 border-t border-white/[0.07]">
        <div className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/[0.04] transition-colors cursor-pointer">
          <div className="w-7 h-7 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-xs text-white/70 font-medium flex-shrink-0">
            A
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-white/80 truncate">
              Administrador
            </span>
            <span className="text-[10px] text-white/35 truncate">
              automatizacionesbch.com
            </span>
          </div>
        </div>
      </div>

    </aside>
  )
}
