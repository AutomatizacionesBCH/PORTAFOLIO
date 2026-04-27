'use client'

import { useDemoContext } from '@/context/DemoContext'
import { PageShell } from '@/components/layout/PageShell'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts'
import * as serviciosData from '@/data/servicios'
import * as distribuidoraData from '@/data/distribuidora'
import * as pymeData from '@/data/pyme'

const TOOLTIP_STYLE = {
  contentStyle: { background: '#1B2A4A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4 },
  labelStyle: { color: '#8BA8C4', fontSize: 11 },
  itemStyle: { color: '#C7CEDA', fontSize: 12 },
}

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

export default function MarketingPage() {
  const { rubro } = useDemoContext()

  const { marketingData, channelKeys, colors } = (() => {
    if (rubro.key === 'servicios') {
      return {
        marketingData: serviciosData.marketingData,
        channelKeys: ['linkedin', 'google', 'meta', 'eventos'],
        colors: ['#4A9DC8', '#6BB7E6', '#8BA8C4', '#4E6A9A'],
      }
    }
    if (rubro.key === 'distribuidora') {
      return {
        marketingData: distribuidoraData.marketingData,
        channelKeys: ['linkedin', 'google', 'meta', 'ferias'],
        colors: ['#4A9DC8', '#6BB7E6', '#8BA8C4', '#2A5298'],
      }
    }
    return {
      marketingData: pymeData.marketingData,
      channelKeys: ['instagram', 'google', 'tiktok', 'meta'],
      colors: ['#EC4899', '#6BB7E6', '#8B5CF6', '#4A9DC8'],
    }
  })()

  const md = marketingData as unknown as Record<string, number>[]
  const totalGasto = md.reduce((s, m) =>
    s + channelKeys.reduce((cs, k) => cs + (m[k] ?? 0), 0), 0
  )
  const ultimoMes = md[md.length - 1]
  const gastoUltimoMes = channelKeys.reduce((s, k) => s + (ultimoMes[k] ?? 0), 0)

  const channelTotals = channelKeys.map(k => ({
    canal: k.charAt(0).toUpperCase() + k.slice(1),
    total: md.reduce((s, m) => s + (m[k] ?? 0), 0),
  })).sort((a, b) => b.total - a.total)

  const CHANNEL_LABELS: Record<string, string> = {
    linkedin: 'LinkedIn', google: 'Google Ads', meta: 'Meta Ads',
    eventos: 'Eventos', ferias: 'Ferias', instagram: 'Instagram',
    tiktok: 'TikTok',
  }

  return (
    <PageShell title="Marketing" description={`Inversión y canales — ${rubro.empresa}`}>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Gasto total (12M)', value: fmt(totalGasto) },
          { label: 'Gasto último mes', value: fmt(gastoUltimoMes) },
          { label: 'Canales activos', value: String(channelKeys.length) },
          { label: 'Canal líder', value: channelTotals[0]?.canal ?? '—' },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">{s.label}</p>
            <p className="text-xl font-bold font-mono text-slate-100">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800">
          <p className="text-sm font-semibold text-slate-100">Inversión por canal — últimos 12 meses</p>
        </div>
        <div className="p-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={md} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="mes" tick={{ fill: '#8BA8C4', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis
                tickFormatter={v => `$${(v / 1000).toFixed(0)}K`}
                tick={{ fill: '#8BA8C4', fontSize: 10 }} axisLine={false} tickLine={false} width={52}
              />
              <Tooltip
                formatter={(v) => [`$${((v as number) / 1000).toFixed(0)}K`]}
                {...TOOLTIP_STYLE}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#8BA8C4' }} />
              {channelKeys.map((k, i) => (
                <Bar key={k} dataKey={k} name={CHANNEL_LABELS[k] ?? k} fill={colors[i]} radius={[2, 2, 0, 0]} stackId="a" />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Channel breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <p className="text-sm font-semibold text-slate-100 mb-4">Distribución por canal (12 meses)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {channelTotals.map((c, i) => {
            const pct = totalGasto > 0 ? (c.total / totalGasto) * 100 : 0
            return (
              <div key={c.canal}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-slate-300">{CHANNEL_LABELS[c.canal.toLowerCase()] ?? c.canal}</span>
                  <span className="text-xs font-mono text-slate-400">{pct.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-1">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: colors[i] }} />
                </div>
                <p className="text-xs font-mono text-slate-500">{fmt(c.total)}</p>
              </div>
            )
          })}
        </div>
      </div>

    </PageShell>
  )
}
