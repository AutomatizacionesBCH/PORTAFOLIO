'use client'

import { useState, useMemo } from 'react'
import { useDemoContext } from '@/context/DemoContext'
import { PageShell } from '@/components/layout/PageShell'
import { Search, Briefcase, ShoppingCart, Wrench } from 'lucide-react'
import * as serviciosData from '@/data/servicios'
import * as distribuidoraData from '@/data/distribuidora'

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

const ESTADO_STYLES: Record<string, string> = {
  en_curso: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  completado: 'bg-green-500/10 text-green-400 border-green-500/20',
  completada: 'bg-green-500/10 text-green-400 border-green-500/20',
  pausado: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  cancelado: 'bg-red-500/10 text-red-400 border-red-500/20',
  cancelada: 'bg-red-500/10 text-red-400 border-red-500/20',
  entregado: 'bg-green-500/10 text-green-400 border-green-500/20',
  en_ruta: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  pendiente: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  devolucion: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
}

const ESTADO_LABELS: Record<string, string> = {
  en_curso: 'En curso', completado: 'Completado', pausado: 'Pausado', cancelado: 'Cancelado',
  pendiente: 'Pendiente', en_ruta: 'En ruta', entregado: 'Entregado',
  completada: 'Completada', cancelada: 'Cancelada', devolucion: 'Devolución',
}

type Row = {
  id: string; titulo: string; secundario: string; fecha: string
  monto: number; estado: string; extra?: string
}

export default function OperacionesPage() {
  const { rubro } = useDemoContext()
  const [search, setSearch] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('todos')

  const { rows, estados, Icon } = useMemo(() => {
    if (rubro.key === 'servicios') {
      const data = serviciosData.proyectos as serviciosData.Proyecto[]
      return {
        rows: data.map(p => ({
          id: p.id, titulo: p.nombre, secundario: p.cliente,
          fecha: p.inicio, monto: p.monto, estado: p.estado,
          extra: `${p.avance}% completado`,
        })) as Row[],
        estados: ['en_curso', 'completado', 'pausado', 'cancelado'],
        Icon: Briefcase,
      }
    }
    if (rubro.key === 'distribuidora') {
      const data = distribuidoraData.pedidos as distribuidoraData.Pedido[]
      return {
        rows: data.map(p => ({
          id: p.id, titulo: p.empresa, secundario: p.ciudad_destino,
          fecha: p.fecha, monto: p.monto, estado: p.estado,
          extra: `${p.productos} productos`,
        })) as Row[],
        estados: ['pendiente', 'en_ruta', 'entregado', 'cancelado'],
        Icon: ShoppingCart,
      }
    }
    return {
      rows: [] as Row[],
      estados: [] as string[],
      Icon: Wrench,
    }
  }, [rubro])

  const filtered = useMemo(() => {
    return rows.filter(r => {
      const q = search.toLowerCase()
      const matchSearch = !q || r.titulo.toLowerCase().includes(q) || r.secundario.toLowerCase().includes(q)
      const matchEstado = estadoFilter === 'todos' || r.estado === estadoFilter
      return matchSearch && matchEstado
    })
  }, [rows, search, estadoFilter])

  const totalMonto = filtered.reduce((s, r) => s + r.monto, 0)

  return (
    <PageShell title={rubro.operacionLabel} description={`${rubro.operacionLabel} de ${rubro.empresa}`}>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: `Total ${rubro.operacionLabel.toLowerCase()}`, value: String(rows.length) },
          { label: 'En proceso', value: String(rows.filter(r => ['en_curso', 'en_ruta', 'pendiente'].includes(r.estado)).length) },
          { label: 'Completados', value: String(rows.filter(r => ['completado', 'completada', 'entregado'].includes(r.estado)).length) },
          { label: 'Monto total', value: fmt(rows.reduce((s, r) => s + r.monto, 0)) },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-3.5 h-3.5 text-slate-500" />
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
            placeholder={`Buscar ${rubro.operacionLabel.toLowerCase()}...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none w-full"
          />
        </div>
        <div className="flex flex-wrap gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
          <button
            onClick={() => setEstadoFilter('todos')}
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${estadoFilter === 'todos' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Todos
          </button>
          {estados.map(e => (
            <button
              key={e}
              onClick={() => setEstadoFilter(e)}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${estadoFilter === e ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {ESTADO_LABELS[e] ?? e}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-500">{filtered.length} registros</p>
          <p className="text-xs font-mono text-blue-400">{fmt(totalMonto)} total filtrado</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['Título / Detalle', 'Fecha', 'Estado', 'Monto', 'Info'].map(h => (
                  <th key={h} className="text-left py-2.5 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 60).map(r => (
                <tr key={r.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-4">
                    <p className="text-sm text-slate-200 font-medium truncate max-w-xs">{r.titulo}</p>
                    <p className="text-xs text-slate-500 mt-0.5 capitalize">{r.secundario}</p>
                  </td>
                  <td className="py-3 px-4 text-xs font-mono text-slate-500 whitespace-nowrap">{r.fecha}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border ${ESTADO_STYLES[r.estado] ?? 'text-slate-400 border-slate-700'}`}>
                      {ESTADO_LABELS[r.estado] ?? r.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-mono text-blue-400 whitespace-nowrap">{fmt(r.monto)}</td>
                  <td className="py-3 px-4 text-xs text-slate-500 whitespace-nowrap">{r.extra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 60 && (
          <div className="px-5 py-3 border-t border-slate-800">
            <p className="text-xs text-slate-500">Mostrando 60 de {filtered.length}.</p>
          </div>
        )}
      </div>

    </PageShell>
  )
}
