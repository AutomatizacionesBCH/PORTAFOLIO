'use client'

import { useState, useMemo } from 'react'
import { useDemoContext } from '@/context/DemoContext'
import { PageShell } from '@/components/layout/PageShell'
import { Search, Star, Users, TrendingUp } from 'lucide-react'
import * as serviciosData from '@/data/servicios'
import * as distribuidoraData from '@/data/distribuidora'
import * as pymeData from '@/data/pyme'

type ClienteRow = {
  id: string; nombre: string; empresa: string; email: string
  telefono: string; sector: string; estado: string
  metric: number; metricLabel: string; ultimo_contacto: string; ciudad: string
}

const ESTADO_STYLES: Record<string, string> = {
  vip: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  activo: 'bg-green-500/10 text-green-400 border-green-500/20',
  inactivo: 'bg-slate-700/40 text-slate-500 border-slate-700/40',
}

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

export default function ClientesPage() {
  const { rubro } = useDemoContext()
  const [search, setSearch] = useState('')
  const [estadoFilter, setEstadoFilter] = useState<string>('todos')

  const rawClientes = rubro.key === 'servicios'
    ? serviciosData.clientes
    : rubro.key === 'distribuidora'
    ? distribuidoraData.clientes
    : pymeData.clientes

  const clientes: ClienteRow[] = rawClientes.map(c => ({
    id: c.id,
    nombre: c.nombre,
    empresa: c.empresa,
    email: c.email,
    telefono: c.telefono,
    sector: c.sector,
    estado: c.estado,
    metric: c.ingresos_total,
    metricLabel: 'Ingresos',
    ultimo_contacto: c.ultimo_contacto,
    ciudad: c.ciudad,
  }))

  const filtered = useMemo(() => {
    return clientes.filter(c => {
      const q = search.toLowerCase()
      const matchSearch = !q || c.nombre.toLowerCase().includes(q) || c.empresa.toLowerCase().includes(q) || c.ciudad.toLowerCase().includes(q)
      const matchEstado = estadoFilter === 'todos' || c.estado === estadoFilter
      return matchSearch && matchEstado
    })
  }, [clientes, search, estadoFilter])

  const totales = {
    total: clientes.length,
    vip: clientes.filter(c => c.estado === 'vip').length,
    activos: clientes.filter(c => c.estado === 'activo').length,
    ingresos: clientes.reduce((s, c) => s + c.metric, 0),
  }

  return (
    <PageShell title="Clientes" description={`Base de clientes — ${rubro.empresa}`}>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total clientes', value: String(totales.total), icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Clientes VIP', value: String(totales.vip), icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Activos', value: String(totales.activos), icon: Users, color: 'text-green-400', bg: 'bg-green-500/10' },
          { label: 'Ingresos acum.', value: fmt(totales.ingresos), icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-6 h-6 rounded-md flex items-center justify-center ${s.bg}`}>
                <s.icon className={`w-3 h-3 ${s.color}`} />
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">{s.label}</p>
            </div>
            <p className="text-xl font-bold font-mono text-slate-100">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 flex-1 min-w-48">
          <Search className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Buscar por nombre, empresa o ciudad..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none w-full"
          />
        </div>
        <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
          {['todos', 'vip', 'activo', 'inactivo'].map(f => (
            <button
              key={f}
              onClick={() => setEstadoFilter(f)}
              className={`px-3 py-1 rounded text-xs font-medium capitalize transition-all ${
                estadoFilter === f ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800">
          <p className="text-xs text-slate-500">{filtered.length} cliente{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['Nombre / Empresa', 'Sector', 'Ciudad', 'Estado', 'Ingresos', 'Últ. contacto'].map(h => (
                  <th key={h} className="text-left py-2.5 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 50).map(c => (
                <tr key={c.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-slate-200">{c.nombre}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{c.empresa}</p>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-400 whitespace-nowrap">{c.sector}</td>
                  <td className="py-3 px-4 text-xs text-slate-400 whitespace-nowrap">{c.ciudad}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border capitalize ${ESTADO_STYLES[c.estado] ?? ESTADO_STYLES.activo}`}>
                      {c.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-mono text-blue-400 whitespace-nowrap">{fmt(c.metric)}</td>
                  <td className="py-3 px-4 text-xs font-mono text-slate-500 whitespace-nowrap">{c.ultimo_contacto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 50 && (
          <div className="px-5 py-3 border-t border-slate-800">
            <p className="text-xs text-slate-500">Mostrando 50 de {filtered.length} resultados. Usa el buscador para filtrar.</p>
          </div>
        )}
      </div>

    </PageShell>
  )
}
