'use client'

import { useState, useMemo } from 'react'
import { useDemoContext } from '@/context/DemoContext'
import { PageShell } from '@/components/layout/PageShell'
import { Search, Building2, Star } from 'lucide-react'
import * as distribuidoraData from '@/data/distribuidora'

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  return `$${(n / 1_000).toFixed(0)}K`
}

function Stars({ n }: { n: number }) {
  return (
    <span className="text-xs font-mono font-semibold text-amber-500">{n.toFixed(1)} ★</span>
  )
}

const ESTADO_STYLES: Record<string, string> = {
  activo: 'bg-green-500/10 text-green-600 border-green-500/20',
  inactivo: 'bg-slate-800/40 text-slate-500 border-slate-700/40',
  evaluacion: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
}
const ESTADO_LABELS: Record<string, string> = {
  activo: 'Activo', inactivo: 'Inactivo', evaluacion: 'En evaluación',
}

export default function ProveedoresPage() {
  const { rubro } = useDemoContext()
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('todas')
  const [estadoFilter, setEstadoFilter] = useState('todos')

  if (rubro.key !== 'distribuidora') {
    return (
      <PageShell title="Proveedores" description="Módulo exclusivo de Distribuidora">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
          <Building2 className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Este módulo está disponible en el contexto <strong className="text-slate-300">Distribuidora</strong>.</p>
        </div>
      </PageShell>
    )
  }

  const proveedores = distribuidoraData.proveedores as distribuidoraData.Proveedor[]
  const categorias = [...new Set(proveedores.map(p => p.categoria))].sort()

  const filtered = useMemo(() => {
    return proveedores.filter(p => {
      const q = search.toLowerCase()
      const matchSearch = !q || p.nombre.toLowerCase().includes(q) || p.contacto.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q) || p.ciudad.toLowerCase().includes(q)
      const matchCat = catFilter === 'todas' || p.categoria === catFilter
      const matchEstado = estadoFilter === 'todos' || p.estado === estadoFilter
      return matchSearch && matchCat && matchEstado
    })
  }, [proveedores, search, catFilter, estadoFilter])

  const activos = proveedores.filter(p => p.estado === 'activo').length
  const enEvaluacion = proveedores.filter(p => p.estado === 'evaluacion').length
  const comprasTotal = proveedores.filter(p => p.estado === 'activo').reduce((s, p) => s + p.compras_anuales, 0)
  const calificacionProm = proveedores.filter(p => p.estado === 'activo').reduce((s, p) => s + p.calificacion, 0) / activos

  return (
    <PageShell title="Proveedores" description={`Registro de proveedores — ${rubro.empresa}`}>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Proveedores activos', value: String(activos), color: 'text-blue-400' },
          { label: 'En evaluación', value: String(enEvaluacion), color: 'text-amber-500' },
          { label: 'Compras anuales', value: fmt(comprasTotal), color: 'text-green-500' },
          { label: 'Calificación prom.', value: `${calificacionProm.toFixed(1)} ★`, color: 'text-pink-500' },
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
            placeholder="Buscar proveedor, contacto o categoría..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none w-full"
          />
        </div>
        <div className="flex flex-wrap gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
          <button onClick={() => setEstadoFilter('todos')} className={`px-3 py-1 rounded text-xs font-medium transition-all ${estadoFilter === 'todos' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>Todos</button>
          {['activo', 'evaluacion', 'inactivo'].map(e => (
            <button key={e} onClick={() => setEstadoFilter(e)} className={`px-3 py-1 rounded text-xs font-medium transition-all ${estadoFilter === e ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
              {ESTADO_LABELS[e]}
            </button>
          ))}
        </div>
        <select
          value={catFilter}
          onChange={e => setCatFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 outline-none"
        >
          <option value="todas">Todas las categorías</option>
          {categorias.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800">
          <p className="text-xs text-slate-500">{filtered.length} proveedor{filtered.length !== 1 ? 'es' : ''}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['Proveedor', 'Categoría', 'Contacto', 'Entrega', 'Calif.', 'Compras anuales', 'Estado'].map(h => (
                  <th key={h} className="text-left py-2.5 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-slate-200 max-w-[200px] truncate">{p.nombre}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{p.ciudad} · {p.condicion_pago}</p>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-400 whitespace-nowrap">{p.categoria}</td>
                  <td className="py-3 px-4 text-xs text-slate-400 whitespace-nowrap">{p.contacto}</td>
                  <td className="py-3 px-4 text-xs font-mono text-slate-400 whitespace-nowrap">{p.tiempo_entrega_dias}d</td>
                  <td className="py-3 px-4 whitespace-nowrap"><Stars n={p.calificacion} /></td>
                  <td className="py-3 px-4 text-sm font-mono text-blue-400 whitespace-nowrap">{p.compras_anuales > 0 ? fmt(p.compras_anuales) : '—'}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border ${ESTADO_STYLES[p.estado]}`}>
                      {ESTADO_LABELS[p.estado]}
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
