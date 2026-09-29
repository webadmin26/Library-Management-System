from pydantic import BaseModel, Field

class BookResponse(BaseModel):
    id: int
    title: str
    author: str
    available: int = Field(ge=0)