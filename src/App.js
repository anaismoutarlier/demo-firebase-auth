import './App.css';

import Content from './components/Content';

//HOOKS______________________________
import useAuth from './hooks/useAuth';

//FIREBASE____________________________
import firebase, { FirebaseContext } from './firebase'

function App() {
  const user = useAuth()

  return (
    <FirebaseContext.Provider value={ { user, firebase } }>
      <Content />
    </FirebaseContext.Provider>
  )
}

export default App;
