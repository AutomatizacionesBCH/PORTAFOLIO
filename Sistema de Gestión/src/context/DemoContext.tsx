'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import {
  LayoutDashboard, Users, TrendingUp, Megaphone,
  Briefcase, ShoppingCart, Store, Package, Wallet, FileText,
  type LucideIcon,
} from 'lucide-react'

export type RubroKey = 'servicios' | 'distribuidora' | 'pyme'

export type NavItem = { label: string; href: string; icon: LucideIcon; description?: string }

export interface RubroConfig {
  key: RubroKey
  label: string
  empresa: string
  rubro: string
  operacionLabel: string   // "Proyectos" | "Pedidos" | "Ventas"
  operacionHref: string
  extraLabel: string       // "Propuestas" | "Inventario" | "Caja"
  extraHref: string
  extraIcon: LucideIcon
  navItems: NavItem[]
}

const baseNav = (opLabel: string, opHref: string, extraLabel: string, extraHref: string, extraIcon: LucideIcon): NavItem[] => [
  { label: 'Dashboard',   href: '/dashboard',   icon: LayoutDashboard, description: 'Resumen ejecutivo' },
  { label: opLabel,       href: opHref,         icon: opLabel === 'Proyectos' ? Briefcase : opLabel === 'Pedidos' ? ShoppingCart : Store, description: opLabel },
  { label: 'Clientes',    href: '/clientes',    icon: Users,    description: 'Base de clientes' },
  { label: 'Leads',       href: '/leads',       icon: TrendingUp, description: 'Pipeline de prospectos' },
  { label: 'Marketing',   href: '/marketing',   icon: Megaphone, description: 'Campañas y canales' },
  { label: extraLabel,    href: extraHref,      icon: extraIcon, description: extraLabel },
]

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
    navItems: baseNav('Proyectos', '/operaciones', 'Propuestas', '/propuestas', FileText),
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
    navItems: baseNav('Pedidos', '/operaciones', 'Inventario', '/inventario', Package),
  },
  {
    key: 'pyme',
    label: 'PyME',
    empresa: 'Núcleo Retail',
    rubro: 'Comercio de Equipamiento y Tecnología',
    operacionLabel: 'Ventas',
    operacionHref: '/operaciones',
    extraLabel: 'Caja',
    extraHref: '/caja',
    extraIcon: Wallet,
    navItems: baseNav('Ventas', '/operaciones', 'Caja', '/caja', Wallet),
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
