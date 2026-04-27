import { Bell, Search, Settings, Menu } from 'lucide-react'

type HeaderProps = {
  onMenuToggle?: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="h-14 sm:h-16 flex-shrink-0 bg-[#0d1526] border-b border-white/[0.07] flex items-center justify-between px-4 sm:px-6 gap-3">

      {/* Left: hamburger (mobile) + search */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-1.5 rounded hover:bg-white/[0.06] text-white/40 hover:text-white/80 transition-colors flex-shrink-0"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 bg-white/[0.05] border border-white/[0.07] rounded px-3 py-1.5 w-64 lg:w-72 focus-within:border-white/20 transition-colors">
          <Search className="w-3.5 h-3.5 text-white/25 flex-shrink-0" />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent text-sm text-white/70 placeholder:text-white/25 outline-none w-full"
          />
          <kbd className="text-[10px] text-white/20 font-mono hidden lg:inline tracking-wider">⌘K</kbd>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button className="relative p-1.5 rounded hover:bg-white/[0.06] text-white/40 hover:text-white/80 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-white/60" />
        </button>
        <button className="p-1.5 rounded hover:bg-white/[0.06] text-white/40 hover:text-white/80 transition-colors hidden sm:block">
          <Settings className="w-4 h-4" />
        </button>
        <div className="h-4 w-px bg-white/10 mx-1.5 hidden sm:block" />
        <div className="w-7 h-7 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-xs text-white/70 font-medium cursor-pointer hover:bg-white/15 transition-colors">
          A
        </div>
      </div>

    </header>
  )
}
