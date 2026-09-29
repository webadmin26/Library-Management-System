from pydantic import BaseModel, Field

class BookDetailsResponse(BaseModel):
    #Book Information
    id: int
    cover_image_url: str | None
    title: str
    author: str
    isbn: str | None
    category: str | None
    publisher: str | None
    publication_year: int | None
    ddc_number: int | None
    authors_number: int | None
    subject_heading: str | None

    # Inventory summary
    total_copies: int = Field(ge=0)
    available: int = Field(ge=0)
    borrowed: int = Field(ge=0)
    shelf_location: str | None
    status: str

    # Book description
    description: str | None = None