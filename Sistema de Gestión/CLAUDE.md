@AGENTS.md

# Automatizaciones BCH — Sistema de Gestión DEMO

Este proyecto fue originalmente "ProFlow OS" (ERP interno de La Caja Chica). Fue transformado completamente en un **piloto navegable de demo** para el sitio web de Automatizaciones BCH. El código original de Supabase/OpenAI existe pero está desactivado — todas las páginas principales usan datos mock estáticos.

## Propósito

Demostrar a clientes potenciales cómo luce un sistema de gestión empresarial adaptado a 3 tipos de negocio. Se accede desde el sitio web principal de BCH. No hay autenticación, no hay backend real.

## Repositorio

- **GitHub:** `https://github.com/AutomatizacionesBCH/PORTAFOLIO`
- **Rama activa:** `main`
- **Cuenta GitHub:** AutomatizacionesBCH (`alchavez90@gmail.com`)

## Sitio web principal (repositorio separado)

- **GitHub:** `https://github.com/AutomatizacionesBCH/webautomatizacionesbch`
- Archivos: `index.html`, `app.jsx`, `styles.css`, `Dockerfile`
- Sirve como archivos estáticos en EasyPanel (Hostinger)

## Stack

- **Next.js 16.2.4** con App Router y Turbopack
- **React 19 + TypeScript 5**
- **Tailwind CSS 4** — usa `@import "tailwindcss"` y `@theme` en `globals.css`. **No hay `tailwind.config.ts`**
- **recharts** — gráficos (AreaChart, BarChart)
- **lucide-react** — íconos

## Comandos

```bash
npm run dev      # servidor en localhost:3000
npm run build    # verificar TypeScript + build de producción
npx tsc --noEmit # solo verificar tipos sin compilar
```

## Arquitectura del sistema demo

### Concepto central: DemoContext

`src/context/DemoContext.tsx` es el núcleo de toda la demo. Expone 3 "rubros" de empresa:

| Key | Empresa | Operación | Extra |
|-----|---------|-----------|-------|
| `servicios` | Altum Consultoría | Proyectos | Propuestas |
| `distribuidora` | Vértice Distribuciones | Pedidos | Inventario |
| `pyme` | Núcleo Retail | Ventas | Caja |

- `useDemoContext()` — hook para leer el rubro activo
- `setRubro(key)` — cambia el contexto, persiste en `localStorage`
- El `DemoProvider` wrappea toda la app en `src/app/layout.tsx`

### Datos mock

Cada rubro tiene su archivo en `src/data/`:

- `src/data/servicios.ts` — 85 clientes, 50 leads, 30 proyectos, 20 propuestas, 12 meses de datos de marketing/revenue, KPIs, respuestas mock del agente IA
- `src/data/distribuidora.ts` — 80 clientes, 70 leads, 105 pedidos, 60 productos en inventario, datos de marketing (ferias/LinkedIn/Google/Meta), KPIs
- `src/data/pyme.ts` — 85 clientes, 60 leads, 55 ventas, 30 movimientos de caja, datos de marketing (Instagram/TikTok/Google/Meta), KPIs

Todos los datos son chilenos (RUT no, pero nombres, ciudades y sectores reales de Chile).

### Paleta de colores BCH

`src/app/globals.css` remapea los tokens de Tailwind 4 via `@theme`:

```css
@theme {
  --color-slate-950: #0E1A33;   /* fondo base */
  --color-slate-900: #1B2A4A;   /* cards/sidebar */
  --color-slate-800: #243556;   /* inputs/hover */
  --color-blue-400: #6BB7E6;    /* acento principal (cyan BCH) */
  --color-blue-500: #4A9DC8;    /* acento secundario */
  --color-accent:   #6BB7E6;
}
```

Esto hace que TODOS los componentes que usan clases `slate-*` y `blue-*` de Tailwind automáticamente tomen los colores BCH sin modificar los componentes uno por uno.

## Estructura de archivos clave

```
src/
├── app/
│   ├── layout.tsx              # Wrappea con <DemoProvider>
│   ├── globals.css             # Paleta BCH via @theme
│   ├── dashboard/page.tsx      # ✅ Client component — AreaChart revenue, KPIs, agente mock
│   ├── clientes/page.tsx       # ✅ Client component — tabla con búsqueda/filtros
│   ├── leads/page.tsx          # ✅ Client component — pipeline + agente mock desplegable
│   ├── operaciones/page.tsx    # ✅ Client component — proyectos/pedidos/ventas según rubro
│   ├── marketing/page.tsx      # ✅ Client component — BarChart stacked por canal
│   ├── caja/page.tsx           # ✅ Client component — solo PyME (movimientos + saldo)
│   ├── propuestas/page.tsx     # ✅ Client component — solo Servicios
│   ├── inventario/page.tsx     # ✅ Client component — solo Distribuidora, alertas stock bajo
│   ├── empresas/               # ⚠️ Aún usa Supabase — NO tocar / no está en nav demo
│   ├── procesadores/           # ⚠️ Aún usa Supabase — NO tocar
│   └── recomendaciones/        # ⚠️ Aún usa Supabase — NO tocar
│
├── components/layout/
│   ├── Sidebar.tsx             # ✅ Usa useDemoContext() — nav dinámica por rubro
│   ├── Header.tsx              # ✅ Tiene DemoSwitcher (3 botones de contexto)
│   ├── AppShell.tsx            # No modificado — gestiona mobile sidebar
│   └── PageShell.tsx           # No modificado — wrapper título + contenido
│
├── context/
│   └── DemoContext.tsx         # ✅ Core del sistema demo — rubros, navItems, empresa
│
└── data/
    ├── servicios.ts            # ✅ Mock data Altum Consultoría
    ├── distribuidora.ts        # ✅ Mock data Vértice Distribuciones
    └── pyme.ts                 # ✅ Mock data Núcleo Retail
```

