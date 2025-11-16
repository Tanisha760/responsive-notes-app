import React from 'react'

const Sidebar = ({ categories, active, onSelect, counts }) => {
  return (
    <aside className="w-56 md:w-64 bg-white/95 dark:bg-slate-900/95 border-r hidden md:block">
      <div className="p-4 border-b dark:border-slate-800">
        <h2 className="text-lg font-semibold">Notes</h2>
      </div>
      <ul className="p-4 space-y-1">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => onSelect(cat)}
              className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800 flex justify-between items-center smooth ${active === cat ? 'bg-gray-100 dark:bg-slate-800 font-medium' : ''}`}
            >
              <span>{cat}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{counts?.[cat] ?? 0}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
