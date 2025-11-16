import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'

// Modal used for creating and editing notes
const NoteModal = ({ open, onClose, onSave, initial, categories }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(categories[0] || 'General')

  useEffect(() => {
    if (initial) {
      setTitle(initial.title)
      setDescription(initial.description)
      setCategory(initial.category)
    } else {
      setTitle('')
      setDescription('')
      setCategory(categories[0] || 'General')
    }
  }, [initial, open])

  if (!open) return null

  function handleSubmit(e) {
    e.preventDefault()
    const note = {
      id: initial?.id ?? Date.now(),
      title: title.trim(),
      description: description.trim(),
      category,
      createdAt: initial?.createdAt ?? dayjs().toISOString(),
    }
    onSave(note)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg w-full max-w-lg p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {initial ? 'Edit Note' : 'New Note'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
        </div>

        <div className="space-y-3">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded border px-3 py-2"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded border px-3 py-2"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="mt-1 block w-full rounded border px-3 py-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              {initial ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NoteModal
