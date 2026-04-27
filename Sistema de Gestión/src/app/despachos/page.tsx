'use client'

import { useState, useMemo } from 'react'
import { useDemoContext } from '@/context/DemoContext'
import { PageShell } from '@/components/layout/PageShell'
import { Search, Truck } from 'lucide-react'
import * as distribuidoraData from '@/data/distribuidora'

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

const ESTADO_STYLES: Record<string, string> = {
  en_preparacion: 'bg-slate-800/40 text-slate-400 border-slate-700/40',
  despachado: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  en_transito: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
  entregado: 'bg-green-500/10 text-green-600 border-green-500/20',
  devolucion: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
}
const ESTADO_LABELS: Record<string, string> = {
  en_preparacion: 'En preparación',
  despachado: 'Despachado',
  en_transito: 'En tránsito',
  entregado: 'Entregado',
  devolucion: 'Devolución',
}

export default function DespachosPage() {
  const { rubro } = useDemoContext()
  const [search, setSearch] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('todos')

  if (rubro.key !== 'distribuidora') {
    return (
      <PageShell title="Despachos" description="Módulo exclusivo de Distribuidora">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
          <Truck className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Este módulo está disponible en el contexto <strong className="text-slate-300">Distribuidora</strong>.</p>
        </div>
      </PageShell>
    )
  }

  const despachos = distribuidoraData.despachos as distribuidoraData.Despacho[]

  const filtered = useMemo(() => {
    return despachos.filter(d => {
      const q = search.toLowerCase()
      const matchSearch = !q || d.empresa.toLowerCase().includes(q) || d.ciudad_destino.toLowerCase().includes(q) || d.guia.toLowerCase().includes(q) || d.transportista.toLowerCase().includes(q)
      const matchEstado = estadoFilter === 'todos' || d.estado === estadoFilter
      return matchSearch && matchEstado
    })
  }, [despachos, search, estadoFilter])

  const enTransito = despachos.filter(d => ['en_transito', 'despachado'].includes(d.estado)).length
  const entregados = despachos.filter(d => d.estado === 'entregado').length
  const enPrep = despachos.filter(d => d.estado === 'en_preparacion').length
  const devoluciones = despachos.filter(d => d.estado === 'devolucion').length

  return (
    <PageShell title="Despachos" description={`Seguimiento de envíos — ${rubro.empresa}`}>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'En tránsito', value: String(enTransito), color: 'text-sky-500' },
          { label: 'En preparación', value: String(enPrep), color: 'text-slate-400' },
          { label: 'Entregados', value: String(entregados), color: 'text-green-500' },
          { label: 'Devoluciones', value: String(devoluciones), color: 'text-orange-500' },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">{s.label}</p>
            <p className={`text-xl font-bold font-mono ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 flex-1 min-w-48">
          <Search className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Buscar empresa, ciudad, guía o transportista..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none w-full"
          />
        </div>
        <div className="flex flex-wrap gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
          <button onClick={() => setEstadoFilter('todos')} className={`px-3 py-1 rounded text-xs font-medium transition-all ${estadoFilter === 'todos' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>Todos</button>
          {Object.keys(ESTADO_LABELS).map(e => (
            <button key={e} onClick={() => setEstadoFilter(e)} className={`px-3 py-1 rounded text-xs font-medium transition-all ${estadoFilter === e ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
              {ESTADO_LABELS[e]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-500">{filtered.length} despachos</p>
          <p className="text-xs font-mono text-blue-400">{fmt(filtered.reduce((s, d) => s + d.monto, 0))} total filtrado</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['Empresa / Destino', 'Guía', 'Transportista', 'Despacho', 'Est. entrega', 'Bultos', 'Monto', 'Estado'].map(h => (
                  <th key={h} className="text-left py-2.5 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-slate-200 max-w-[180px] truncate">{d.empresa}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{d.ciudad_destino}</p>
                  </td>
                  <td className="py-3 px-4 text-xs font-mono text-slate-400 whitespace-nowrap">{d.guia}</td>
                  <td className="py-3 px-4 text-xs text-slate-400 whitespace-nowrap">{d.transportista}</td>
                  <td className="py-3 px-4 text-xs font-mono text-slate-500 whitespace-nowrap">{d.fecha_despacho}</td>
                  <td className="py-3 px-4 text-xs font-mono text-slate-500 whitespace-nowrap">
                    {d.fecha_entrega
                      ? <span className="text-green-500">{d.fecha_entrega}</span>
                      : d.fecha_estimada}
                  </td>
                  <td className="py-3 px-4 text-xs font-mono text-slate-400 whitespace-nowrap">{d.bultos} blt · {d.peso_kg}kg</td>
                  <td className="py-3 px-4 text-sm font-mono text-blue-400 whitespace-nowrap">{fmt(d.monto)}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border ${ESTADO_STYLES[d.estado]}`}>
                      {ESTADO_LABELS[d.estado]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </PageShell>
  )
}
