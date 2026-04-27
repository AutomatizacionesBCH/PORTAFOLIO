'use client'

import { useState, useMemo } from 'react'
import { useDemoContext } from '@/context/DemoContext'
import { PageShell } from '@/components/layout/PageShell'
import { Search, Wrench } from 'lucide-react'
import * as pymeData from '@/data/pyme'

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

const ESTADO_STYLES: Record<string, string> = {
  pendiente: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  en_ejecucion: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  completado: 'bg-green-500/10 text-green-600 border-green-500/20',
  cancelado: 'bg-red-500/10 text-red-500 border-red-500/20',
}
const ESTADO_LABELS: Record<string, string> = {
  pendiente: 'Pendiente', en_ejecucion: 'En ejecución',
  completado: 'Completado', cancelado: 'Cancelado',
}

const TECNICOS = ['Roberto Fuentes', 'Claudia Pizarro', 'Marcos Vera', 'Felipe Torres']

export default function ServiciosPage() {
  const { rubro } = useDemoContext()
  const [search, setSearch] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('todos')
  const [tecnicoFilter, setTecnicoFilter] = useState('todos')

  if (rubro.key !== 'pyme') {
    return (
      <PageShell title="Servicios" description="Módulo exclusivo de PyME de Servicios">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
          <Wrench className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Este módulo está disponible en el contexto <strong className="text-slate-300">PyME de Servicios</strong>.</p>
        </div>
      </PageShell>
    )
  }

  const servicios = pymeData.servicios as pymeData.Servicio[]

  const filtered = useMemo(() => {
    return servicios.filter(s => {
      const q = search.toLowerCase()
      const matchSearch = !q || s.cliente.toLowerCase().includes(q) || s.empresa.toLowerCase().includes(q) || s.tipo_servicio.toLowerCase().includes(q)
      const matchEstado = estadoFilter === 'todos' || s.estado === estadoFilter
      const matchTecnico = tecnicoFilter === 'todos' || s.tecnico === tecnicoFilter
      return matchSearch && matchEstado && matchTecnico
    })
  }, [servicios, search, estadoFilter, tecnicoFilter])

  const stats = {
    total: servicios.length,
    completados: servicios.filter(s => s.estado === 'completado').length,
    en_ejecucion: servicios.filter(s => s.estado === 'en_ejecucion').length,
    monto: servicios.filter(s => s.estado !== 'cancelado').reduce((sum, s) => sum + s.monto, 0),
  }

  return (
    <PageShell title="Servicios" description={`Órdenes de servicio — ${rubro.empresa}`}>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total servicios', value: String(stats.total), color: 'text-blue-400' },
          { label: 'Completados', value: String(stats.completados), color: 'text-green-500' },
          { label: 'En ejecución', value: String(stats.en_ejecucion), color: 'text-sky-500' },
          { label: 'Facturación total', value: fmt(stats.monto), color: 'text-purple-500' },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="w-3.5 h-3.5 text-slate-500" />
              <p className="text-xs text-slate-400 uppercase tracking-wider">{s.label}</p>
            </div>
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
            placeholder="Buscar cliente, empresa o tipo de servicio..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none w-full"
          />
        </div>
        <div className="flex flex-wrap gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
          <button onClick={() => setEstadoFilter('todos')} className={`px-3 py-1 rounded text-xs font-medium transition-all ${estadoFilter === 'todos' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>Todos</button>
          {Object.entries(ESTADO_LABELS).map(([k, v]) => (
            <button key={k} onClick={() => setEstadoFilter(k)} className={`px-3 py-1 rounded text-xs font-medium transition-all ${estadoFilter === k ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>{v}</button>
          ))}
        </div>
        <select
          value={tecnicoFilter}
          onChange={e => setTecnicoFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 outline-none"
        >
          <option value="todos">Todos los técnicos</option>
          {TECNICOS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-500">{filtered.length} servicios</p>
          <p className="text-xs font-mono text-blue-400">{fmt(filtered.filter(s => s.estado !== 'cancelado').reduce((sum, s) => sum + s.monto, 0))} facturación filtrada</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['Tipo de servicio', 'Cliente / Empresa', 'Técnico', 'Fecha', 'Duración', 'Monto', 'Estado'].map(h => (
                  <th key={h} className="text-left py-2.5 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-4">
                    <p className="text-sm text-slate-200 max-w-[220px] truncate">{s.tipo_servicio}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-slate-300 whitespace-nowrap">{s.cliente}</p>
                    <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[140px]">{s.empresa}</p>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-400 whitespace-nowrap">{s.tecnico}</td>
                  <td className="py-3 px-4 text-xs font-mono text-slate-500 whitespace-nowrap">{s.fecha}</td>
                  <td className="py-3 px-4 text-xs font-mono text-slate-400 whitespace-nowrap">{s.duracion_hrs}h</td>
                  <td className="py-3 px-4 text-sm font-mono text-blue-400 whitespace-nowrap">{fmt(s.monto)}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border ${ESTADO_STYLES[s.estado]}`}>
                      {ESTADO_LABELS[s.estado]}
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
