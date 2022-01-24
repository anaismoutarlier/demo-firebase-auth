import './App.css';
import { useState, useEffect } from 'react'

//FIREBASE____________________________
import firebase from './firebase'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = () => firebase.auth.onAuthStateChanged(user => {
      console.log(user)
      if (user) setUser(user)
      else setUser(null)
    })

    return () => unsubscribe()
  }, [])

  return !user ? (
    <div>
      <h1>Aucun utilisateur.</h1>
      <button onClick={ () => firebase.login() }>Login</button>
    </div>
  ) : (
    <div>
      <h1>{ user.displayName }</h1>
      <button onClick={ () => firebase.logout() }>Logout</button>
    </div>
  )
}

export default App;
