'use client'

import { useState, useMemo } from 'react'
import { useDemoContext } from '@/context/DemoContext'
import { PageShell } from '@/components/layout/PageShell'
import { Search, Package, AlertTriangle } from 'lucide-react'
import * as distribuidoraData from '@/data/distribuidora'

function fmt(n: number) {
  return `$${n.toLocaleString('es-CL')}`
}

export default function InventarioPage() {
  const { rubro } = useDemoContext()
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('todas')
  const [showLow, setShowLow] = useState(false)

  if (rubro.key !== 'distribuidora') {
    return (
      <PageShell title="Inventario" description="Módulo exclusivo de Distribuidora">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
          <Package className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Este módulo está disponible en el contexto <strong className="text-slate-300">Distribuidora</strong>.</p>
          <p className="text-slate-500 text-xs mt-1">Cambia el contexto en la barra superior.</p>
        </div>
      </PageShell>
    )
  }

  const productos = distribuidoraData.productos as distribuidoraData.Producto[]
  const categorias = [...new Set(productos.map(p => p.categoria))].sort()

  const filtered = useMemo(() => {
    return productos.filter(p => {
      const q = search.toLowerCase()
      const matchSearch = !q || p.nombre.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.proveedor.toLowerCase().includes(q)
      const matchCat = catFilter === 'todas' || p.categoria === catFilter
      const matchLow = !showLow || p.stock <= p.stock_minimo
      return matchSearch && matchCat && matchLow
    })
  }, [productos, search, catFilter, showLow])

  const stockBajo = productos.filter(p => p.stock <= p.stock_minimo).length
  const stockCero = productos.filter(p => p.stock === 0).length
  const valorTotal = productos.reduce((s, p) => s + p.precio_unitario * p.stock, 0)

  return (
    <PageShell title="Inventario" description={`Control de stock — ${rubro.empresa}`}>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Productos', value: String(productos.length), color: 'text-blue-400' },
          { label: 'Stock bajo', value: String(stockBajo), color: 'text-amber-400' },
          { label: 'Sin stock', value: String(stockCero), color: 'text-red-400' },
          { label: 'Valor inventario', value: `$${(valorTotal / 1_000_000).toFixed(1)}M`, color: 'text-green-400' },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">{s.label}</p>
            <p className={`text-xl font-bold font-mono ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {stockBajo > 0 && (
        <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-5 py-3">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <p className="text-sm text-amber-300">
            <strong>{stockBajo} productos</strong> están por debajo del stock mínimo — {stockCero} en cero.
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 flex-1 min-w-48">
          <Search className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Buscar producto, SKU o proveedor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none w-full"
          />
        </div>
        <div className="flex flex-wrap gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
          <button
            onClick={() => setCatFilter('todas')}
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${catFilter === 'todas' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Todas
          </button>
          {categorias.map(c => (
            <button
              key={c}
              onClick={() => setCatFilter(c)}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${catFilter === c ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {c}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowLow(v => !v)}
          className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${showLow ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'border-slate-800 text-slate-400 hover:text-slate-200 bg-slate-900'}`}
        >
          Solo stock bajo
        </button>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800">
          <p className="text-xs text-slate-500">{filtered.length} productos</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['Producto', 'SKU', 'Categoría', 'Proveedor', 'Precio unit.', 'Stock', 'Mín.', 'Estado'].map(h => (
                  <th key={h} className="text-left py-2.5 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const isLow = p.stock <= p.stock_minimo
                const isZero = p.stock === 0
                return (
                  <tr key={p.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                    <td className="py-3 px-4">
                      <p className="text-sm text-slate-200 max-w-[200px] truncate">{p.nombre}</p>
                    </td>
                    <td className="py-3 px-4 text-xs font-mono text-slate-500 whitespace-nowrap">{p.sku}</td>
                    <td className="py-3 px-4 text-xs text-slate-400 whitespace-nowrap">{p.categoria}</td>
                    <td className="py-3 px-4 text-xs text-slate-400 whitespace-nowrap max-w-[120px] truncate">{p.proveedor}</td>
                    <td className="py-3 px-4 text-sm font-mono text-slate-300 whitespace-nowrap">{fmt(p.precio_unitario)}</td>
                    <td className={`py-3 px-4 text-sm font-mono font-bold whitespace-nowrap ${isZero ? 'text-red-400' : isLow ? 'text-amber-400' : 'text-slate-300'}`}>
                      {p.stock.toLocaleString('es-CL')} {p.unidad}
                    </td>
                    <td className="py-3 px-4 text-xs font-mono text-slate-600 whitespace-nowrap">{p.stock_minimo}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {isZero
                        ? <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium border bg-red-500/10 text-red-400 border-red-500/20">Sin stock</span>
                        : isLow
                        ? <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium border bg-amber-500/10 text-amber-400 border-amber-500/20">Stock bajo</span>
                        : <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium border bg-green-500/10 text-green-400 border-green-500/20">OK</span>
                      }
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    </PageShell>
  )
}
