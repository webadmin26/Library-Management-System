from sqlalchemy import Table
from .database import Base, engine


class Book(Base):
    __table__ = Table(
        "books",
        Base.metadata,
        autoload_with=engine,
    )

class BookCopy(Base):
     __table__ = Table(
        "book_copies",
        Base.metadata,
        autoload_with=engine,
    )
