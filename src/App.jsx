import React, { useEffect, useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import NoteCard from './components/NoteCard'
import NoteModal from './components/NoteModal'
import Header from './components/Header'
import { loadNotesFromStorage, saveNotesToStorage } from './utils/storage'
import defaultNotes from './data/notes.json'

const DEFAULT_CATEGORIES = ['All Notes', 'Work', 'Personal', 'Ideas', 'Others']

function App() {
  const [notes, setNotes] = useState([])
  const [activeCategory, setActiveCategory] = useState('All Notes')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  // new UI states
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('new')
  // Dark Mode State
const [dark, setDark] = useState(() => {
  return localStorage.getItem("notes-theme") === "dark";
});

// Apply theme on load + when changed
useEffect(() => {
  if (dark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("notes-theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("notes-theme", "light");
  }
}, [dark]);

// Toggle Function
function toggleDark() {
  setDark(prev => !prev);
}


  useEffect(() => {
    const persisted = loadNotesFromStorage()
    if (persisted && Array.isArray(persisted) && persisted.length) {
      setNotes(persisted)
    } else {
      setNotes(defaultNotes)
      saveNotesToStorage(defaultNotes)
    }
  }, [])

  useEffect(() => {
    saveNotesToStorage(notes)
  }, [notes])

  const categories = useMemo(() => {
    const fromNotes = Array.from(new Set(notes.map(n => n.category)))
    const merged = Array.from(new Set(['All Notes', ...DEFAULT_CATEGORIES.filter(c => c !== 'All Notes'), ...fromNotes]))
    return merged
  }, [notes])

  const counts = useMemo(()=>{
    const map = {}
    notes.forEach(n => { map[n.category] = (map[n.category] || 0) + 1 })
    return map
  }, [notes])

  function filteredNotes() {
    let list = activeCategory === 'All Notes' ? [...notes] : notes.filter(n => n.category === activeCategory)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(n => n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q))
    }
    if (sort === 'new') list.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
    if (sort === 'old') list.sort((a,b)=> new Date(a.createdAt) - new Date(b.createdAt))
    if (sort === 'alpha') list.sort((a,b)=> a.title.localeCompare(b.title))
    return list
  }

  function handleCreateClick() {
    setEditing(null)
    setModalOpen(true)
  }

  function dedupeTitle(newNote) {
    const siblings = notes.filter(n => n.category === newNote.category && n.id !== newNote.id)
    let base = newNote.title
    const existingTitles = siblings.map(s => s.title)
    if (!existingTitles.includes(base)) return newNote
    let count = 1
    let candidate = `${base} (${count})`
    while (existingTitles.includes(candidate)) {
      count++
      candidate = `${base} (${count})`
    }
    return { ...newNote, title: candidate }
  }

  function handleSave(note) {
    if (notes.some(n => n.id === note.id)) {
      setNotes(prev => prev.map(n => n.id === note.id ? { ...n, ...note } : n))
    } else {
      const withTitle = dedupeTitle(note)
      setNotes(prev => [withTitle, ...prev])
    }
    setModalOpen(false)
  }

  function handleOpen(note) {
    setEditing(note)
    setModalOpen(true)
  }

  function handleDelete(note) {
    if (!confirm('Are you sure you want to delete this note?')) return
    setNotes(prev => prev.filter(n => n.id !== note.id))
  }

  function toggleDark(){ setDark(d => !d) }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">
      <Sidebar categories={categories} active={activeCategory} onSelect={setActiveCategory} counts={counts} />

      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          <Header search={search} setSearch={setSearch} sort={sort} setSort={setSort} dark={dark} toggleDark={toggleDark} />

          <div className="flex items-center justify-between mt-4 mb-4">
            <h1 className="text-2xl font-bold">{activeCategory === 'All Notes' ? 'All Notes' : activeCategory}</h1>
            <div className="flex items-center gap-2">
              <button onClick={handleCreateClick} className="px-4 py-2 bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] text-white rounded shadow">+ New Note</button>
              <button onClick={() => { localStorage.removeItem('notes-app-v1'); window.location.reload() }} className="px-3 py-2 border rounded">Reset</button>
              <button onClick={()=>{
                const blob = new Blob([JSON.stringify(notes, null, 2)], {type:'application/json'});
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = 'notes-export.json'; a.click();
                URL.revokeObjectURL(url);
              }} className="px-3 py-2 border rounded">Export</button>
            </div>
          </div>

          {filteredNotes().length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600 dark:text-gray-300">No notes in this category. Click "New Note" to add one.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes().map(note => (
                <NoteCard note={note} key={note.id} onOpen={handleOpen} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </main>

      {modalOpen && (
        <NoteModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initial={editing}
          categories={categories.filter(c => c !== 'All Notes')}
        />
      )}
    </div>
  )
}

export default App
