from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import mysql.connector

app = Flask(__name__)
CORS(app)

@app.route('/agendar_evento', methods=['POST'])
def agendar_evento():
    # Replace with your actual MySQL Server config
    config = {
        'user': 'root',
        'password': '12345',
        'host': 'localhost',
        'port': 3306,
        'database': 'innovaction',
        'raise_on_warnings': True
    }

    try:
        # Connect to MySQL Server
        conn = mysql.connector.connect(**config)

        cursor = conn.cursor()

        cursor.execute("INSERT INTO eventos (nombre_contacto, info_contacto, asociacion, ubicacion, titulo_evento, tipo_evento, fecha_inicio, fecha_fin, nivel_ruido, descripcion_evento) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", 
                    (request.json['nombre_contacto'], 
                     request.json['info_contacto'], 
                     request.json['asociacion'], 
                     request.json['ubicacion'], 
                     request.json['titulo_evento'], 
                     request.json['tipo_evento'],
                     request.json['fecha_inicio'], 
                     request.json['fecha_fin'], 
                     request.json['nivel_ruido'], 
                     request.json['descripcion_evento']))
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

        # Query que trae los los datos de la tabla eventos
        cursor.execute("SELECT fecha_inicio, titulo_evento FROM eventos")
        eventos = cursor.fetchall()

        # Convertir resultados a una lista
        eventos_list = [{'fecha_inicio': str(evento[0]), 'titulo_evento': evento[1]} for evento in eventos]
    # Exepcion en caso de error
    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))
        return jsonify({'status': 'failure', 'error': str(err)}), 500

    finally:
        conn.close()
    #Caso de exito
    return jsonify({'status': 'success', 'eventos': eventos_list}), 200

if __name__ == '__main__':
    app.run(debug=True)