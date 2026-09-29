from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from fastapi.staticfiles import StaticFiles

from .routers.books_management import router as books_router
from .routers.book_details import router as book_details_router

app = FastAPI()

# Picture File hosting directory
static_directory = Path(__file__).resolve().parent.parent / "static"

app.mount(
    "/static",
    StaticFiles(directory=str(static_directory)),
    name="static",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(books_router)
app.include_router(book_details_router)

@app.get("/")
def root():
    return {"message": "Library Management System API is Running!"}