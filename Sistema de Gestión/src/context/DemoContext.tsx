'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import {
  LayoutDashboard, Users, Megaphone,
  Briefcase, ShoppingCart, Package, Wallet, FileText,
  Building2, Truck, Wrench, Calendar,
  type LucideIcon,
} from 'lucide-react'

export type RubroKey = 'servicios' | 'distribuidora' | 'pyme'

export type NavItem = { label: string; href: string; icon: LucideIcon; description?: string }

export interface RubroConfig {
  key: RubroKey
  label: string
  empresa: string
  rubro: string
  operacionLabel: string
  operacionHref: string
  extraLabel: string
  extraHref: string
  extraIcon: LucideIcon
  navItems: NavItem[]
}

export const rubros: RubroConfig[] = [
  {
    key: 'servicios',
    label: 'Empresa de Servicios',
    empresa: 'Altum Consultoría',
    rubro: 'Consultoría de Procesos y Tecnología',
    operacionLabel: 'Proyectos',
    operacionHref: '/operaciones',
    extraLabel: 'Propuestas',
    extraHref: '/propuestas',
    extraIcon: FileText,
    navItems: [
      { label: 'Dashboard',   href: '/dashboard',   icon: LayoutDashboard },
      { label: 'Proyectos',   href: '/operaciones', icon: Briefcase },
      { label: 'Clientes',    href: '/clientes',    icon: Users },
      { label: 'Leads',       href: '/leads',       icon: Megaphone },
      { label: 'Marketing',   href: '/marketing',   icon: Megaphone },
      { label: 'Propuestas',  href: '/propuestas',  icon: FileText },
    ],
  },
  {
    key: 'distribuidora',
    label: 'Distribuidora',
    empresa: 'Vértice Distribuciones',
    rubro: 'Distribución de Insumos y Equipamiento',
    operacionLabel: 'Pedidos',
    operacionHref: '/operaciones',
    extraLabel: 'Inventario',
    extraHref: '/inventario',
    extraIcon: Package,
    navItems: [
      { label: 'Dashboard',    href: '/dashboard',    icon: LayoutDashboard },
      { label: 'Pedidos',      href: '/operaciones',  icon: ShoppingCart },
      { label: 'Clientes',     href: '/clientes',     icon: Users },
      { label: 'Inventario',   href: '/inventario',   icon: Package },
      { label: 'Proveedores',  href: '/proveedores',  icon: Building2 },
      { label: 'Despachos',    href: '/despachos',    icon: Truck },
    ],
  },
  {
    key: 'pyme',
    label: 'PyME de Servicios',
    empresa: 'Servicios Rápidos Ltda.',
    rubro: 'Mantención y Reparación Industrial',
    operacionLabel: 'Servicios',
    operacionHref: '/servicios',
    extraLabel: 'Caja',
    extraHref: '/caja',
    extraIcon: Wallet,
    navItems: [
      { label: 'Dashboard',  href: '/dashboard',  icon: LayoutDashboard },
      { label: 'Servicios',  href: '/servicios',  icon: Wrench },
      { label: 'Clientes',   href: '/clientes',   icon: Users },
      { label: 'Caja',       href: '/caja',       icon: Wallet },
      { label: 'Agenda',     href: '/agenda',     icon: Calendar },
    ],
  },
]

interface DemoContextValue {
  rubro: RubroConfig
  setRubro: (key: RubroKey) => void
}

const DemoContext = createContext<DemoContextValue>({
  rubro: rubros[0],
  setRubro: () => {},
})

export function DemoProvider({ children }: { children: ReactNode }) {
  const [key, setKey] = useState<RubroKey>('servicios')

  useEffect(() => {
    const saved = localStorage.getItem('demo-rubro') as RubroKey | null
    if (saved && rubros.find(r => r.key === saved)) setKey(saved)
  }, [])

  const setRubro = (k: RubroKey) => {
    setKey(k)
    localStorage.setItem('demo-rubro', k)
  }

  const rubro = rubros.find(r => r.key === key)!

  return (
    <DemoContext.Provider value={{ rubro, setRubro }}>
      {children}
    </DemoContext.Provider>
  )
}

export const useDemoContext = () => useContext(DemoContext)
