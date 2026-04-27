'use client'

import { useState, useMemo } from 'react'
import { useDemoContext } from '@/context/DemoContext'
import { PageShell } from '@/components/layout/PageShell'
import { Search, Bot, TrendingUp, Target, Flame } from 'lucide-react'
import * as serviciosData from '@/data/servicios'
import * as distribuidoraData from '@/data/distribuidora'
import * as pymeData from '@/data/pyme'

type LeadRow = {
  id: string; nombre: string; empresa: string; canal: string
  etapa: string; score: number; valor_estimado: number
  responsable: string; fecha: string
}

const ETAPA_STYLES: Record<string, string> = {
  nuevo: 'bg-slate-700/40 text-slate-400 border-slate-600/30',
  contactado: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  calificado: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  reunion_agendada: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  propuesta_enviada: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  perdido: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const ETAPA_LABELS: Record<string, string> = {
  nuevo: 'Nuevo',
  contactado: 'Contactado',
  calificado: 'Calificado',
  reunion_agendada: 'Reunión',
  propuesta_enviada: 'Propuesta',
  perdido: 'Perdido',
}

const CANAL_COLORS: Record<string, string> = {
  LinkedIn: 'text-sky-400',
  Referido: 'text-purple-400',
  Web: 'text-blue-400',
  Evento: 'text-green-400',
  Feria: 'text-green-400',
  'Cold Email': 'text-slate-400',
  Instagram: 'text-pink-400',
  Google: 'text-amber-400',
  TikTok: 'text-violet-400',
  WhatsApp: 'text-emerald-400',
  Visita: 'text-orange-400',
}

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? 'text-green-400' : score >= 60 ? 'text-amber-400' : score >= 40 ? 'text-blue-400' : 'text-slate-500'
  return <span className={`text-xs font-mono font-bold ${color}`}>{score}</span>
}

