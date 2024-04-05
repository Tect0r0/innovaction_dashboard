import {useState} from 'react'

export default function Agendar(){

    const [espacio, setEspacio] = useState("");
    const [evento, setEvento] = useState("");
    
    return(
        <div className='container'>
            <div className='headLine'>
                 <h1>Agenda tu evento </h1>
            </div>
            <br />

            <div className="page">
                <br />
                <form>
                    <div className='form-container'>


                    <div className='form-field'>
                        <label htmlFor="nombre">Nombre completo:</label>
                        <input id="nombre" type="text" name="nombre" placeholder="Nombre" required/>
                    </div>

                    <div className='form-field'>
                        <label htmlFor="correo">Correo institucional:</label>
                        <input id="correo" type="email" name="correo" placeholder="Correo" required/>
                    </div>

                    <div className='form-field'>
                        <label htmlFor="grupo">Grupo estudiantil:</label>
                        <input id="grupo" type="text" name="grupo" placeholder="Grupo" required/>
                    </div>
               
                    <div className='form-field'>
                        <label htmlFor="espacio">Espacio a solicitar:</label>
                        <select id="espacio" name="espacio" required onChange={(e) => setEspacio(e.target.value)}>
                            <option value="" selected disabled hidden>-Eliga un espacio-</option>
                            <option id="fractal" value="fractal">Fractal</option>
                            <option id="esferas" value="esferas">Esferas</option>
                            <option id="makerspace" value="makerspace">Maker Space</option>
                            <option id="sparring" value="sparring">Sparring</option>
                            <option id="otro" value="otro">Otro</option>
                        </select>
                    </div>

                  <div className='form-field'>
                    <label htmlFor="tipo">Tipo de evento:</label>
                        <select id="tipo" name="tipo" required onChange={(e) => setEvento(e.target.value)}>
                            <option value="" selected disabled hidden>-Eliga un tipo de evento-</option>
                            <option id="conferencai" value="conferencia">Conferencia</option>
                            <option id="taller" value="taller">Taller</option>
                            <option id="convivio" value="convivio">Convivio Social</option>
                            <option id="clase" value="clase">Clase</option>
                            <option id="otro" value="otro">Otro</option>
                        </select>
                  </div>

                  <div className='form-field'>
                  <label htmlFor="fecha">Fecha y hora:</label>
                    <input id="fecha" type="datetime-local" name="fecha" min="2024-01-01T00:00" max="2024-06-30T23:59" step="1"/>
                  </div>

                  <br />

                    </div>
                    <div className='form-field'>
                        <label htmlFor="motivo">Información adicional:</label>
                        <textarea id="info" name="info" placeholder="Breve descripción (obligatorio si elegiste 'otro')" rows={4} cols={30} required={espacio === 'otro' || evento === 'otro'}></textarea><br/>
                    </div>
                    <br />
                    
                    <button className="submit" type="submit">Enviar</button>
                    <br />
                    <br />
                </form>
            </div>
        </div>
    )
}