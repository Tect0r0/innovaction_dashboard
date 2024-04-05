import { useState } from 'react'

import Inicio from './Inicio'
import Calendario from './Calendario'
import Agendar from './Agendar'
import Contacto from './Contacto'

type PageName = 'Inicio' | 'Calendario' | 'Agendar' | 'Contacto'; // Definir los nombres de las páginas

export default function Body() {

    const [page, setPage] = useState<PageName | "">("")

    const pages: Record<PageName, JSX.Element> = { // Crear un objeto con las páginas
      "Inicio": <Inicio />,
      "Calendario": <Calendario />,
      "Agendar": <Agendar />,
      "Contacto": <Contacto />,
    }
    return(
        <>
            <div className="navbar">
                <button 
                style={{color: page === "Inicio" ? "#00A3E0" : "", textDecoration: page === "Inicio" ? "underline" : ""}}
                onClick={() => setPage("Inicio")}
                ><strong>INICIO</strong></button>
                <button 
                style={{color: page === "Calendario" ? "#00A3E0" : "", textDecoration: page === "Calendario" ? "underline" : ""}}
                onClick={() => setPage("Calendario")}
                ><strong>CALENDARIO</strong></button>
                                <button 
                style={{color: page === "Agendar" ? "#00A3E0" : "", textDecoration: page === "Agendar" ? "underline" : ""}}
                onClick={() => setPage("Agendar")}
                ><strong>AGENDAR CITA</strong></button>
                <button 
                style={{color: page === "Contacto" ? "#00A3E0" : "", textDecoration: page === "Contacto" ? "underline" : ""}}
                onClick={() => setPage("Contacto")}
                ><strong>CONTACTO</strong></button>
            </div>
            <body>
                {page ? pages[page as PageName] : <Inicio />} {/* Si hay valor, que use el valor como la página */}
            </body>
        </>
    )
}