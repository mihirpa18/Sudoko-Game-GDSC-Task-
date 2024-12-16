import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRoutesFromElements, Route, createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Game from './components/Game.jsx'
import Board from './components/Board/Board.jsx'

const routes=createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App/>} >
    <Route path="/game" element={<Game/>} />
  </Route>
  ))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}>
      <App />
    </RouterProvider>
  </StrictMode>
);
