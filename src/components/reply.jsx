import React, { useState } from 'react'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import Timeago from 'react-timeago'
import { db } from '../firebase'
import { useAuth } from '../AuthContext'

import './comment.css'
import Vote from './vote'
import Modal from './modal'
import Action from './action'
import CommentForm from './comment-form'

const Reply = ({
  commentId,
  id,
  user,
  score,
  content,
  createdAt,
  replyingTo,
}) => {
  const { currentUser } = useAuth()
  const [currentUserName] = useState(
    currentUser?.displayName.replace(/ /g, '').toLowerCase()
  )

  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [currentContent, setCurrentContent] = useState(content)

  const updateReply = async (e) => {
    e.preventDefault()

    const replyRef = doc(db, 'comments', commentId, 'replies', id)
    // Set the "content" field of the comment 'id'
    await updateDoc(replyRef, {
      content: currentContent.replace(`@${replyingTo} `, ''),
    })
  }

  const deleteReply = async () => {
    await deleteDoc(doc(db, 'comments', commentId, 'replies', id))
  }

  return (
    <div className="reply">
      <div className="reply__card">
        {/* Card user data */}
        <div className="card__user">
          <img className="user__picture" src={user.image} alt={user.username} />
          <h3 className="user__username">{user.username}</h3>
          {currentUserName === user.username && (
            <h3 className="user__badge">You</h3>
          )}
          <Timeago className="user__createdAt" date={createdAt} />
        </div>
        {/* Card Content */}
        {isEditing ? (
          <form className="card__form" onSubmit={updateReply}>
            <textarea
              rows={3}
              type="text"
              value={currentContent}
              className="form__input"
              onChange={(e) => setCurrentContent(e.target.value)}
            />
            <button
              className="btn btn--blue form__button"
              type="submit"
              onClick={() => setIsEditing(!isEditing)}
            >
              Update
            </button>
          </form>
        ) : (
          <p className="card__content">
            <span>@{replyingTo}</span> {currentContent}
          </p>
        )}

        {/* Card vote */}
        <Vote score={score} />

        {/* Card action */}
        <Action
          username={user.username}
          setIsEditing={setIsEditing}
          setIsDeleting={setIsDeleting}
          isReplying={isReplying}
          setIsReplying={setIsReplying}
        />
      </div>

      {/* Create comment form */}
      {isReplying && (
        <CommentForm
          commentId={commentId}
          userImage={user.image}
          replyingTo={user.username}
          setIsReplying={setIsReplying}
        />
      )}

      {/* Delete comment modal */}
      {isDeleting && (
        <Modal setIsDeleting={setIsDeleting} deleteComment={deleteReply} />
      )}
    </div>
  )
}

export default Reply
