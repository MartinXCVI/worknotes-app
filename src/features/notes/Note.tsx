// React imports
import { memo } from 'react'
// Font awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
// React router imports
import { useNavigate } from 'react-router-dom'
// Redux imports
import { useGetNotesQuery } from './notesApiSlice'
// Types/Interfaces imports
import { INote } from '@/interfaces/INote'
// Utility/Helper functions
import { formatLocalDate } from '@/utils/formatLocalDate'


interface INoteProps {
  noteId: string;
}

const Note = ({ noteId }: INoteProps): JSX.Element | null => {

  const navigate = useNavigate()

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data })=> ({
      note: data?.entities[noteId] as INote | undefined
    })
  })

  if(!note) return null

  const handleEdit = (): void => navigate(`/dashboard/notes/${noteId}`)

  const created: string = formatLocalDate(note.createdAt)
  const updated: string = formatLocalDate(note.updatedAt)

  return (
    <tr className="table-row">
      <td className="table-cell note-status">
        {note.completed
          ? ( <span className="note-status-completed">Completed</span> )
          : ( <span className="note-status-open">Open</span> )
        }
      </td>
        <td className="table-cell note-created">{created}</td>
        <td className="table-cell note-updated">{updated}</td>
        <td className="table-cell note-title">{note.title}</td>
        <td className="table-cell note-username">{note.username}</td>

        <td className="table-cell">
          <button
            className="icon-button table-button"
            onClick={handleEdit}
            title='Edit Note'
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
    </tr>
  )
}

const memoizedNote = memo(Note)

export default memoizedNote