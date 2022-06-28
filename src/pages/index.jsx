import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../AuthContext'

import './index.css'
import Comment from '../components/comment'

const Home = () => {
  const { currentUser, signout } = useAuth()

  const [currentContent, setCurrentContent] = useState('')
  const [comments, setComments] = useState([])

  useEffect(() => {
    // Realtime refresh updates with useEffect
    const q = query(collection(db, 'comments'), orderBy('createdAt', 'asc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
        items.push({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
        })
      })
      console.log(items)
      setComments(items)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const createComment = async (e) => {
    e.preventDefault()

    const docRef = await addDoc(collection(db, 'comments'), {
      content: currentContent,
      score: 0,
      createdAt: serverTimestamp(),
      user: {
        image: currentUser.photoURL,
        username: currentUser.displayName.replace(/ /g, '').toLowerCase(),
      },
    })
    // console.log('Document written with ID: ', docRef.id)
    setCurrentContent('')
  }

  const updateComment = async (id, content) => {
    const commentsRef = doc(db, 'comments', id)
    // Set the "content" field of the comment 'id'
    await updateDoc(commentsRef, { content: content })
  }

  const deleteComment = async (id) => {
    await deleteDoc(doc(db, 'comments', id))
  }

  return (
    <>
      {currentUser && (
        <div className="app__nav">
          <div className="nav__user">
            <img
              src={currentUser.photoURL}
              alt={currentUser.displayName}
              className="user__picture"
            />
            <h3 className="user__username">{currentUser.displayName}</h3>
          </div>
          <div className="nav__menu">
            <button className="menu__item" onClick={() => signout()}>
              Sign Out
            </button>
          </div>
        </div>
      )}

      <div className="app__comments">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            {...comment}
            updateComment={updateComment}
            deleteComment={deleteComment}
          />
        ))}
      </div>

      <div className="app__form">
        {currentUser ? (
          <form className="form__create" onSubmit={createComment}>
            <img
              className="user__avatar"
              alt={currentUser?.displayName?.replace(/ /g, '').toLowerCase()}
              src={
                currentUser.photoURL
                  ? currentUser.photoURL
                  : './images/avatars/image-avatar.png'
              }
            />
            <textarea
              value={currentContent}
              className="create__input"
              placeholder="Add a comment..."
              onChange={(e) => setCurrentContent(e.target.value)}
            />
            <button className="btn btn--blue create__button" type="submit">
              Send
            </button>
          </form>
        ) : (
          <div className="form__signin">
            <Link to="signin" className="btn btn--blue signin__button">
              Sign In
            </Link>
            <Link to="signup" className="btn btn--blue signin__button">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default Home
