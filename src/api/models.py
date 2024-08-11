from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,
                "is_active": self.is_active,
                "is_admin": self.is_admin}


class Favourites(db.Model):
    __tablaname__ = "favourites"
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String(1200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user_to = db.relationship("Users", foreign_keys=[user_id],
                              backref=db.backref("user_to", lazy="select"))
    
    def __repr__(self):
        return f"item favourites of {self.user_id} is {self.item}"
    
    def serialize(self):
        return{"id": self.id,
               "item": self.item,
               "user_id": self.user.id}


class Characters(db.Model):
    __tablename__ = "characters"
    uid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    def __repr__(self):
        return f'<Characters {self.name}>'

    def serialize(self):
        return {"uid": self.uid,
                "name": self.username}


class CharacterDetails(db.Model):
    __tablename__ = "character_details"
    uid = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, unique=True, nullable=False)
    planet_origin = db.Column(db.String, unique=False, nullable=False)
    name = db.Column(db.String, unique=False, nullable=False)
    gender = db.Column(db.String, unique=False, nullable=False)
    height = db.Column(db.String, unique=False, nullable=False)
    eye_color = db.Column(db.String, unique=False, nullable=False)
    hair_color = db.Column(db.String, unique=False, nullable=False)
    transport = db.Column(db.String, unique=False, nullable=False)

    def __repr__(self):
        return f'<Character {self.name} - {self.planet_origin}>'

    def serialize(self):
        return {"id": self.id,
                "username": self.username,
                "firstname": self.firstname,
                "lastname": self.lastname,
                "email": self.email}


""" class Planets(db.Model):
    __tablename__ = "planets"
    uid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    

class PlanetDetails(db.Model):
    __tablename__ = "planet_details"
    uid = db.Column(db.Integer, primary_key=True)
    planet_id = db.Column(db.Integer, unique=True, nullable=False)
    gravity = db.Column(db.String, unique=False, nullable=False)
    diameter = db.Column(db.String, unique=False, nullable=False)
    population = db.Column(db.String, unique=False, nullable=False)
    terrain = db.Column(db.String, unique=False, nullable=False)
    created = db.Column(db.String, unique=False, nullable=False) """