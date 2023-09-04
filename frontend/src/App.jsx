import { useEffect, useState } from 'react'
import './App.css'
import AppHeader from './components/Header'
import Login from './pages/Auth'
import AddExpense from './components/addExpense'

function App() {
  const [isloggedIn, setIsLoggin] = useState(false)

  useEffect(() => {

  })

  return (
    <>
      <AppHeader setIsLoggin={setIsLoggin} isloggedIn={isloggedIn} />
      <div className='app'>
        {isloggedIn ? <AddExpense /> : <Login setIsLoggin={setIsLoggin} />}
      </div>
    </>

  )
}

export default App
