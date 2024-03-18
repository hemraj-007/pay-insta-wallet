import { useState } from 'react'
import {BrowseRouter, Route,Routes} from 'react-router-dom'
import './App.css'

function App() {
  return (
    <BrowseRouter>
        <Routes>
          <Route path='/signin' element/>
        </Routes>
    </BrowseRouter>
  )
}

export default App
