import os
import sys
import logging
import json
from functools import wraps

from flask import Flask, render_template
from sqlalchemy import create_engine

from models import Base, Session, Category, Product
from fixtures import fixtures

logger = logging.getLogger(__name__)

app = Flask(__name__, template_folder='.')
engine = create_engine('sqlite:///sqlite.db', echo=True)


def json_response(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return json.dumps([m.to_dict() for m in func(*args, **kwargs)])
    return wrapper


def load_fixtures():
    session = Session()
    try:
        for model, items in fixtures.items():
            for item in items:
                session.add(model(**item))
        session.commit()
    except:
        session.rollback()


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/<category_slug>/children/')
@json_response
def category_children(category_slug):
    session = Session()
    categories = session.query(Category)
    if category_slug == 'root':
        categories = categories.filter_by(parent_category_slug=None)
    else:
        categories = categories.filter_by(parent_category_slug=category_slug)

    return categories.all()


@app.route('/<category_slug>/products/')
@json_response
def category_products(category_slug):
    session = Session()
    products = session.query(Product).filter_by(
        category_slug=category_slug).all()
    return products


@app.route('/purchased/')
@json_response
def favourite_categories():
    session = Session()
    products = session.query(Product).filter_by(purchased=True)

    favourites = []
    for product in products:
        category = product.category
        while category is not None:
            favourites.append(category)
            category = category.parent_category

    return favourites


@app.route('/purchase/<int:product_id>/')
def purchase_product(product_id):
    session = Session()

    product = session.query(Product).get(product_id)
    product.purchased = True
    session.commit()

    return 'OK'


@app.route('/reset_purchases/')
def reset_purchases():
    session = Session()

    product = session.query(Product).update({'purchased': False})
    product.purchased = True
    session.commit()

    return 'OK'


@app.route('/reset_db/')
def reset_db():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

    load_fixtures()

    return 'OK'


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))

    # db initialisation
    Base.metadata.create_all(engine)
    Session.configure(bind=engine)

    if 'fixtures' in sys.argv:
        load_fixtures()

    if 'debug' in sys.argv:
        app.debug = True

    app.run(host='0.0.0.0', port=port)
