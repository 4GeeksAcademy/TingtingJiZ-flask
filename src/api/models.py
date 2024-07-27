from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=False, nullable=False)
    firstname = db.Column(db.String, unique=False, nullable=False)
    lastname = db.Column(db.String, unique=False, nullable=False)
    email = db.Column(db.String, unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {"id": self.id,
                "username": self.username,
                "firsname": self.firstname,
                "lastname": self.lastname,
                "email": self.email}

class Posts(db.Model):
    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship("Users", foreign_keys=[user_id],
                              backref=db.backref("post_to", lazy="select"))
    
    def __repr__(self):
        return f"<Post: {self.id} - {self.user_id}>"

    def serialize(self):
        return {"id": self.id,
                "user_id": self.user_id}

""" class Comments(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String, unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"))

    user_to = db.relationship("Users", foreign_keys=[user_id],
                               backref=db.backref("user_to", lazy="select"))
    post_to = db.relationship("Posts", foreign_keys=[post_id],
                                backref=db.backref("post_to", lazy="select"))

    def __repr__(self):
        return f"<Comment: {self.id} - {self.text} - {self.user_id} - {self.post_id}>"

    def serialize(self):
        return {"id": self.id,
                "text": self.text,
                "user_id": self.user_id,
                "post_id": self.post_id}
 """

class Comments(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    author_to = db.relationship('Users', foreign_keys=[author_id],
                                backref=db.backref('author_to', lazy='select'))
    post_to = db.relationship('Posts', foreign_keys=[post_id],
                                backref=db.backref('post_to', lazy='select'))
    def __repr__(self):
        return f'<Comment {self.id} - {self.comment_text} - {self.author_id} - {self.post_id}>'
    def serializa(self):
        return{"id": self.id,
                "comment_text": self.comment_text,
                "author_id": self.author_id,
                "post_id": self.post_id}
            
class Medias(db.Model):
    __tablename__ = "medias"
    id = db.Column(db.Integer, primary_key=True)
    kind = db.Column(db.Enum("image", "video", name="media_kind"), unique=False, nullable=False)
    url = db.Column(db.String, unique=False, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    post_to = db.relationship("Posts", foreign_keys=[post_id],
                              backref=db.backref("media_to", lazy="select"))

    def __repr__(self):
        return f"<Media: {self.id} - {self.kind}>"

    def serialize(self):
        return {"id": self.id,
                "kind": self.kind,
                "url": self.url}


