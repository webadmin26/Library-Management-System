import { useMemo, useState } from "react";

const books = [
  { id: "B100", title: "Harry Potter", author: "James Watt", available: 5 },
  {
    id: "B101",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    available: 3,
  },
  {
    id: "B102",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    available: 0,
  },
];

function BookManagement() {
  const [query, setQuery] = useState("");
  const [filterBy, setFilterBy] = useState("title");

  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return books;

    return books.filter((book) =>
      book[filterBy].toLowerCase().includes(normalizedQuery),
    );
  }, [filterBy, query]);

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

      <div className="mb-7 flex flex-col gap 3 sm:flex-row sm:items-center">
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

      {filteredBooks.length === 0 && (
        <p className="py-6 text-center text-sm text-gray-500">
          No books found.
        </p>
      )}
    </section>
  );
}

export default BookManagement;