## Páginas pendientes / mejoras posibles

Estas páginas del sistema original **no fueron transformadas** y si el usuario navega a ellas, intentarán conectarse a Supabase (que fallará sin `.env.local`):

- `/empresas` — no está en la nav de la demo, ignorar
- `/procesadores` — ídem
- `/recomendaciones` — ídem
- `/playbooks` — ídem
- `/cotizacion` — ídem

### Ideas para continuar

1. **Página de bienvenida / landing** dentro del demo — explicar al visitante qué es lo que está viendo antes de entrar al dashboard
2. **Gráfico de pipeline** en la página de Leads (funnel visual por etapa)
3. **Detalle de cliente** — click en una fila de Clientes abre un panel lateral con historial
4. **Agente IA simulado interactivo** — cuadro de chat donde el usuario puede "preguntar" y obtiene respuestas pre-escritas según el rubro
5. **Link desde el sitio web BCH** — agregar botón "Ver demo" en el sitio principal que apunte al deploy de este sistema

## Patrones de código establecidos

### Página con datos mock (patrón actual)

```tsx
'use client'

import { useDemoContext } from '@/context/DemoContext'
import * as serviciosData from '@/data/servicios'
import * as distribuidoraData from '@/data/distribuidora'
import * as pymeData from '@/data/pyme'

export default function MiPagina() {
  const { rubro } = useDemoContext()

  const data = rubro.key === 'servicios'
    ? serviciosData
    : rubro.key === 'distribuidora'
    ? distribuidoraData
    : pymeData

  // usar data.clientes, data.kpis, etc.
}
```

### Módulo contextual (solo disponible en cierto rubro)

```tsx
if (rubro.key !== 'distribuidora') {
  return (
    <PageShell title="Inventario" description="Módulo exclusivo de Distribuidora">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
        <p className="text-slate-400 text-sm">
          Este módulo está disponible en el contexto <strong>Distribuidora</strong>.
        </p>
      </div>
    </PageShell>
  )
}
```

### Gráficos recharts

```tsx
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const TOOLTIP_STYLE = {
  contentStyle: { background: '#1B2A4A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4 },
  labelStyle: { color: '#8BA8C4', fontSize: 11 },
}

<div className="h-56">
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={revenueData}>
      <Area type="monotone" dataKey="ingresos" stroke="#4A9DC8" fill="url(#gIngresos)" />
    </AreaChart>
  </ResponsiveContainer>
</div>
```

## Colores de Tailwind disponibles (mapeados a BCH)

| Clase Tailwind | Color BCH | Uso |
|----------------|-----------|-----|
| `bg-slate-950` | `#0E1A33` | Fondo de página |
| `bg-slate-900` | `#1B2A4A` | Cards, sidebar |
| `bg-slate-800` | `#243556` | Inputs, hover states |
| `border-slate-800` | borde sutil | Separadores |
| `text-blue-400` | `#6BB7E6` | Acento, valores monetarios |
| `bg-blue-600` | `#2A5298` | Botones primarios activos |
| `text-slate-100` | blanco | Texto principal |
| `text-slate-400` | `#8BA8C4` | Texto secundario |
| `text-slate-500` | `#4E6A9A` | Texto mínimo / labels |

## Diseño — reglas que no deben romperse

- **Sin esquinas redondeadas exageradas** — usar `rounded` o `rounded-xl` máximo
- **Sin gradientes de color** en superficies
- El **cian BCH (`#6BB7E6`)** es para acentos, valores, íconos activos — nunca como fondo de tarjeta
- Valores monetarios siempre en `font-mono`
- Todos los textos de interfaz en español

## Notas de contexto importantes

- La empresa es **Automatizaciones BCH** — consultora de soluciones tecnológicas chilena
- **Prohibido en cualquier copy:** IA, inteligencia artificial, innovación, disruptivo, ecosistema, sinergia, transformación digital
- Los servicios se describen en términos del **problema que resuelven**, no de la tecnología
- Contacto real: `+56 9 3258 8516`
