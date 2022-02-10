import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { getFirestore, doc, setDoc, addDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore"
import firebaseConfig from "./config";

class Firebase {
    constructor() {
        this.app = initializeApp(firebaseConfig)
        this.auth = getAuth()
        this.db = getFirestore(this.app)
        this.googleProvider = new GoogleAuthProvider()
        this.facebookProvider = new FacebookAuthProvider()
    }

    login = async (provider) => {
        const { auth } = this
        await signInWithPopup(auth, this[`${provider.toLowerCase()}Provider`])
    }

    logout = async () => {
        const { auth } = this

        await signOut(auth)
    }

    updateUser = async (uid, update) => {
        const { db } = this
        const userRef = doc(db, "users", uid)
        setDoc(userRef, update, { merge: true })
    }

    addMessage = async message => {
        const { db } = this

        await addDoc(collection(db, "messages"), { ...message })
    }

    getMessages = handleSnapshot => {
        const { db } = this

        const q = query(collection(db, "messages"), orderBy("createdAt"))
        return onSnapshot(q, handleSnapshot)
    }

}

const firebase = new Firebase()
//firebase.login()
//firebase.logout()
export default firebase