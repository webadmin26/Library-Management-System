from fastapi import APIRouter, Depends
from sqlalchemy import and_, func, select
from sqlalchemy.orm import Session

from ..database import get_db
from ..models.book_management import Book, BookCopy
from ..schemas.book_management import BookResponse

router = APIRouter(prefix="/books", tags=["books"])


@router.get("", response_model=list[BookResponse])
def list_books(db: Session = Depends(get_db)):
    statement = (
        select(
            Book.id,
            Book.title,
            Book.author,
            func.count(BookCopy.id).label("available"),
        )
        .outerjoin(
            BookCopy,
            and_(
                BookCopy.book_id == Book.id,
                BookCopy.status == "available",
            ),
        )
        .group_by(Book.id, Book.title, Book.author)
        .order_by(Book.id)
    )

    rows = db.execute(statement).mappings().all()

    return rows