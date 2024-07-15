#  Importar las herramientas
# Acceder a las herramientas para crear la app web
from flask import Flask, request, jsonify

# Para manipular la DB
from flask_sqlalchemy import SQLAlchemy 

# Módulo cors es para que me permita acceder desde el frontend al backend
from flask_cors import CORS

# Crear la app
app = Flask(__name__)

# permita acceder desde el frontend al backend
CORS(app)


# Configurar a la app la DB
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://usuario:contraseña@localhost:3306/nombre_de_la_base_de_datos'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:Lcgo0058@localhost:3306/tif202407'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://lisbetho20240701:Lcgo0058@lisbetho20240701.mysql.pythonanywhere-services.com:3306/lisbetho20240701$default'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Crear un objeto db, para informar a la app que se trabajará con sqlalchemy
db = SQLAlchemy(app)


# Definir la tabla 
class Persona(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    apellido=db.Column(db.String(50))
    correo=db.Column(db.String(100))
    passwd=db.Column(db.String(100))
    telefono=db.Column(db.Integer)
    genero=db.Column(db.String(20))
    pais=db.Column(db.String(100))
    nacionalidad=db.Column(db.String(100))
    imagen=db.Column(db.String(500))

    def __init__(self,nombre,apellido,correo,passwd,telefono,genero,pais,nacionalidad,imagen):   #crea el  constructor de la clase
        self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.apellido=apellido
        self.correo=correo
        self.passwd=passwd
        self.telefono=telefono
        self.genero=genero
        self.pais=pais
        self.nacionalidad=nacionalidad
        self.imagen=imagen

# 8. Crear la tabla al ejecutarse la app
with app.app_context():
    db.create_all()

# Crear ruta de acceso
# / es la ruta de inicio
@app.route("/")
def index():
    return f'App Web para registrar nombres de Usuarios'

# Crear un registro en la tabla Persona
@app.route("/registro", methods=['POST']) 
def registro():
    # {"nombre": "Felipe", ...} -> input tiene el atributo name="nombre"
    nombre = request.json["nombre"]
    apellido=request.json['apellido']
    correo=request.json['correo']
    passwd=request.json['passwd']
    telefono = request.json["telefono"]
    genero = request.json["genero"]
    pais=request.json['pais']
    nacionalidad=request.json['nacionalidad']
    imagen=request.json['imagen']

    nuevo_registro = Persona(nombre=nombre,apellido=apellido,correo=correo,passwd=passwd,telefono=telefono,genero=genero,pais=pais,nacionalidad=nacionalidad,imagen=imagen)
    db.session.add(nuevo_registro)
    db.session.commit()

    return "Solicitud de post recibida"
    

# Retornar todos los registros en un Json
@app.route("/personas",  methods=['GET'])
def personas():
    # Consultar en la tabla todos los registros
    # all_registros -> lista de objetos
    all_registros = Persona.query.all()

    # Lista de diccionarios
    data_serializada = []
    
    for objeto in all_registros:
        data_serializada.append({"id":objeto.id, "nombre":objeto.nombre, "apellido":objeto.apellido, "correo":objeto.correo,"passwd":objeto.passwd,"telefono":objeto.telefono, "genero":objeto.genero, "pais":objeto.pais, "nacionalidad":objeto.nacionalidad, "imagen":objeto.imagen})

    return jsonify(data_serializada)


# Modificar un registro
@app.route('/update/<id>', methods=['PUT'])
def update(id):
    # Buscar el registro a modificar en la tabla por su id
    persona = Persona.query.get(id)

    # {"nombre": "Felipe"} -> input tiene el atributo name="nombre"
    nombre = request.json["nombre"]
    apellido=request.json['apellido']
    correo=request.json['correo']
    passwd=request.json['passwd']
    telefono=request.json['telefono']
    genero = request.json["genero"]
    pais=request.json['pais']
    nacionalidad=request.json['nacionalidad']
    imagen=request.json['imagen']

    persona.nombre=nombre
    persona.apellido=apellido
    persona.correo=correo
    persona.passwd=passwd
    persona.telefono=telefono
    persona.genero=genero
    persona.pais=pais
    persona.nacionalidad=nacionalidad
    persona.imagen=imagen
    db.session.commit()

    data_serializada = [{"id":persona.id, "nombre":persona.nombre, "apellido":persona.apellido, "correo":persona.correo, "passwd":persona.passwd, "telefono":persona.telefono, "genero":persona.genero, "pais":persona.pais, "nacionalidad":persona.nacionalidad, "imagen":persona.imagen}]
    
    return jsonify(data_serializada)

   
@app.route('/borrar/<id>', methods=['DELETE'])
def borrar(id):
    
    # Se busca a la persona por id en la DB
    persona = Persona.query.get(id)

    # Se elimina de la DB
    db.session.delete(persona)
    db.session.commit()

    data_serializada = [{"id":persona.id, "nombre":persona.nombre, "apellido":persona.apellido,  "correo":persona.correo, "passwd":persona.passwd, "telefono":persona.telefono, "genero":persona.genero, "pais":persona.pais, "nacionalidad":persona.nacionalidad, "imagen":persona.imagen}]

    return jsonify(data_serializada)


if __name__ == "__main__":
    app.run(debug=True)
