import React, { useEffect, useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import NoteCard from './components/NoteCard'
import NoteModal from './components/NoteModal'
import { loadNotesFromStorage, saveNotesToStorage } from './utils/storage'
import defaultNotes from './data/notes.json'

const DEFAULT_CATEGORIES = ['All Notes', 'Work', 'Personal', 'Ideas', 'Others']

function App() {
  const [notes, setNotes] = useState([])
  const [activeCategory, setActiveCategory] = useState('All Notes')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

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

  function filteredNotes() {
    if (activeCategory === 'All Notes') return notes.slice().sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
    return notes.filter(n => n.category === activeCategory).sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
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

  return (
    <div className="min-h-screen flex">
      <Sidebar categories={categories} active={activeCategory} onSelect={setActiveCategory} />

      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{activeCategory === 'All Notes' ? 'All Notes' : activeCategory}</h1>
            <div className="flex items-center gap-2">
              <button onClick={handleCreateClick} className="px-4 py-2 bg-blue-600 text-white rounded">+ New Note</button>
              <button onClick={() => { localStorage.removeItem('notes-app-v1'); window.location.reload() }} className="px-3 py-2 border rounded">Reset</button>
            </div>
          </div>

          {filteredNotes().length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600">No notes in this category. Click "New Note" to add one.</p>
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
