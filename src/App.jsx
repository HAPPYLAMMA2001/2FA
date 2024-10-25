import { useState } from 'react'
import './App.css'

import Login_Signup from './Components/Login/Login_Signup'


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Login_Signup/>
    </div>
  )
}

export default App;
