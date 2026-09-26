from fastapi import APIRouter, Depends
from sqlalchemy import and_, func, select
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Book, BookCopy
from ..schemas import BookRead

router = APIRouter(prefix="/books", tags=["books"])


@router.get("", response_model=list[BookRead])
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