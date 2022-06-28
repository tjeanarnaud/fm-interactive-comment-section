import React, { useState } from 'react'
import { useAuth } from '../AuthContext'

import { ReactComponent as EditIcon } from '../assets/icon-edit.svg'
import { ReactComponent as ReplyIcon } from '../assets/icon-reply.svg'
import { ReactComponent as DeleteIcon } from '../assets/icon-delete.svg'

import './action.css'

const Action = ({
  username,
  setIsEditing,
  setIsDeleting,
  isReplying,
  setIsReplying,
}) => {
  const { currentUser } = useAuth()
  const [currentUserName] = useState(
    currentUser?.displayName?.replace(/ /g, '').toLowerCase()
  )

  return (
    <div className="card__action">
      {currentUser && currentUserName === username ? (
        <>
          <button
            className="btn__link btn__link--red"
            onClick={() => setIsDeleting(true)}
          >
            <DeleteIcon />
            <span>Delete</span>
          </button>
          <button
            className="btn__link btn__link--blue"
            onClick={() => setIsEditing(true)}
          >
            <EditIcon />
            <span>Edit</span>
          </button>
        </>
      ) : (
        <button
          className="btn__link btn__link--blue"
          onClick={() => setIsReplying(!isReplying)}
        >
          <ReplyIcon />
          <span>Reply</span>
        </button>
      )}
    </div>
  )
}

export default Action
