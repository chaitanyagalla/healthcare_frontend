import { BrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import React from 'react'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Layout/>
      </BrowserRouter>

    </div>
  )
}


export default App
