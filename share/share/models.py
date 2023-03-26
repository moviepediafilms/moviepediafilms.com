from sqlalchemy import Column, ForeignKey, Integer, String, Text, Table
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "auth_user"
    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String)
    lists = relationship("MovieList")
    profile = relationship("Profile", uselist=False, back_populates="user")


class Profile(db.Model):
    __tablename__ = "api_profile"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("auth_user.id"))
    user = relationship("User", uselist=False, back_populates="profile")
    image = Column(String)


class Movie(db.Model):
    __tablename__ = "api_movie"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    about = Column(Text)
    poster = Column(String)

    def __repr__(self):
        return "<Movie %r>" % self.title


movielist_user_association = Table(
    "api_movielist_liked_by",
    db.metadata,
    Column("movielist_id", Integer, ForeignKey("api_movielist.id")),
    Column("user_id", Integer, ForeignKey("auth_user.id")),
)


class MovieList(db.Model):
    __tablename__ = "api_movielist"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    owner_id = Column(Integer, ForeignKey("auth_user.id"))
    owner = relationship("User")
    liked_by = relationship("User", secondary=movielist_user_association)

    def __repr__(self):
        return "<MovieList %r>" % self.name