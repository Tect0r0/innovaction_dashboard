from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import mysql.connector

app = Flask(__name__)
CORS(app)

config = { # Configuracion de MySQL server
        'user': 'root',
        'password': '12345', #'BalooMowgli48.',          #'12345',
        'host': 'localhost',
        'port': 3306,
        'database': 'innovaction', #'innovaction',
        'raise_on_warnings': True
}

@app.route('/agendar_evento', methods=['POST'])
def agendar_evento():

    try:
        # Connect to MySQL Server
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()

        # Obtener datos del request
        nombre_contacto = request.json['nombre_contacto']
        info_contacto = request.json['info_contacto']
        asociacion = request.json['asociacion']
        ubicacion = request.json['ubicacion']
        titulo_evento = request.json['titulo_evento']
        tipo_evento = request.json['tipo_evento']
        fecha_inicio = request.json['fecha_inicio']
        fecha_fin = request.json['fecha_fin']
        usuarios_estimados = request.json['usuarios_estimados']
        descripcion_evento = request.json['descripcion_evento']
        colaboracion_externa = request.json.get('Colaboracion_Externa', False)

        # Verificar si ya hay un evento en la misma ubicación y hora
        query = """
        SELECT COUNT(*) FROM eventos 
        WHERE ubicacion = %s 
        AND (
            (fecha_inicio <= %s AND fecha_fin >= %s) OR
            (fecha_inicio <= %s AND fecha_fin >= %s) OR
            (%s <= fecha_inicio AND %s >= fecha_inicio)
        )
        """
        cursor.execute(query, (ubicacion, fecha_inicio, fecha_inicio, fecha_fin, fecha_fin, fecha_inicio, fecha_fin))
        count = cursor.fetchone()[0]

        # Verificar si hay conflicto en la ubicación general
        query_general = """
        SELECT COUNT(*) FROM eventos 
        WHERE ubicacion = 'Todo Innovaction' 
        AND (
            (fecha_inicio <= %s AND fecha_fin >= %s) OR
            (fecha_inicio <= %s AND fecha_fin >= %s) OR
            (%s <= fecha_inicio AND %s >= fecha_inicio)
        )
        """
        cursor.execute(query_general, (fecha_inicio, fecha_inicio, fecha_fin, fecha_fin, fecha_inicio, fecha_fin))
        count_general = cursor.fetchone()[0]

        if count > 0 or count_general > 0:
            return jsonify({'status': 'failure', 'error': 'Conflicting event in the same location and time'}), 409

        # Insertar el nuevo evento si no hay conflictos
        cursor.execute("INSERT INTO eventos (nombre_contacto, info_contacto, asociacion, ubicacion, titulo_evento, tipo_evento, fecha_inicio, fecha_fin, usuarios_estimados, descripcion_evento, asistencias_confirmadas, colaboracion_externa) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", 
                        (nombre_contacto, info_contacto, asociacion, ubicacion, titulo_evento, tipo_evento, fecha_inicio, fecha_fin, usuarios_estimados, descripcion_evento, 0, colaboracion_externa))
        conn.commit()

    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))
        return jsonify({'status': 'failure', 'error': str(err)}), 500

    finally:
        conn.close()

    return jsonify({'status': 'success'}), 200


