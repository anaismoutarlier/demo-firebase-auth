import { useState, useEffect } from 'react';

//FIREBASE____________________________
import firebase from '../firebase'

function useAuth() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
            // console.log(user)
            if (user) {
                firebase.updateUser(user.uid, { email: user.email, name: user.displayName, photo: user.photoURL })
                setUser(user)
            } else {
                setUser(null)
            }
        })

        return () => unsubscribe()
    }, [])


    return user;
}

export default useAuth