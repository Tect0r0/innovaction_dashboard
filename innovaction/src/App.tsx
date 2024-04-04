import { useState } from 'react'

import Inicio from './Inicio'
import Calendario from './Calendario'
import Contacto from './Contacto'
import Logo from './assets/innovaction1-t.png'

type PageName = 'Inicio' | 'Calendario' | 'Contacto'; // Definir los nombres de las páginas

export default function App() {
  const [page, setPage] = useState<PageName | "">("")

  const pages: Record<PageName, JSX.Element> = { // Crear un objeto con las páginas
    "Inicio": <Inicio />,
    "Calendario": <Calendario />,
    "Contacto": <Contacto />,
  }

  return (
    <>
      <header>
        <div className="title-card">
          <img className="logo" src={Logo} alt="Logo" />
          <h1 className="title">Innovaction Gym - Event Dashboard</h1>
        </div>
        <div className="navbar">
          <button 
          style={{color: page === "Inicio" ? "#00A3E0" : "", textDecoration: page === "Inicio" ? "underline" : ""}}
          onClick={() => setPage("Inicio")}
          > Inicio </button>
          <button 
          style={{color: page === "Calendario" ? "#00A3E0" : "", textDecoration: page === "Calendario" ? "underline" : ""}}
          onClick={() => setPage("Calendario")}
          > Calendario </button>
          <button 
          style={{color: page === "Contacto" ? "#00A3E0" : "", textDecoration: page === "Contacto" ? "underline" : ""}}
          onClick={() => setPage("Contacto")}
          > Contacto </button>
        </div>

      </header>

      <body>
        {page ? pages[page as PageName] : <Inicio />} {/* Si hay valor, que use el valor como la página */}
      </body>
    </>
  )
}