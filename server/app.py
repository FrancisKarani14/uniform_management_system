from flask import Flask, render_template, request, redirect, url_for
from flask_migrate import Migrate
from models import db, User, School, UniformApplication, UniformAssignment, Notification
from dotenv import load_dotenv
from flask_restful import Api, Resource
import os

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)

api = Api(app)

class Home(Resource):
    def get(self):
        return {'message': 'Welcome to the Uniform Management System'}

api.add_resource(Home, '/')

# creates a school account
class addSchool(Resource):
    def post(self):
        data = request.get_json()
        school = School(
            name=data['name'],
            # email=data['email'],
            # password=data['password'],
            location=data['location'],
            phone_number=data['phone_number'],
            uniform_types=data['uniform_types']
        )
        db.session.add(school)
        db.session.commit()
        return school.to_dict(), 201
    
api.add_resource(addSchool, '/schools')

# get alll schools


if __name__ == '__main__':
    app.run(debug=True)