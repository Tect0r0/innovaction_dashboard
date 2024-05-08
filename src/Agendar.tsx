import {useState} from 'react'

export default function Agendar(){

    const [espacio, setEspacio] = useState("");
    const [evento, setEvento] = useState("");
    
    return(
        <div className='container'>
            <div className='headLine'>
                 <h1>Agendar evento </h1>
            </div>
            <br />

            <div className="page">
                <br />
                <form>
                    <div className='form-container'>


                    <div className='form-field'>
                        <label htmlFor="nombre">Nombre completo:</label>
                        <input id="nombre" type="text" name="nombre" placeholder="Nombre" required autoComplete='off'/>
                    </div>

                    <div className='form-field'>
                        <label htmlFor="correo">Correo o teléfono:</label>
                        <input id="corrtel" type="text" name="corrtel" placeholder="Correo / Teléfono" required autoComplete='off'/>
                    </div>

                    <div className='form-field'>
                        <label htmlFor="grupo">Asociación:</label>
                        <input id="grupo" type="text" name="grupo" placeholder="Grupo" required autoComplete='off'/>
                    </div>
               
                    <div className='form-field'>
                        <label htmlFor="espacio">Espacio a solicitar:</label>
                        <select id="espacio" name="espacio" required onChange={(e) => setEspacio(e.target.value)}>
                            <option value="" selected disabled hidden>-Eliga un espacio-</option>
                            <option id="fractal" value="fractal">Fractal</option>
                            <option id="esferas" value="esferas">Esferas</option>
                            <option id="misenina" value="misenina">Misenina</option>
                            <option id="makerspace" value="makerspace">Maker Space</option>
                            <option id="sparring" value="sparring">Sparring</option>
                            <option id="todo" value="todo">Todo el Innovaction</option>
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
                        <input id="fecha" type="datetime-local" name="fecha" min="2024-01-01T00:00" max="2024-12-31T23:59" step="1"/>
                    </div>

                    <div className='form-field'>
                        <label>Nivel de ruido:</label>
                        <select id="ruido" name="ruido" required>
                            <option value="" selected disabled hidden>-Eliga un nivel de ruido-</option>
                            <option id="bajo" value="bajo">Bajo</option>
                            <option id="medio" value="medio">Medio</option>
                            <option id="alto" value="alto">Alto</option>
                        </select>
                    </div>

                    </div>
                    <div className='form-field'>
                        <label htmlFor="motivo">Información adicional:</label>
                        <textarea id="info" name="info" placeholder="Breve descripción (obligatorio si elegiste 'otro')" rows={4} cols={30} required={espacio === 'otro' || evento === 'otro'} autoComplete='off'></textarea><br/>
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