export default function LeadsPage() {
  const { rubro } = useDemoContext()
  const [search, setSearch] = useState('')
  const [etapaFilter, setEtapaFilter] = useState<string>('todos')
  const [showAgent, setShowAgent] = useState(false)

  const rawLeads: { id: string; nombre: string; empresa: string; canal: string; etapa: string; score: number; valor_estimado: number; responsable: string; fecha: string }[] =
    rubro.key === 'servicios'
      ? (serviciosData.leads as any[])
      : rubro.key === 'distribuidora'
      ? (distribuidoraData.leads as any[])
      : (pymeData.leads as any[])

  const leads: LeadRow[] = rawLeads.map(l => ({
    id: l.id,
    nombre: l.nombre,
    empresa: l.empresa,
    canal: l.canal,
    etapa: l.etapa,
    score: l.score,
    valor_estimado: l.valor_estimado,
    responsable: l.responsable,
    fecha: l.fecha,
  }))

  const agentText = (
    rubro.key === 'servicios' ? serviciosData.agentResponses
    : rubro.key === 'distribuidora' ? distribuidoraData.agentResponses
    : pymeData.agentResponses
  ).leads

  const filtered = useMemo(() => {
    return leads.filter(l => {
      const q = search.toLowerCase()
      const matchSearch = !q || l.nombre.toLowerCase().includes(q) || l.empresa.toLowerCase().includes(q) || l.canal.toLowerCase().includes(q)
      const matchEtapa = etapaFilter === 'todos' || l.etapa === etapaFilter
      return matchSearch && matchEtapa
    }).sort((a, b) => b.score - a.score)
  }, [leads, search, etapaFilter])

  const etapas = ['nuevo', 'contactado', 'calificado', 'reunion_agendada', 'propuesta_enviada', 'perdido']
  const stats = {
    total: leads.length,
    calificados: leads.filter(l => l.score >= 70).length,
    pipeline: leads.filter(l => l.etapa !== 'perdido').reduce((s, l) => s + l.valor_estimado, 0),
    conversionRate: Math.round(leads.filter(l => l.etapa === 'propuesta_enviada').length / leads.length * 100),
  }

  return (
    <PageShell title="Leads" description={`Pipeline de prospectos — ${rubro.empresa}`}>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total leads', value: String(stats.total), icon: Target, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Hot (score ≥70)', value: String(stats.calificados), icon: Flame, color: 'text-red-400', bg: 'bg-red-500/10' },
          { label: 'Pipeline', value: fmt(stats.pipeline), icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/10' },
          { label: 'En propuesta', value: `${stats.conversionRate}%`, icon: Target, color: 'text-amber-400', bg: 'bg-amber-500/10' },
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

      {/* Agent panel toggle */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowAgent(v => !v)}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-500/15 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <p className="text-sm font-semibold text-slate-100">Análisis de Pipeline — Agente de Ventas</p>
          </div>
          <span className="text-xs text-slate-500">{showAgent ? 'Ocultar' : 'Ver análisis'}</span>
        </button>
        {showAgent && (
          <div className="px-5 pb-5 border-t border-slate-800">
            <div className="mt-4 space-y-1">
              {agentText.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={i} className="text-sm font-semibold text-blue-400 mt-3 mb-1 first:mt-0">{line.replace(/\*\*/g, '')}</p>
                }
                if (/^\d+\. /.test(line)) {
                  const [num, ...rest] = line.split('. ')
                  const content = rest.join('. ')
                  const boldMatch = content.match(/^\*\*(.+?)\*\*(.*)/)
                  return (
                    <div key={i} className="flex gap-2 mb-1.5">
                      <span className="text-blue-500/60 text-xs font-mono flex-shrink-0 mt-0.5">{num}.</span>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {boldMatch ? <><span className="text-slate-200 font-medium">{boldMatch[1]}</span>{boldMatch[2]}</> : content}
                      </p>
                    </div>
                  )
                }
                if (line.startsWith('- ')) {
                  return <p key={i} className="text-xs text-slate-400 leading-relaxed ml-4 mb-1">– {line.slice(2)}</p>
                }
                if (line.trim() === '') return <div key={i} className="h-1" />
                return <p key={i} className="text-xs text-slate-400 leading-relaxed mb-1">{line}</p>
              })}
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 flex-1 min-w-48">
          <Search className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Buscar nombre, empresa o canal..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none w-full"
          />
        </div>
        <div className="flex flex-wrap gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
          <button
            onClick={() => setEtapaFilter('todos')}
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${etapaFilter === 'todos' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Todos
          </button>
          {etapas.map(e => (
            <button
              key={e}
              onClick={() => setEtapaFilter(e)}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${etapaFilter === e ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {ETAPA_LABELS[e]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800">
          <p className="text-xs text-slate-500">{filtered.length} lead{filtered.length !== 1 ? 's' : ''} — ordenados por score</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['Score', 'Nombre / Empresa', 'Canal', 'Etapa', 'Valor est.', 'Responsable', 'Fecha'].map(h => (
                  <th key={h} className="text-left py-2.5 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 50).map(l => (
                <tr key={l.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-4 w-16">
                    <ScoreBadge score={l.score} />
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-slate-200">{l.nombre}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{l.empresa}</p>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`text-xs font-medium ${CANAL_COLORS[l.canal] ?? 'text-slate-400'}`}>{l.canal}</span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border ${ETAPA_STYLES[l.etapa] ?? ETAPA_STYLES.nuevo}`}>
                      {ETAPA_LABELS[l.etapa] ?? l.etapa}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-mono text-blue-400 whitespace-nowrap">{fmt(l.valor_estimado)}</td>
                  <td className="py-3 px-4 text-xs text-slate-400 whitespace-nowrap">{l.responsable}</td>
                  <td className="py-3 px-4 text-xs font-mono text-slate-500 whitespace-nowrap">{l.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 50 && (
          <div className="px-5 py-3 border-t border-slate-800">
            <p className="text-xs text-slate-500">Mostrando 50 de {filtered.length}. Usa el buscador para filtrar.</p>
          </div>
        )}
      </div>

    </PageShell>
  )
}
