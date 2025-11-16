import React from 'react'

const Header = ({ search, setSearch, sort, setSort, dark, toggleDark }) => {
  return (
    <header className="w-full py-4 px-4 md:px-6 rounded-b-lg">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)]">
            Nimbus Notes
          </div>
          <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-300">organize • capture • create</div>
        </div>

        <div className="flex items-center gap-3 w-full max-w-2xl">
          <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search notes by title or description..."
            className="flex-1 px-3 py-2 rounded-md bg-white/90 dark:bg-slate-700 text-sm placeholder:text-slate-500 dark:placeholder:text-slate-300 smooth"
          />
          <select value={sort} onChange={(e)=>setSort(e.target.value)} className="rounded-md px-2 py-2 bg-white/90 dark:bg-slate-700 text-sm smooth">
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
            <option value="alpha">Title A–Z</option>
          </select>

          <button onClick={toggleDark} aria-label="toggle theme" className="px-3 py-2 rounded-md bg-white/90 dark:bg-slate-700 smooth">
            {dark ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
