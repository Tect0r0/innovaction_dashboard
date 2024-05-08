import { useState } from 'react'
import { useUser } from "@clerk/clerk-react";

import Inicio from './Inicio'
import Calendario from './Calendario'
import Agendar from './Agendar'
import Contacto from './Contacto'

type PageName = 'Inicio' | 'Calendario' | 'Agendar' | 'Contacto'; // Nombres de las paginas

export default function Body() {
    const [page, setPage] = useState<PageName | "">("")
    const { user } = useUser();

    const isAdmin = user?.publicMetadata?.isAdmin === true; // Checamos si la metadata del usuario es admin

    const pages: Record<PageName, JSX.Element> = { // Objeto para las paginas
      "Inicio": <Inicio />,
      "Calendario": <Calendario />,
      "Agendar": <Agendar />,
      "Contacto": <Contacto />,
    }

    return(
        <>
            <div className="navbar"> {/* Barra de navegacion */}
                <button // Boton de inincio
                style={{color: page === "Inicio" ? "#00A3E0" : "", textDecoration: page === "Inicio" ? "underline" : ""}}
                onClick={() => setPage("Inicio")}
                ><strong>INICIO</strong></button>

                <button // Boton de calendario
                style={{color: page === "Calendario" ? "#00A3E0" : "", textDecoration: page === "Calendario" ? "underline" : ""}}
                onClick={() => setPage("Calendario")}
                ><strong>CALENDARIO</strong></button>

                {isAdmin && ( // Solo mostramos esto si el usuario es un admin
                    <button 
                    style={{color: page === "Agendar" ? "#00A3E0" : "", textDecoration: page === "Agendar" ? "underline" : ""}}
                    onClick={() => setPage("Agendar")}
                    ><strong>AGENDAR EVENTO</strong></button>
                )}

                <button // Boton de contacto
                style={{color: page === "Contacto" ? "#00A3E0" : "", textDecoration: page === "Contacto" ? "underline" : ""}}
                onClick={() => setPage("Contacto")}
                ><strong>CONTACTO</strong></button>
            </div>
            <body> {/* Cuerpo de la pagina donde mostramos la pagina seleccionada arriba */}
                {page ? pages[page as PageName] : <Inicio />}
            </body>
        </>
    )
}