import React from 'react'

const Sidebar = ({ categories, active, onSelect }) => {
  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Notes</h2>
      </div>
      <ul className="p-4 space-y-1">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => onSelect(cat)}
              className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex justify-between items-center ${
                active === cat ? 'bg-gray-100 font-medium' : ''
              }`}
            >
              <span>{cat}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
