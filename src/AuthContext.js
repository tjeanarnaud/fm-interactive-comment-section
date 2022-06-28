import React, { useContext, useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'

import { auth } from './firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  const signout = () => {
    return signOut(auth)
  }

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log(`No user`)
        setCurrentUser(null)
      }
      console.log(user)
      setCurrentUser(user)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, signout }}>
      {children}
    </AuthContext.Provider>
  )
}
