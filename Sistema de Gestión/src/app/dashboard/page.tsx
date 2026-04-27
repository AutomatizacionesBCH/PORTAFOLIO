'use client'

import { useState, useMemo } from 'react'
import { useDemoContext } from '@/context/DemoContext'
import { PageShell } from '@/components/layout/PageShell'
import {
  TrendingUp, DollarSign, Users, Target,
  ShoppingCart, Star, BarChart3, Bot, X,
  Truck, CheckCircle, AlertCircle, Wrench, Calendar,
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
  contentStyle: { background: '#FFFFFF', border: '1px solid #C8D8E8', borderRadius: 4 },
  labelStyle: { color: '#3D5A78', fontSize: 11 },
  itemStyle: { color: '#244565', fontSize: 12 },
}

const ESTADO_COLORS: Record<string, string> = {
  en_curso: 'text-blue-400', completado: 'text-green-400', pausado: 'text-amber-400',
  cancelado: 'text-red-400', entregado: 'text-green-400', en_ruta: 'text-blue-400',
  pendiente: 'text-amber-400', cancelada: 'text-red-400', completada: 'text-green-400',
  devolucion: 'text-orange-400', en_ejecucion: 'text-blue-400',
}

const PERIODO_OPTS = ['3M', '6M', '12M'] as const
type Periodo = typeof PERIODO_OPTS[number]

type DetailItem = {
  id: string
  titulo: string
  secundario: string
  fecha: string
  monto: number
  estado: string
  extra1?: string
  extra2?: string
  extra3?: string
}

