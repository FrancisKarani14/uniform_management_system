from flask import Flask, render_template, request, redirect, url_for
from flask_migrate import Migrate
from models import db, User, School, UniformApplication, UniformAssignment, Notification
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)



if __name__ == '__main__':
    app.run(debug=True)