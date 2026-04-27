'use client'

import { useDemoContext } from '@/context/DemoContext'
import { PageShell } from '@/components/layout/PageShell'
import {
  TrendingUp, DollarSign, Users, Target,
  ShoppingCart, Star, BarChart3, Bot,
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts'

import * as serviciosData from '@/data/servicios'
import * as distribuidoraData from '@/data/distribuidora'
import * as pymeData from '@/data/pyme'

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

function KpiCard({
  label, value, sub, icon: Icon, color, bg,
}: {
  label: string; value: string; sub?: string
  icon: React.ElementType; color: string; bg: string
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-7 h-7 rounded-md flex items-center justify-center ${bg}`}>
          <Icon className={`w-3.5 h-3.5 ${color}`} />
        </div>
        <p className="text-xs text-slate-400 uppercase tracking-wider leading-tight">{label}</p>
      </div>
      <p className="text-xl font-bold font-mono text-slate-100 leading-none">{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </div>
  )
}

const TOOLTIP_STYLE = {
  contentStyle: { background: '#1B2A4A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4 },
  labelStyle: { color: '#8BA8C4', fontSize: 11 },
  itemStyle: { color: '#C7CEDA', fontSize: 12 },
}

export default function DashboardPage() {
  const { rubro } = useDemoContext()

  const data = rubro.key === 'servicios'
    ? serviciosData
    : rubro.key === 'distribuidora'
    ? distribuidoraData
    : pymeData

  const kpis = data.kpis as Record<string, number>
  const revenueData = data.revenueData
  const agentText = (data.agentResponses as Record<string, string>).dashboard

  // Recent ops list: pick the right one
  const recentItems: { id: string; label: string; fecha: string; monto: number; estado: string }[] =
    rubro.key === 'servicios'
      ? (serviciosData.proyectos as serviciosData.Proyecto[]).slice(0, 6).map(p => ({
          id: p.id, label: p.cliente, fecha: p.inicio, monto: p.monto, estado: p.estado,
        }))
      : rubro.key === 'distribuidora'
      ? (distribuidoraData.pedidos as distribuidoraData.Pedido[]).slice(0, 6).map(p => ({
          id: p.id, label: p.empresa, fecha: p.fecha, monto: p.monto, estado: p.estado,
        }))
      : (pymeData.ventas as pymeData.Venta[]).slice(0, 6).map(v => ({
          id: v.id, label: v.cliente, fecha: v.fecha, monto: v.monto, estado: v.estado,
        }))

  const topClientes = (data.clientes as { nombre: string; empresa: string; ingresos_total: number; estado: string }[])
    .filter(c => c.estado === 'vip')
    .slice(0, 5)

  const ESTADO_COLORS: Record<string, string> = {
    en_curso: 'text-blue-400', completado: 'text-green-400', pausado: 'text-amber-400',
    cancelado: 'text-red-400', entregado: 'text-green-400', en_ruta: 'text-blue-400',
    pendiente: 'text-amber-400', cancelada: 'text-red-400', completada: 'text-green-400',
    devolucion: 'text-orange-400',
  }

  const kpiCards = rubro.key === 'servicios'
    ? [
        { label: 'Ingresos mes', value: fmt(kpis.ingresos_mes), icon: DollarSign, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Proyectos activos', value: String(kpis.proyectos_activos), icon: BarChart3, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        { label: 'Leads calificados', value: String(kpis.leads_calificados), icon: Target, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { label: 'Tasa de cierre', value: `${kpis.tasa_cierre}%`, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/10' },
        { label: 'Clientes activos', value: String(serviciosData.clientes.filter(c => c.estado !== 'inactivo').length), icon: Users, color: 'text-sky-400', bg: 'bg-sky-500/10' },
        { label: 'NPS', value: String(kpis.nps), icon: Star, color: 'text-pink-400', bg: 'bg-pink-500/10' },
      ]
    : rubro.key === 'distribuidora'
    ? [
        { label: 'Ingresos mes', value: fmt(kpis.ingresos_mes), icon: DollarSign, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Pedidos mes', value: String(kpis.pedidos_mes), icon: ShoppingCart, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        { label: 'Leads calificados', value: String(kpis.leads_calificados), icon: Target, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { label: 'Tasa cierre', value: `${kpis.tasa_cierre}%`, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/10' },
        { label: 'Clientes activos', value: String(distribuidoraData.clientes.filter(c => c.estado !== 'inactivo').length), icon: Users, color: 'text-sky-400', bg: 'bg-sky-500/10' },
        { label: 'NPS', value: String(kpis.nps), icon: Star, color: 'text-pink-400', bg: 'bg-pink-500/10' },
      ]
    : [
        { label: 'Ingresos mes', value: fmt(kpis.ingresos_mes), icon: DollarSign, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Ventas mes', value: String(kpis.ventas_mes), icon: ShoppingCart, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        { label: 'Leads calificados', value: String(kpis.leads_calificados), icon: Target, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { label: 'Ticket promedio', value: fmt(kpis.ticket_promedio), icon: BarChart3, color: 'text-green-400', bg: 'bg-green-500/10' },
        { label: 'Clientes activos', value: String(pymeData.clientes.filter(c => c.estado !== 'inactivo').length), icon: Users, color: 'text-sky-400', bg: 'bg-sky-500/10' },
        { label: 'Saldo caja', value: fmt(kpis.saldo_caja), icon: DollarSign, color: 'text-pink-400', bg: 'bg-pink-500/10' },
      ]

  const opLabel = rubro.key === 'servicios' ? 'Proyectos recientes'
    : rubro.key === 'distribuidora' ? 'Pedidos recientes' : 'Ventas recientes'

  return (
    <PageShell title="Dashboard" description={`Resumen ejecutivo — ${rubro.empresa}`}>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {kpiCards.map(k => (
          <KpiCard key={k.label} label={k.label} value={k.value} icon={k.icon} color={k.color} bg={k.bg} />
        ))}
      </div>

      {/* Revenue chart + recent items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800">
            <p className="text-sm font-semibold text-slate-100">Ingresos vs Costos</p>
            <p className="text-xs text-slate-500 mt-0.5">Últimos 12 meses</p>
          </div>
          <div className="p-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4A9DC8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4A9DC8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gCostos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8BA8C4" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8BA8C4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="mes" tick={{ fill: '#8BA8C4', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis
                  tickFormatter={v => `$${(v / 1_000_000).toFixed(0)}M`}
                  tick={{ fill: '#8BA8C4', fontSize: 10 }} axisLine={false} tickLine={false} width={48}
                />
                <Tooltip
                  formatter={(v) => [`$${((v as number) / 1_000_000).toFixed(1)}M`]}
                  {...TOOLTIP_STYLE}
                />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#8BA8C4' }} />
                <Area type="monotone" dataKey="ingresos" name="Ingresos" stroke="#4A9DC8" fill="url(#gIngresos)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="costos" name="Costos" stroke="#8BA8C4" fill="url(#gCostos)" strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent ops */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800">
            <p className="text-sm font-semibold text-slate-100">{opLabel}</p>
          </div>
          <div className="divide-y divide-slate-800">
            {recentItems.map(item => (
              <div key={item.id} className="px-5 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-slate-300 truncate">{item.label}</p>
                  <p className="text-[10px] font-mono text-slate-500 mt-0.5">{item.fecha}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-mono text-slate-200">{fmt(item.monto)}</p>
                  <p className={`text-[10px] capitalize mt-0.5 ${ESTADO_COLORS[item.estado] ?? 'text-slate-400'}`}>
                    {item.estado.replace(/_/g, ' ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clients VIP + Agent analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* VIP clients */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-2">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <p className="text-sm font-semibold text-slate-100">Clientes VIP</p>
          </div>
          <div className="divide-y divide-slate-800">
            {topClientes.map(c => (
              <div key={c.empresa} className="px-5 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-slate-300 truncate">{c.nombre}</p>
                  <p className="text-[10px] text-slate-500 truncate">{c.empresa}</p>
                </div>
                <p className="text-sm font-mono text-blue-400 flex-shrink-0">{fmt(c.ingresos_total)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Agent analysis */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-500/15 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">Análisis del Agente</p>
              <p className="text-[10px] text-slate-500">Revenue Intelligence — {rubro.empresa}</p>
            </div>
          </div>
          <div className="p-5">
            {agentText.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="text-sm font-semibold text-emerald-400 mt-3 mb-1 first:mt-0">{line.replace(/\*\*/g, '')}</p>
              }
              if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
                const [num, ...rest] = line.split('. ')
                const content = rest.join('. ')
                const boldMatch = content.match(/^\*\*(.+?)\*\*(.*)/)
                return (
                  <div key={i} className="flex gap-2 mb-1.5">
                    <span className="text-emerald-500/60 text-xs font-mono flex-shrink-0 mt-0.5">{num}.</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {boldMatch ? <><span className="text-slate-200 font-medium">{boldMatch[1]}</span>{boldMatch[2]}</> : content}
                    </p>
                  </div>
                )
              }
              if (line.startsWith('- ')) {
                return <p key={i} className="text-xs text-slate-400 leading-relaxed ml-4 mb-1 before:content-['–'] before:mr-2 before:text-slate-600">{line.slice(2)}</p>
              }
              if (line.trim() === '') return <div key={i} className="h-1" />
              return <p key={i} className="text-xs text-slate-400 leading-relaxed mb-1">{line}</p>
            })}
          </div>
        </div>
      </div>

    </PageShell>
  )
}
