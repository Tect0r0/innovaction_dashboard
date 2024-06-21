import { useEffect, useState } from 'react'
import { useUser } from "@clerk/clerk-react";

import Inicio from './Inicio'
import Calendario from './Calendario'
import Agendar from './Agendar'
import Contacto from './Contacto'
import Reporte from './Reporte'

type PageName = 'Inicio' | 'Calendario' | 'Agendar' | 'Contacto' | 'Reporte' ; // Nombres de las paginas

export default function Body() {
    const initialPage = localStorage.getItem("page") as PageName || "Inicio"; // Obtenemos la pagina guardada en el local storage
    const [page, setPage] = useState<PageName>(initialPage); // Estado de la pagina actual
    const { user } = useUser();

    const isAdmin = user?.publicMetadata?.isAdmin === true; // Checamos si la metadata del usuario es admin

    const pages: Record<PageName, JSX.Element> = { // Objeto para las paginas
      "Inicio": <Inicio />,
      "Calendario": <Calendario />,
      "Agendar": <Agendar />,
      "Contacto": <Contacto />,
      "Reporte": <Reporte />
    }

    useEffect(() => {
        if(page == 'Agendar'){ localStorage.setItem("page", 'Inicio');}
        else{ localStorage.setItem("page", page) } // Guardamos la pagina actual en el local storage
    }, [page])

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

{isAdmin && ( // Solo mostramos esto si el usuario es un admin
               

                    <button
                    style={{color: page === "Reporte" ? "#00A3E0" : "", textDecoration: page === "Reporte" ? "underline" : ""}}
                    onClick={() => setPage("Reporte")}
                    ><strong>REPORTES</strong></button>
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