function DetailPanel({
  item,
  onClose,
  rubroKey,
}: {
  item: DetailItem
  onClose: () => void
  rubroKey: string
}) {
  const estadoLabel: Record<string, string> = {
    en_curso: 'En curso', completado: 'Completado', pausado: 'Pausado', cancelado: 'Cancelado',
    entregado: 'Entregado', en_ruta: 'En ruta', pendiente: 'Pendiente',
    completada: 'Completada', cancelada: 'Cancelada', devolucion: 'Devolución',
    en_ejecucion: 'En ejecución',
  }
  const estadoStyle: Record<string, string> = {
    en_curso: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    completado: 'bg-green-500/10 text-green-600 border-green-500/20',
    pausado: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    cancelado: 'bg-red-500/10 text-red-500 border-red-500/20',
    entregado: 'bg-green-500/10 text-green-600 border-green-500/20',
    en_ruta: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
    pendiente: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    completada: 'bg-green-500/10 text-green-600 border-green-500/20',
    cancelada: 'bg-red-500/10 text-red-500 border-red-500/20',
    devolucion: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    en_ejecucion: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  }

  const labelMap: Record<string, [string, string, string]> = {
    servicios:     ['Cliente',    'Inicio',      'Avance'],
    distribuidora: ['Empresa',    'Fecha',       'Productos'],
    pyme:          ['Cliente',    'Fecha',       'Técnico'],
  }
  const [l1, l2, l3] = labelMap[rubroKey] ?? ['Detalle', 'Fecha', 'Info']

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-slate-100/60 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-80 z-50 bg-white border-l border-slate-800 shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <p className="text-sm font-semibold text-slate-100">Detalle</p>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-800/30 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div>
            <p className="text-base font-semibold text-slate-100 leading-snug">{item.titulo}</p>
            <p className="text-sm text-slate-400 mt-0.5">{item.secundario}</p>
          </div>
          <div>
            <span className={`inline-flex px-2.5 py-1 rounded text-xs font-semibold border ${estadoStyle[item.estado] ?? 'bg-slate-800/40 text-slate-400 border-slate-700'}`}>
              {estadoLabel[item.estado] ?? item.estado}
            </span>
          </div>
          <div className="space-y-3 pt-1">
            <div className="flex justify-between">
              <span className="text-xs text-slate-500 uppercase tracking-wide">Monto</span>
              <span className="text-sm font-mono font-semibold text-blue-400">{fmt(item.monto)}</span>
            </div>
            {item.extra1 && (
              <div className="flex justify-between">
                <span className="text-xs text-slate-500 uppercase tracking-wide">{l1}</span>
                <span className="text-sm text-slate-300 text-right max-w-[180px] truncate">{item.extra1}</span>
              </div>
            )}
            {item.extra2 && (
              <div className="flex justify-between">
                <span className="text-xs text-slate-500 uppercase tracking-wide">{l2}</span>
                <span className="text-sm font-mono text-slate-400">{item.extra2}</span>
              </div>
            )}
            {item.extra3 && (
              <div className="flex justify-between">
                <span className="text-xs text-slate-500 uppercase tracking-wide">{l3}</span>
                <span className="text-sm text-slate-400">{item.extra3}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default function DashboardPage() {
  const { rubro } = useDemoContext()
  const [periodo, setPeriodo] = useState<Periodo>('12M')
  const [selectedItem, setSelectedItem] = useState<DetailItem | null>(null)

  const data = rubro.key === 'servicios'
    ? serviciosData
    : rubro.key === 'distribuidora'
    ? distribuidoraData
    : pymeData

  const kpis = data.kpis as Record<string, number>
  const fullRevenueData = data.revenueData
  const agentText = (data.agentResponses as Record<string, string>).dashboard

  const revenueData = useMemo(() => {
    const slices: Record<Periodo, number> = { '3M': 3, '6M': 6, '12M': 12 }
    const n = slices[periodo]
    return fullRevenueData.slice(-n)
  }, [fullRevenueData, periodo])

  const allItems: DetailItem[] = useMemo(() => {
    if (rubro.key === 'servicios') {
      return (serviciosData.proyectos as serviciosData.Proyecto[]).slice(0, 8).map(p => ({
        id: p.id, titulo: p.nombre, secundario: p.cliente,
        fecha: p.inicio, monto: p.monto, estado: p.estado,
        extra1: p.cliente, extra2: p.inicio, extra3: `${p.avance}%`,
      }))
    }
    if (rubro.key === 'distribuidora') {
      return (distribuidoraData.pedidos as distribuidoraData.Pedido[]).slice(0, 8).map(p => ({
        id: p.id, titulo: p.empresa, secundario: p.ciudad_destino,
        fecha: p.fecha, monto: p.monto, estado: p.estado,
        extra1: p.empresa, extra2: p.fecha, extra3: `${p.productos} productos`,
      }))
    }
    return (pymeData.servicios as pymeData.Servicio[]).slice(0, 8).map(s => ({
      id: s.id, titulo: s.tipo_servicio, secundario: s.empresa,
      fecha: s.fecha, monto: s.monto, estado: s.estado,
      extra1: s.cliente, extra2: s.fecha, extra3: s.tecnico,
    }))
  }, [rubro])

  const topClientes = (data.clientes as { nombre: string; empresa: string; ingresos_total: number; estado: string }[])
    .filter(c => c.estado === 'vip')
    .slice(0, 5)

  const kpiCards = rubro.key === 'servicios'
    ? [
        { label: 'Ingresos mes', value: fmt(kpis.ingresos_mes), icon: DollarSign, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Proyectos activos', value: String(kpis.proyectos_activos ?? kpis.pedidos_mes), icon: BarChart3, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Leads calificados', value: String(kpis.leads_calificados), icon: Target, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { label: 'Tasa de cierre', value: `${kpis.tasa_cierre}%`, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'Clientes activos', value: String(serviciosData.clientes.filter(c => c.estado !== 'inactivo').length), icon: Users, color: 'text-sky-500', bg: 'bg-sky-500/10' },
        { label: 'NPS', value: String(kpis.nps), icon: Star, color: 'text-pink-500', bg: 'bg-pink-500/10' },
      ]
    : rubro.key === 'distribuidora'
    ? [
        { label: 'Pedidos del mes', value: String(kpis.pedidos_mes), icon: ShoppingCart, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'En tránsito', value: String(kpis.en_transito), icon: Truck, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Completados', value: String(kpis.completados_mes), icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'Devoluciones', value: String(kpis.devoluciones), icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
        { label: 'Monto despachado', value: fmt(kpis.monto_despachado), icon: DollarSign, color: 'text-sky-500', bg: 'bg-sky-500/10' },
        { label: 'Cobertura stock', value: `${kpis.cobertura_stock}%`, icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-500/10' },
      ]
    : [
        { label: 'Servicios del mes', value: String(kpis.servicios_mes), icon: Wrench, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Completados', value: String(kpis.servicios_completados), icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'Clientes nuevos', value: String(kpis.clientes_nuevos), icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { label: 'Ingresos mes', value: fmt(kpis.ingresos_mes), icon: DollarSign, color: 'text-sky-500', bg: 'bg-sky-500/10' },
        { label: 'Pagos pendientes', value: fmt(kpis.pagos_pendientes), icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Satisfacción', value: `${kpis.satisfaccion}/5`, icon: Star, color: 'text-pink-500', bg: 'bg-pink-500/10' },
      ]

  const opLabel = rubro.key === 'servicios' ? 'Proyectos recientes'
    : rubro.key === 'distribuidora' ? 'Pedidos recientes' : 'Servicios recientes'

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
          <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-100">Ingresos vs Costos</p>
              <p className="text-xs text-slate-500 mt-0.5">Evolución mensual</p>
            </div>
            {/* Period filter */}
            <div className="flex gap-0.5 bg-slate-800/40 rounded-lg p-0.5">
              {PERIODO_OPTS.map(p => (
                <button
                  key={p}
                  onClick={() => setPeriodo(p)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${periodo === p ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3A8CC0" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3A8CC0" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gCostos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5A7A96" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#5A7A96" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="mes" tick={{ fill: '#5A7A96', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis
                  tickFormatter={v => `$${(v / 1_000_000).toFixed(0)}M`}
                  tick={{ fill: '#5A7A96', fontSize: 10 }} axisLine={false} tickLine={false} width={48}
                />
                <Tooltip
                  formatter={(v) => [`$${((v as number) / 1_000_000).toFixed(1)}M`]}
                  {...TOOLTIP_STYLE}
                />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#5A7A96' }} />
                <Area type="monotone" dataKey="ingresos" name="Ingresos" stroke="#3A8CC0" fill="url(#gIngresos)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="costos" name="Costos" stroke="#5A7A96" fill="url(#gCostos)" strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent ops — clickable */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800">
            <p className="text-sm font-semibold text-slate-100">{opLabel}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Clic para ver detalle</p>
          </div>
          <div className="divide-y divide-slate-800">
            {allItems.map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="w-full px-5 py-3 flex items-center justify-between gap-3 hover:bg-slate-800/30 transition-colors text-left"
              >
                <div className="min-w-0">
                  <p className="text-sm text-slate-300 truncate">{item.titulo}</p>
                  <p className="text-[10px] font-mono text-slate-500 mt-0.5">{item.fecha}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-mono text-slate-200">{fmt(item.monto)}</p>
                  <p className={`text-[10px] capitalize mt-0.5 ${ESTADO_COLORS[item.estado] ?? 'text-slate-400'}`}>
                    {item.estado.replace(/_/g, ' ')}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Clients VIP + Agent analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* VIP clients */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-2">
            <Star className="w-3.5 h-3.5 text-amber-500" />
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
              <Bot className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">Análisis del Agente</p>
              <p className="text-[10px] text-slate-500">{rubro.empresa}</p>
            </div>
          </div>
          <div className="p-5">
            {agentText.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="text-sm font-semibold text-emerald-600 mt-3 mb-1 first:mt-0">{line.replace(/\*\*/g, '')}</p>
              }
              if (/^\d+\. /.test(line)) {
                const [num, ...rest] = line.split('. ')
                const content = rest.join('. ')
                const boldMatch = content.match(/^\*\*(.+?)\*\*(.*)/)
                return (
                  <div key={i} className="flex gap-2 mb-1.5">
                    <span className="text-emerald-500/60 text-xs font-mono flex-shrink-0 mt-0.5">{num}.</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {boldMatch ? <><span className="text-slate-300 font-medium">{boldMatch[1]}</span>{boldMatch[2]}</> : content}
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
      </div>

      {/* Detail panel */}
      {selectedItem && (
        <DetailPanel
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          rubroKey={rubro.key}
        />
      )}

    </PageShell>
  )
}
