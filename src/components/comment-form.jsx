import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../firebase'
import { useAuth } from '../AuthContext'

import './comment-form.css'

const CommentForm = ({ commentId, userImage, replyingTo, setIsReplying }) => {
  const { currentUser } = useAuth()

  const [content, setContent] = useState(`@${replyingTo} `)

  const createReply = async (e) => {
    e.preventDefault()

    const docRef = await addDoc(collection(db, 'comments', commentId), {
      content: content.replace(`@${replyingTo} `, ''),
      replyingTo: replyingTo,
      score: 0,
      timestamp: serverTimestamp(),
      user: {
        image: currentUser.photoURL,
        username: currentUser.displayName.replace(/ /g, '').toLowerCase(),
      },
    })
    // console.log('Reply written with ID: ', docRef.id)
    setIsReplying(false)
  }

  return (
    <form className="comment__form" onSubmit={createReply}>
      <img className="form__avatar" src={userImage} alt={replyingTo} />
      <textarea
        rows={3}
        value={content}
        className="form__textarea"
        placeholder="Add a comment..."
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="btn btn--blue form__button" type="submit">
        Reply
      </button>
    </form>
  )
}

export default CommentForm
