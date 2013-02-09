from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from sqlalchemy import Column, String, Text, ForeignKey, Integer, Float, Boolean
from sqlalchemy.orm import relationship

Base = declarative_base()
Session = sessionmaker()


class Category(Base):
    __tablename__ = 'categories'

    slug = Column(String(128), primary_key=True)
    title = Column(Text, nullable=False)
    parent_category_slug = Column(String(128),
        ForeignKey('categories.slug'))

    parent_category = relationship('Category', remote_side='Category.slug',
        backref='children')

    def to_dict(self):
        return {
            'slug': self.slug,
            'title': self.title,
            'parent_category': self.parent_category_slug,
        }


class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(Text, nullable=False)
    amount = Column(Float, nullable=False)
    image_url = Column(Text)
    purchased = Column(Boolean, default=False, nullable=False)

    category_slug = Column(String(128), ForeignKey('categories.slug'))
    category = relationship('Category', backref='products')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'amount': self.amount,
            'image_url': self.image_url,
            'category': self.category_slug,
        }

