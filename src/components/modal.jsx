import React from 'react'

import './modal.css'

const Modal = ({ setIsDeleting, deleteComment }) => {
  return (
    <div className="card__modal">
      <div className="modal__panel">
        <h2 className="panel__title">Delete comment</h2>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </p>
        <div className="panel__action">
          <button
            className="btn btn--gray"
            onClick={() => setIsDeleting(false)}
          >
            No, Cancel
          </button>
          <button className="btn btn--red" onClick={() => deleteComment()}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
