import React, { useEffect, useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import Timeago from 'react-timeago'
import { db } from '../firebase'
import { useAuth } from '../AuthContext'

import './comment.css'
import Vote from './vote'
import Reply from './reply'
import Modal from './modal'
import Action from './action'
import CommentForm from './comment-form'

const Comment = ({ id, content, createdAt, score, user }) => {
  const { currentUser } = useAuth()
  const [currentUserName] = useState(
    currentUser?.displayName?.replace(/ /g, '').toLowerCase()
  )

  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [replies, setReplies] = useState([])
  const [currentContent, setCurrentContent] = useState(content)

  useEffect(() => {
    // Realtime refresh updates with useEffect
    const q = query(
      collection(db, 'comments', id, 'replies'),
      orderBy('createdAt', 'asc')
    )
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
        items.push({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt?.toDate(),
          content: doc.data().content,
        })
      })
      setReplies(items)
    })

    return () => {
      unsubscribe()
    }
  }, [id])

  const updateComment = async (e) => {
    e.preventDefault()

    const commentsRef = doc(db, 'comments', id)
    // Set the "content" field of the comment 'id'
    await updateDoc(commentsRef, { content: currentContent })
  }

  const deleteComment = async () => {
    await deleteDoc(doc(db, 'comments', id))
  }

  return (
    <div className="comment">
      <div className="comment__card">
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
          <form className="card__form" onSubmit={updateComment}>
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
          <p className="card__content">{currentContent}</p>
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
          commentId={id}
          userImage={user.image}
          replyingTo={user.username}
          setIsReplying={setIsReplying}
        />
      )}

      {/* Comment Replies list */}
      {replies.length > 0 && (
        <div className="card__reply">
          {replies.map((reply) => (
            <Reply key={reply.id} commentId={id} {...reply} />
          ))}
        </div>
      )}

      {/* Delete comment modal */}
      {isDeleting && (
        <Modal setIsDeleting={setIsDeleting} deleteComment={deleteComment} />
      )}
    </div>
  )
}

export default Comment
