from pydantic import BaseModel, Field

class BookRead(BaseModel):
    id: int
    title: str
    author: str
    available: int = Field(ge=0)