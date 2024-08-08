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
    item = db.Column(db.String(1200), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user_to = db.relationship("Users", foreign_keys=[user_id],
                              backref=db.backref("user_to", lazy="select"))
    
    def __repr__(self):
        return f"item favourites of {self.iser_id} is {self.item}"
    
    def serialize(self):
        return{"id": self.id,
               "item": self.item,
               "user_id": self.user_id}

