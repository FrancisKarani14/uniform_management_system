from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Enum, UniqueConstraint

db = SQLAlchemy()


# -------------------------
# USER (Identity & Auth)
# -------------------------
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    role = db.Column(
        Enum("super_admin", "school_admin",
             "parent", "tailor", name="user_roles"),
        nullable=False
    )

    # Only enforced for school_admins
    is_approved = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    school_admin = db.relationship(
        "SchoolAdmin", backref="user", uselist=False)
    parent = db.relationship("Parent", backref="user", uselist=False)
    tailor = db.relationship("Tailor", backref="user", uselist=False)
    notifications = db.relationship(
        "Notification", backref="user", cascade="all, delete-orphan")


# -------------------------
# SCHOOL
# -------------------------
class School(db.Model, SerializerMixin):
    __tablename__ = "schools"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255))
    phone_number = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    school_admins = db.relationship(
        "SchoolAdmin", backref="school", cascade="all, delete-orphan")
    parents = db.relationship(
        "Parent", backref="school", cascade="all, delete-orphan")
    tailor_requests = db.relationship(
        "TailorSchool", backref="school", cascade="all, delete-orphan")
    uniform_applications = db.relationship(
        "UniformApplication", backref="school", cascade="all, delete-orphan")


# -------------------------
# SCHOOL ADMIN
# -------------------------
class SchoolAdmin(db.Model, SerializerMixin):
    __tablename__ = "school_admins"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    school_id = db.Column(db.Integer, db.ForeignKey(
        "schools.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


# -------------------------
# PARENT
# -------------------------
class Parent(db.Model, SerializerMixin):
    __tablename__ = "parents"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    school_id = db.Column(db.Integer, db.ForeignKey(
        "schools.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    uniform_applications = db.relationship(
        "UniformApplication", backref="parent", cascade="all, delete-orphan")


# -------------------------
# TAILOR (Profile only)
# -------------------------
class Tailor(db.Model, SerializerMixin):
    __tablename__ = "tailors"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    business_name = db.Column(db.String(255))
    location = db.Column(db.String(255))
    phone_number = db.Column(db.String(50))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    school_links = db.relationship(
        "TailorSchool", backref="tailor", cascade="all, delete-orphan")
    uniform_assignments = db.relationship(
        "UniformAssignment", backref="tailor", cascade="all, delete-orphan")


# -------------------------
# TAILOR ↔ SCHOOL (Approval lives here)
# -------------------------
class TailorSchool(db.Model, SerializerMixin):
    __tablename__ = "tailor_schools"

    id = db.Column(db.Integer, primary_key=True)

    tailor_id = db.Column(db.Integer, db.ForeignKey(
        "tailors.id"), nullable=False)
    school_id = db.Column(db.Integer, db.ForeignKey(
        "schools.id"), nullable=False)

    status = db.Column(
        Enum("pending", "approved", "rejected", name="tailor_school_status"),
        default="pending",
        nullable=False
    )

    approved_by = db.Column(db.Integer, db.ForeignKey("users.id"))
    approved_at = db.Column(db.DateTime)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (
        UniqueConstraint("tailor_id", "school_id", name="uq_tailor_school"),
    )


# -------------------------
# UNIFORM APPLICATION
# -------------------------
class UniformApplication(db.Model, SerializerMixin):
    __tablename__ = "uniform_applications"

    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey(
        "parents.id"), nullable=False)
    school_id = db.Column(db.Integer, db.ForeignKey(
        "schools.id"), nullable=False)

    student_name = db.Column(db.String(255), nullable=False)
    student_class = db.Column(db.String(50))
    uniform_type = db.Column(
        Enum("primary", "junior", "secondary", name="uniform_types"),
        nullable=False
    )

    shirt_size = db.Column(db.String(10))
    trouser_size = db.Column(db.String(10))
    skirt_size = db.Column(db.String(10))
    shoe_size = db.Column(db.String(10))
    additional_notes = db.Column(db.Text)

    status = db.Column(
        Enum("pending", "approved", "rejected",
             name="uniform_application_status"),
        default="pending",
        nullable=False
    )

    approved_by = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    uniform_assignment = db.relationship(
        "UniformAssignment",
        backref="uniform_application",
        uselist=False,
        cascade="all, delete-orphan"
    )


# -------------------------
# UNIFORM ASSIGNMENT
# -------------------------
class UniformAssignment(db.Model, SerializerMixin):
    __tablename__ = "uniform_assignments"

    id = db.Column(db.Integer, primary_key=True)
    uniform_application_id = db.Column(
        db.Integer,
        db.ForeignKey("uniform_applications.id"),
        nullable=False
    )
    tailor_id = db.Column(db.Integer, db.ForeignKey(
        "tailors.id"), nullable=False)

    assigned_by = db.Column(db.Integer, db.ForeignKey("users.id"))
    assigned_at = db.Column(db.DateTime, default=datetime.utcnow)


# -------------------------
# NOTIFICATIONS
# -------------------------
class Notification(db.Model, SerializerMixin):
    __tablename__ = "notifications"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    type = db.Column(db.String(50))
    message = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
