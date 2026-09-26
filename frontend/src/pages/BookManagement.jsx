import { useEffect, useMemo, useState } from "react";

function BookManagement() {
  //1. State declarations
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [filterBy, setFilterBy] = useState("title");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //2. Use to Fetch Books from backend
  useEffect(() => {
    const controller = new AbortController();

    async function loadBooks() {
      try {
        const response = await fetch("http://127.0.0.1:8000/books", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Could not load books (${response.status}).`);
        }

        const data = await response.json();
        setBooks(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message || "Could not connect to the server.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }
    loadBooks();
    return () => controller.abort();
  }, []);

  //3. Use to Filter book's searching
  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return books;

    return books.filter((book) =>
      String(book[filterBy] ?? "")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [books, filterBy, query]);

  return (
    <section className="px-4 pb-8 pt-3 sm:px-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="bg-emerald-500 px-3 py-1 text-base font-semibold text-white">
          Book Management
        </h1>
        <div className="flex items-center gap-10 whitespace-nowrap">
          <button
            className="cursor-pointer text-sm font-semibold hover:text-emerald-700"
            type="button"
          >
            ADD BOOK
          </button>
          <button
            className="cursor-pointer text-sm font-semibold hover:text-emerald-700"
            type="button"
          >
            BORROWED BOOKS
          </button>
        </div>
      </div>

      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block w-full max-w-sm">
          <span className="sr-only">Search books</span>
          <input
            className="w-full border-b border-black bg-transparent py-1 pr-8 text-sm outline-none focus:border-emerald-600"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search book"
            type="search"
            value={query}
          />

          <span
            aria-hidden="true"
            className="absolute bottom-1 right-1 text-lg text-blue-500"
          >
            ⌕
          </span>
        </label>

        <label>
          <span className="sr-only">Search by</span>
          <select
            className="bg-stone-300 px-2 py-1 text-xs uppercase outline-none"
            onChange={(event) => setFilterBy(event.target.value)}
            value={filterBy}
          >
            <option value="id">Book ID</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
        </label>
      </div>

{loading && (
  <p className="py-6 text-center">Loading Books...</p>
)}
{error && (
  <p className="py-6 text-center text-red-600">{error}</p>
)}
      <div className="overflow-x-auto">
        <table className="w-full min-w-175 text-left text-sm">
          <thead className="bg-emerald-500 text-white">
            <tr>
              <th className="px-5 py-2 font-medium">Book ID</th>
              <th className="px-5 py-2 font-medium">Title</th>
              <th className="px-5 py-2 font-medium">Author</th>
              <th className="px-5 py-2 text-center font-medium">Available</th>
              <th className="px-5 py-2 text-center font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id} className="border-b border-gray-100">
                <td className="px-5 py-3">{book.id}</td>
                <td className="px-5 py-3">{book.title}</td>
                <td className="px-5 py-3">{book.author}</td>
                <td className="px-5 py-3 text-center">{book.available}</td>
                <td className="px-5 py-3">
                  <div className="flex justify-center gap-4 [&>button]:cursor-pointer">
                    <button aria-label={`View ${book.title}`} type="button">
                      View
                    </button>
                    <button aria-label={`Edit ${book.title}`} type="button">
                      Edit
                    </button>
                    <button aria-label={`Delete ${book.title}`} type="button">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!loading && !error && filteredBooks.length === 0 && (
        <p className="py-6 text-center text-sm text-gray-500">
          No books found.
        </p>
      )}
    </section>
  );
}

export default BookManagement;
