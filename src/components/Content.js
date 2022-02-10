import { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../firebase';

export default function Content() {
    const { user, firebase } = useContext(FirebaseContext)
    const [text, setText] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const unsubscribe = firebase.getMessages(handleSnapshot)

        return () => unsubscribe()
    }, [])

    //FUNCTIONS______________________________
    const handleSnapshot = snapshot => {
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setMessages(messages)
    }

    const handleChange = e => setText(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const message = {
            text,
            author: {
                name: user.displayName,
                uid: user.uid,
                avatar: user.photoURL
            },
            createdAt: Date.now()
        }

        firebase.addMessage(message)

        setText("")
    }

    const { login_container, input, messages_container, login_wrapper, button, title, user_container, text_style, avatar, page_container, input_field, message: message_style } = styles
    
    return !user ? (
    <div style={ login_container }>
        <div style={ login_wrapper }>
            <h1>Aucun utilisateur.</h1>
            <button style={ button } onClick={ () => firebase.login("google") }>Google Login</button>
            <button style={ button } onClick={ () => firebase.login("facebook") }>Facebook Login</button>
        </div>
    </div>
    ) : (
    <div style={ page_container }>
        <div style={ user_container }>
            <img style={ avatar } width="80px" src={ user.photoURL } alt={ user.displayName } />
            <h1 style={ title }>{ user.displayName }</h1>
            <h2 style={ text_style }>{ user.uid }</h2>
            <h2 style={ text_style }>{ user.email }</h2>
            <button style={ button } onClick={ () => firebase.logout() }>Logout</button>
        </div>
        <div style={ messages_container }>
            <div>
                {
                    messages.map(message =>
                        <div style={ message_style } key={ message.id }>
                            <img src={ message.author.avatar } alt={ message.author.name } style={ avatar } width="30px"/>
                            <p style={ { ...title, marginRight: 5, marginLeft: 10 } }>{ message.author.name }: </p>
                            <p style={ text_style }>{ message.text }</p>
                        </div>
                    )
                }
            </div>
            <form style={ input_field } onSubmit={ handleSubmit }>
                <input type="text" style={ input } value={ text } onChange={ handleChange } />
                <button style={ button } type="submit">Envoyer</button>
            </form>
        </div>
    </div>
    )
}

const styles = {
    login_container: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        height: '100vh',
        width: '100vw'
    },
    login_wrapper: {
        height: '40vh',
        maxHeight: '500px',
        minHeight: "300px",
        display: 'flex',
        flexDirection: 'column',
        padding: '40px'
    },
    button: {
        padding: '10px',
        border: "none",
        color: "#293241",
        margin: '10px',
        fontWeight: 'bold'
    },
    text_style: {
        fontWeight: 300,
        fontSize: 14,
        color: "#293241"
    },
    title: {
        fontWeight: 500,
        fontSize: 14,
        color: "#293241"
    },
    avatar: {
        borderRadius: '50%',
        margin: 5
    },
    page_container: {
        display: "grid",
        gridTemplateColumns: "250px 1fr",
        height: '100vh',
        width: '100vw'
    },
    input_field: {
        display: 'flex',
        borderTop:'1px solid #293241',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    user_container: {
        borderRight: '1px solid #293241',
        paddingLeft: '20px',
        paddingTop: "20px"
    },
    messages_container: {
        display: 'grid',
        height: '100%',
        gridTemplateRows: "1fr 100px",
    },
    input: {
        width: "80%",
        height: '20px'
    },
    message: {
        width: '100%',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box'
    }
}
