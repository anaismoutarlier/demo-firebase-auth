import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import firebaseConfig from "./config";

class Firebase {
    constructor() {
        this.app = initializeApp(firebaseConfig)
        this.auth = getAuth()
        this.googleProvider = new GoogleAuthProvider()
    }

    login = async () => {
        const { auth, googleProvider } = this

        await signInWithPopup(auth, googleProvider)
    }

    logout = async () => {
        const { auth } = this

        await signOut(auth)
    }
}

const firebase = new Firebase()
//firebase.login()
//firebase.logout()
export default firebase