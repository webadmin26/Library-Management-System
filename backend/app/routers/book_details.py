from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import get_db
from ..models.book_details import BookDetails, BookCopies, Category
from ..schemas.book_details import BookDetailsResponse

router = APIRouter(prefix="/books", tags=["Book details"])


@router.get("/{book_id}", response_model=BookDetailsResponse)
def get_book_details(book_id: int, db: Session = Depends(get_db)):
    # Get the selected book and its category description.
    statement = (
        select(
            BookDetails.id,
            BookDetails.cover_image_url,
            BookDetails.title,
            BookDetails.author,
            BookDetails.isbn,
            Category.description.label("category"),
            BookDetails.publisher,
            BookDetails.publication_year,
            BookDetails.ddc_number,
            BookDetails.authors_number,
            BookDetails.subject_heading,
        )
        .outerjoin(
            Category,
            BookDetails.category_id == Category.id,
        )
        .where(BookDetails.id == book_id)
    )

    book = db.execute(statement).mappings().one_or_none()

    if book is None:
        raise HTTPException(
            status_code=404,
            detail="Book not found",
        )

    # Get the copies belonging to this book.
    copies_statement = select(
        BookCopies.shelf_location,
        BookCopies.status,
    ).where(BookCopies.book_id == book_id)

    copies = db.execute(copies_statement).mappings().all()

    # Calculate the inventory summary.
    total_copies = len(copies)

    available = sum(
        1 for copy in copies if copy["status"] == "available"
    )

    borrowed = sum(
        1 for copy in copies if copy["status"] == "borrowed"
    )

    locations = sorted({
        copy["shelf_location"]
        for copy in copies
        if copy["shelf_location"]
    })

    # Combine book information and inventory into one response.
    result = dict(book)

    result.update({
        "total_copies": total_copies,
        "available": available,
        "borrowed": borrowed,
        "shelf_location": ", ".join(locations) if locations else None,
        "status": "AVAILABLE" if available > 0 else "UNAVAILABLE",
        "description": None,
    })

    return result