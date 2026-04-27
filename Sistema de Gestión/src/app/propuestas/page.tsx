'use client'

import { useState } from 'react'
import { useDemoContext } from '@/context/DemoContext'
import { PageShell } from '@/components/layout/PageShell'
import { FileText } from 'lucide-react'
import * as serviciosData from '@/data/servicios'

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

const ESTADO_STYLES: Record<string, string> = {
  borrador: 'bg-slate-700/40 text-slate-400 border-slate-600/30',
  enviada: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  en_negociacion: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  aprobada: 'bg-green-500/10 text-green-400 border-green-500/20',
  rechazada: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const ESTADO_LABELS: Record<string, string> = {
  borrador: 'Borrador', enviada: 'Enviada', en_negociacion: 'En negociación',
  aprobada: 'Aprobada', rechazada: 'Rechazada',
}

export default function PropuestasPage() {
  const { rubro } = useDemoContext()
  const [filter, setFilter] = useState('todos')

  if (rubro.key !== 'servicios') {
    return (
      <PageShell title="Propuestas" description="Módulo exclusivo de Empresa de Servicios">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
          <FileText className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Este módulo está disponible en el contexto <strong className="text-slate-300">Empresa de Servicios</strong>.</p>
          <p className="text-slate-500 text-xs mt-1">Cambia el contexto en la barra superior.</p>
        </div>
      </PageShell>
    )
  }

  const propuestas = (serviciosData.propuestas as serviciosData.Propuesta[])
    .filter(p => filter === 'todos' || p.estado === filter)

  const stats = {
    total: serviciosData.propuestas.length,
    aprobadas: (serviciosData.propuestas as serviciosData.Propuesta[]).filter(p => p.estado === 'aprobada').length,
    enNegociacion: (serviciosData.propuestas as serviciosData.Propuesta[]).filter(p => p.estado === 'en_negociacion').length,
    valorTotal: (serviciosData.propuestas as serviciosData.Propuesta[]).filter(p => ['enviada', 'en_negociacion', 'aprobada'].includes(p.estado)).reduce((s, p) => s + p.monto, 0),
  }

  return (
    <PageShell title="Propuestas" description={`Propuestas comerciales — ${rubro.empresa}`}>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total propuestas', value: String(stats.total) },
          { label: 'Aprobadas', value: String(stats.aprobadas) },
          { label: 'En negociación', value: String(stats.enNegociacion) },
          { label: 'Pipeline activo', value: fmt(stats.valorTotal) },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">{s.label}</p>
            <p className="text-xl font-bold font-mono text-slate-100">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 w-fit">
        {['todos', 'borrador', 'enviada', 'en_negociacion', 'aprobada', 'rechazada'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded text-xs font-medium capitalize transition-all ${filter === f ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            {ESTADO_LABELS[f] ?? f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800">
          <p className="text-xs text-slate-500">{propuestas.length} propuestas</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['Título', 'Cliente', 'Responsable', 'Monto', 'Válida hasta', 'Estado'].map(h => (
                  <th key={h} className="text-left py-2.5 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {propuestas.map(p => (
                <tr key={p.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-4">
                    <p className="text-sm text-slate-200 font-medium max-w-xs truncate">{p.nombre}</p>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-400 whitespace-nowrap">{p.cliente_potencial}</td>
                  <td className="py-3 px-4 text-xs text-slate-400 whitespace-nowrap">{p.responsable}</td>
                  <td className="py-3 px-4 text-sm font-mono text-blue-400 whitespace-nowrap">{fmt(p.monto)}</td>
                  <td className="py-3 px-4 text-xs font-mono text-slate-500 whitespace-nowrap">{p.validez_hasta}</td>
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
