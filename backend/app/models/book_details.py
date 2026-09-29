from sqlalchemy import Table

from ..database import Base, engine

class BookCopies(Base):
    __table__ = Table(
        "book_copies",
        Base.metadata,
        autoload_with=engine,
        keep_existing=True,
    )

class BookDetails(Base):
    __table__ = Table(
        "books",
        Base.metadata,
        autoload_with=engine,
        keep_existing=True,
    )

class Category(Base):
    __table__ = Table(
        "categories",
        Base.metadata,
        autoload_with=engine,
        keep_existing=True,
    )