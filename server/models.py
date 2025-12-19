from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False)  # super_admin, school_admin, parent, tailor
    is_approved = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    school_admin = db.relationship('SchoolAdmin', backref='user', uselist=False)
    parent = db.relationship('Parent', backref='user', uselist=False)
    tailor = db.relationship('Tailor', backref='user', uselist=False)
    notifications = db.relationship('Notification', backref='user')

class School(db.Model, SerializerMixin):
    __tablename__ = 'schools'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    school_admins = db.relationship('SchoolAdmin', backref='school')
    parents = db.relationship('Parent', backref='school')
    tailor_requests = db.relationship('TailorSchoolRequest', backref='school')
    uniform_applications = db.relationship('UniformApplication', backref='school')

class SchoolAdmin(db.Model, SerializerMixin):
    __tablename__ = 'school_admins'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    school_id = db.Column(db.Integer, db.ForeignKey('schools.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Parent(db.Model, SerializerMixin):
    __tablename__ = 'parents'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    school_id = db.Column(db.Integer, db.ForeignKey('schools.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    uniform_applications = db.relationship('UniformApplication', backref='parent')

class Tailor(db.Model, SerializerMixin):
    __tablename__ = 'tailors'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_name = db.Column(db.String(255))
    location = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    school_requests = db.relationship('TailorSchoolRequest', backref='tailor')
    uniform_assignments = db.relationship('UniformAssignment', backref='tailor')

class TailorSchoolRequest(db.Model, SerializerMixin):
    __tablename__ = 'tailor_school_requests'
    
    id = db.Column(db.Integer, primary_key=True)
    tailor_id = db.Column(db.Integer, db.ForeignKey('tailors.id'), nullable=False)
    school_id = db.Column(db.Integer, db.ForeignKey('schools.id'), nullable=False)
    status = db.Column(db.String(50))  # pending, approved, rejected
    approved_by = db.Column(db.Integer)  # school_admin user_id
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class UniformApplication(db.Model, SerializerMixin):
    __tablename__ = 'uniform_applications'
    
    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('parents.id'), nullable=False)
    school_id = db.Column(db.Integer, db.ForeignKey('schools.id'), nullable=False)
    student_name = db.Column(db.String(255))
    student_class = db.Column(db.String(50))
    uniform_type = db.Column(db.String(50))  # primary, junior, secondary
    shirt_size = db.Column(db.String(10))
    trouser_size = db.Column(db.String(10))
    skirt_size = db.Column(db.String(10))
    shoe_size = db.Column(db.String(10))
    additional_notes = db.Column(db.Text)
    status = db.Column(db.String(50))  # pending, approved, rejected
    approved_by = db.Column(db.Integer)  # school_admin user_id
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    uniform_assignment = db.relationship('UniformAssignment', backref='uniform_application', uselist=False)

class UniformAssignment(db.Model, SerializerMixin):
    __tablename__ = 'uniform_assignments'
    
    id = db.Column(db.Integer, primary_key=True)
    uniform_application_id = db.Column(db.Integer, db.ForeignKey('uniform_applications.id'), nullable=False)
    tailor_id = db.Column(db.Integer, db.ForeignKey('tailors.id'), nullable=False)
    assigned_by = db.Column(db.Integer)  # school_admin user_id
    assigned_at = db.Column(db.DateTime, default=datetime.utcnow)

class Notification(db.Model, SerializerMixin):
    __tablename__ = 'notifications'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type = db.Column(db.String(50))
    message = db.Column(db.Text)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
