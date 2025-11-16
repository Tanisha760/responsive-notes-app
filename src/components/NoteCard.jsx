import React from 'react'
import dayjs from 'dayjs'

const NoteCard = ({ note, onOpen, onDelete }) => {
  return (
    <div
      className="bg-white p-4 rounded shadow-sm hover:shadow-md cursor-pointer h-full flex flex-col"
    >
      <div className="flex items-start justify-between">
        <h3
          className="text-sm font-semibold truncate"
          onClick={() => onOpen(note)}
        >
          {note.title}
        </h3>
        <span className="text-xs px-2 py-0.5 rounded bg-gray-100">
          {note.category}
        </span>
      </div>

      <p
        className="text-sm text-gray-600 mt-2 flex-1"
        onClick={() => onOpen(note)}
      >
        {note.description}
      </p>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <span>{dayjs(note.createdAt).format('MMM D, YYYY HH:mm')}</span>
        <button
          onClick={() => onDelete(note)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default NoteCard