# Consutar eventos en base de datos
@app.route('/eventos', methods=['GET'])
def obtener_eventos():

    try:
        # Conectar a MySQL Server
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()

     # Query que trae los datos de la tabla eventos
        cursor.execute("SELECT id, nombre_contacto, info_contacto, asociacion, ubicacion, titulo_evento, tipo_evento, fecha_inicio, fecha_fin, usuarios_estimados, descripcion_evento, asistencias_confirmadas, impacto, tipo_innovacion, tipo_colaborador, Colaboracion_Externa FROM eventos ORDER BY fecha_inicio DESC")

        eventos = cursor.fetchall()

        # Convertir resultados a una lista
        eventos_list = [
            {
                'id': evento[0],
                'nombre_contacto': evento[1],
                'info_contacto': evento[2],
                'asociacion': evento[3],
                'ubicacion': evento[4],
                'titulo_evento': evento[5],
                'tipo_evento': evento[6],
                'fecha_inicio': evento[7].strftime('%Y-%m-%dT%H:%M:%S'),
                'fecha_fin': evento[8].strftime('%Y-%m-%dT%H:%M:%S'),
                'usuarios_estimados': evento[9],
                'descripcion_evento': evento[10],
                'asistencias_confirmadas': evento[11],
                'impacto': evento[12],
                'tipo_innovacion': evento[13],
                'tipo_colaborador': evento[14],
                'Colaboracion_Externa' : bool(evento[15])
            } for evento in eventos
        ]
 
    # Exepcion en caso de error
    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))
        return jsonify({'status': 'failure', 'error': str(err)}), 500

    finally:
        conn.close()
    #Caso de exito
    return jsonify({'status': 'success', 'eventos': eventos_list}), 200

@app.route('/actualizar_evento', methods=['PUT'])
def actualizar_evento():
    try:
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()

        evento_id = request.json['id']
        
        # Fetch the current values from the database
        cursor.execute("SELECT * FROM eventos WHERE id = %s", (evento_id,))
        current_evento = cursor.fetchone()
        
        # Use the current values as defaults
        nombre_contacto = request.json.get('nombre_contacto', current_evento[1])
        info_contacto = request.json.get('info_contacto', current_evento[2])
        asociacion = request.json.get('asociacion', current_evento[3])
        ubicacion = request.json.get('ubicacion', current_evento[4])
        titulo_evento = request.json.get('titulo_evento', current_evento[5])
        tipo_evento = request.json.get('tipo_evento', current_evento[6])
        usuarios_estimados = request.json.get('usuarios_estimados', current_evento[7])
        descripcion_evento = request.json.get('descripcion_evento', current_evento[8])
        asistencias_confirmadas = request.json.get('asistencias_confirmadas', current_evento[9])
        impacto = request.json.get('impacto', current_evento[10])
        tipo_innovacion = request.json.get('tipo_innovacion', current_evento[11])
        tipo_colaborador = request.json.get('tipo_colaborador', current_evento[12])

        query = """
        UPDATE eventos SET 
            nombre_contacto = %s,
            info_contacto = %s,
            asociacion = %s,
            ubicacion = %s,
            titulo_evento = %s,
            tipo_evento = %s,
            usuarios_estimados = %s,
            descripcion_evento = %s,
            asistencias_confirmadas = %s,
            impacto = %s,
            tipo_innovacion = %s,
            tipo_colaborador = %s
        WHERE id = %s
        """
        cursor.execute(query, (
            nombre_contacto, info_contacto, asociacion, ubicacion, titulo_evento, tipo_evento, 
            usuarios_estimados, descripcion_evento, asistencias_confirmadas, impacto, tipo_innovacion, 
            tipo_colaborador, evento_id
        ))
        conn.commit()

    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))
        return jsonify({'status': 'failure', 'error': str(err)}), 500

    finally:
        conn.close()

    return jsonify({'status': 'success'}), 200

@app.route('/eliminar_evento/<int:evento_id>', methods=['DELETE'])
def eliminar_evento(evento_id):
    try:

        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()

        cursor.execute("DELETE FROM eventos WHERE id = %s", (evento_id,))
        conn.commit()

        if cursor.rowcount == 0:
            return jsonify({'status': 'failure', 'error': 'Evento no encontrado'}), 404

    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))
        return jsonify({'status': 'failure', 'error': str(err)}), 500

    finally:
        conn.close()

    return jsonify({'status': 'success', 'message': 'Evento eliminado exitosamente'}), 200


if __name__ == '__main__':
    app.run(debug=True)