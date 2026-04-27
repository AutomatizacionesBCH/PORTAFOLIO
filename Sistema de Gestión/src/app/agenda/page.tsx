'use client'

import { useState, useMemo } from 'react'
import { useDemoContext } from '@/context/DemoContext'
import { PageShell } from '@/components/layout/PageShell'
import { Calendar, Clock, MapPin } from 'lucide-react'
import * as pymeData from '@/data/pyme'

function fmt(n: number) {
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

const ESTADO_STYLES: Record<string, string> = {
  confirmado: 'bg-green-500/10 text-green-600 border-green-500/20',
  tentativo: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  cancelado: 'bg-red-500/10 text-red-500 border-red-500/20',
}

const TECNICOS = ['Roberto Fuentes', 'Claudia Pizarro', 'Marcos Vera', 'Felipe Torres']

const TECNICO_COLORS: Record<string, string> = {
  'Roberto Fuentes': 'bg-blue-500/10 text-blue-500',
  'Claudia Pizarro': 'bg-purple-500/10 text-purple-500',
  'Marcos Vera': 'bg-green-500/10 text-green-600',
  'Felipe Torres': 'bg-amber-500/10 text-amber-600',
}

export default function AgendaPage() {
  const { rubro } = useDemoContext()
  const [tecnicoFilter, setTecnicoFilter] = useState('todos')

  if (rubro.key !== 'pyme') {
    return (
      <PageShell title="Agenda" description="Módulo exclusivo de PyME de Servicios">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
          <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Este módulo está disponible en el contexto <strong className="text-slate-300">PyME de Servicios</strong>.</p>
        </div>
      </PageShell>
    )
  }

  const agenda = pymeData.agenda as pymeData.AgendaItem[]

  const filtered = useMemo(() => {
    return agenda.filter(a => tecnicoFilter === 'todos' || a.tecnico === tecnicoFilter)
  }, [agenda, tecnicoFilter])

  const confirmados = agenda.filter(a => a.estado === 'confirmado').length
  const tentativos = agenda.filter(a => a.estado === 'tentativo').length
  const totalHoras = agenda.filter(a => a.estado !== 'cancelado').reduce((s, a) => s + a.duracion_hrs, 0)
  const diasUnicos = [...new Set(agenda.map(a => a.fecha))].length

  // Group by date
  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>()
    filtered.forEach(a => {
      if (!map.has(a.fecha)) map.set(a.fecha, [])
      map.get(a.fecha)!.push(a)
    })
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  return (
    <PageShell title="Agenda" description={`Servicios programados — ${rubro.empresa}`}>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Días con servicios', value: String(diasUnicos), color: 'text-blue-400' },
          { label: 'Confirmados', value: String(confirmados), color: 'text-green-500' },
          { label: 'Tentativos', value: String(tentativos), color: 'text-amber-500' },
          { label: 'Horas programadas', value: `${totalHoras}h`, color: 'text-purple-500' },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">{s.label}</p>
            <p className={`text-xl font-bold font-mono ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Técnico filter */}
      <div className="flex flex-wrap gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 w-fit">
        <button onClick={() => setTecnicoFilter('todos')} className={`px-3 py-1 rounded text-xs font-medium transition-all ${tecnicoFilter === 'todos' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
          Todos
        </button>
        {TECNICOS.map(t => (
          <button key={t} onClick={() => setTecnicoFilter(t)} className={`px-3 py-1 rounded text-xs font-medium transition-all ${tecnicoFilter === t ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
            {t.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Calendar grouped by date */}
      <div className="space-y-4">
        {grouped.map(([fecha, items]) => {
          const d = new Date(fecha + 'T12:00:00')
          const dayLabel = d.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })
          return (
            <div key={fecha} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <p className="text-sm font-semibold text-slate-100 capitalize">{dayLabel}</p>
                </div>
                <p className="text-xs text-slate-500">{items.length} servicio{items.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="divide-y divide-slate-800">
                {items.sort((a, b) => a.hora.localeCompare(b.hora)).map(item => (
                  <div key={item.id} className="px-5 py-3 flex gap-4 hover:bg-slate-800/20 transition-colors">
                    <div className="flex-shrink-0 w-12 text-right">
                      <p className="text-xs font-mono font-semibold text-blue-400 mt-0.5">{item.hora}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{item.duracion_hrs}h</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm text-slate-200 truncate">{item.tipo_servicio}</p>
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium border flex-shrink-0 ${ESTADO_STYLES[item.estado]}`}>
                          {item.estado}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{item.cliente} · <span className="text-slate-500">{item.empresa}</span></p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-[10px] text-slate-500">
                          <MapPin className="w-2.5 h-2.5" />
                          {item.direccion}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex items-start">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-medium ${TECNICO_COLORS[item.tecnico] ?? 'bg-slate-800/40 text-slate-400'}`}>
                        {item.tecnico.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

    </PageShell>
  )
}
