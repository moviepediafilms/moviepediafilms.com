import os
from flask import Flask


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SHARE_DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SHARE_BASE_URL"] = os.getenv("SHARE_BASE_URL")
    app.url_map.strict_slashes = False

    from .models import db

    db.init_app(app)

    @app.context_processor
    def add_movie_variables():
        return dict(base_url=app.config["SHARE_BASE_URL"])

    from share.views.movie import app as movie_app
    from share.views.movie_list import app as movie_list_app
    from share.views.catch_all import app as catch_all_app

    app.register_blueprint(movie_app)
    app.register_blueprint(movie_list_app)
    app.register_blueprint(catch_all_app)

    return app
