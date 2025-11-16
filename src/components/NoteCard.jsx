import React from 'react'
import dayjs from 'dayjs'

const NoteCard = ({ note, onOpen, onDelete }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl card-shadow hover:shadow-lg transform hover:-translate-y-1 smooth h-full flex flex-col">
      <div className="flex items-start justify-between">
        <h3 className="text-md font-semibold truncate cursor-pointer" onClick={() => onOpen(note)}>{note.title}</h3>
        <span className="text-xs px-2 py-0.5 rounded bg-gray-100/70 dark:bg-white/10">{note.category}</span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 flex-1 cursor-pointer" onClick={() => onOpen(note)}>{note.description}</p>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{dayjs(note.createdAt).format('MMM D, YYYY')}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => onDelete(note)} className="text-red-500 hover:underline">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default NoteCard
