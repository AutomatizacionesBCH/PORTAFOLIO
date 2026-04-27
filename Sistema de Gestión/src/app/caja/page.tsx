'use client'

import { useDemoContext } from '@/context/DemoContext'
import { PageShell } from '@/components/layout/PageShell'
import { Wallet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import * as pymeData from '@/data/pyme'

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

export default function CajaPage() {
  const { rubro } = useDemoContext()

  if (rubro.key !== 'pyme') {
    return (
      <PageShell title="Caja" description="Módulo exclusivo de PyME">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
          <Wallet className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Este módulo está disponible en el contexto <strong className="text-slate-300">PyME</strong>.</p>
          <p className="text-slate-500 text-xs mt-1">Cambia el contexto en la barra superior.</p>
        </div>
      </PageShell>
    )
  }

  const movimientos = pymeData.movimientosCaja as pymeData.MovimientoCaja[]
  const saldoActual = movimientos[0]?.saldo ?? 0
  const ingresosMes = movimientos.filter(m => m.tipo === 'ingreso').reduce((s, m) => s + m.monto, 0)
  const egresosMes = movimientos.filter(m => m.tipo === 'egreso').reduce((s, m) => s + m.monto, 0)

  return (
    <PageShell title="Caja" description={`Flujo de caja — ${rubro.empresa}`}>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-md bg-blue-500/10 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <p className="text-xs text-slate-400 uppercase tracking-wider">Saldo disponible</p>
          </div>
          <p className="text-3xl font-bold font-mono text-blue-400">{fmt(saldoActual)}</p>
          <p className="text-xs text-slate-500 mt-1">Al {movimientos[0]?.fecha}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-md bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-green-400" />
            </div>
            <p className="text-xs text-slate-400 uppercase tracking-wider">Ingresos (período)</p>
          </div>
          <p className="text-3xl font-bold font-mono text-green-400">{fmt(ingresosMes)}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-md bg-red-500/10 flex items-center justify-center">
              <TrendingDown className="w-3.5 h-3.5 text-red-400" />
            </div>
            <p className="text-xs text-slate-400 uppercase tracking-wider">Egresos (período)</p>
          </div>
          <p className="text-3xl font-bold font-mono text-red-400">{fmt(egresosMes)}</p>
        </div>
      </div>

      {/* Movements table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800">
          <p className="text-sm font-semibold text-slate-100">Movimientos recientes</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['Fecha', 'Tipo', 'Concepto', 'Categoría', 'Monto', 'Saldo'].map(h => (
                  <th key={h} className="text-left py-2.5 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {movimientos.map(m => (
                <tr key={m.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-4 text-xs font-mono text-slate-500 whitespace-nowrap">{m.fecha}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border ${m.tipo === 'ingreso' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                      {m.tipo === 'ingreso' ? '↑ Ingreso' : '↓ Egreso'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-300 max-w-xs truncate">{m.concepto}</td>
                  <td className="py-3 px-4 text-xs text-slate-500 whitespace-nowrap">{m.categoria}</td>
                  <td className={`py-3 px-4 text-sm font-mono font-semibold whitespace-nowrap ${m.tipo === 'ingreso' ? 'text-green-400' : 'text-red-400'}`}>
                    {m.tipo === 'ingreso' ? '+' : '-'}{fmt(m.monto)}
                  </td>
                  <td className="py-3 px-4 text-sm font-mono text-slate-200 whitespace-nowrap">{fmt(m.saldo)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </PageShell>
  )
}
