// "use client"

// import { createContext, useContext, useEffect, useState } from "react"
// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   type User,
// } from "firebase/auth"
// import type React from "react"

// import { auth } from "~/libs/firebase.lib"

// interface AuthContextType {
//   user: User | null
//   loading: boolean
//   signIn: (email: string, password: string) => Promise<void>
//   signUp: (email: string, password: string) => Promise<void>
//   signInWithGoogle: () => Promise<void>
//   logout: () => Promise<void>
// }

// const AuthContext = createContext<AuthContextType>({} as AuthContextType)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user)
//       setLoading(false)
//     })

//     return () => unsubscribe()
//   }, [])

//   const signIn = async (email: string, password: string) => {
//     await signInWithEmailAndPassword(auth, email, password)
//   }

//   const signUp = async (email: string, password: string) => {
//     await createUserWithEmailAndPassword(auth, email, password)
//   }

//   const signInWithGoogle = async () => {
//     const provider = new GoogleAuthProvider()
//     await signInWithPopup(auth, provider)
//   }

//   const logout = async () => {
//     await signOut(auth)
//   }

//   return (
//     <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, logout }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)
