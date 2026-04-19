import { useState, useRef, useEffect } from 'react'

export function EditableText({ value, onSave, className = '', multiline = false, placeholder = 'Click to add…' }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value ?? '')
  const ref = useRef()

  useEffect(() => { setDraft(value ?? '') }, [value])
  useEffect(() => { if (editing && ref.current) { ref.current.focus(); if (ref.current.select) ref.current.select() } }, [editing])

  function commit() {
    setEditing(false)
    if (draft !== value) onSave(draft)
  }

  function onKeyDown(e) {
    if (!multiline && e.key === 'Enter') { e.preventDefault(); commit() }
    if (e.key === 'Escape') { setDraft(value ?? ''); setEditing(false) }
  }

  if (editing) {
    const shared = { ref, value: draft, onChange: e => setDraft(e.target.value), onBlur: commit, onKeyDown }
    return multiline
      ? <textarea {...shared} rows={3} className={`editable w-full resize-none text-sm ${className}`} />
      : <input {...shared} type="text" className={`editable w-full text-sm ${className}`} />
  }

  return (
    <span
      className={`editable group inline-flex items-center gap-1 ${className}`}
      onClick={() => setEditing(true)}
      title="Click to edit"
    >
      {value ? (
        <>{value}<span className="opacity-0 group-hover:opacity-40 text-xs ml-1">✎</span></>
      ) : (
        <span className="text-gray-400 italic text-sm">{placeholder}</span>
      )}
    </span>
  )
}
