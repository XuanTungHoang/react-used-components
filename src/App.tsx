import { useState } from 'react'
import './App.scss'
import '/src/styles/global.scss'
import Input from './components/Input'

function App() {

  const handleInputChange = (e: any) => {
    console.log("event --->", e)
  }
  return (
    <div className="App mt-4">
      <Input type='text' placeHolder='0' onChange={handleInputChange} />
    </div>
  )
}

export default App
