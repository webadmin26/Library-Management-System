import { useEffect, useState } from "react"

function BookDetails({ book: selectedBook, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const bookId = selectedBook?.id;

  useEffect(() => {
    if (bookId == null) return;

    const controller = new AbortController();

    async function loadDetails() {
      setLoading(true);
      setError("");
      setDetails(null);

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/books/${bookId}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            `Could not load book details (${response.status}).`
          );
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setDetails(data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message || "Could not load book details.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadDetails();

    return () => controller.abort();
  }, [bookId]);

  if (!selectedBook) return null;

  const book =
    details?.id === bookId
      ? { ...selectedBook, ...details }
      : selectedBook;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-details-heading"
        className="flex max-h-[85dvh] w-full max-w-sm flex-col overflow-hidden rounded-lg bg-[#e7e7e7] shadow-xl"
      >
        <header className="shrink-0 bg-[#ad5dcc] px-4 py-2 text-center text-white">
          <h2 id="book-details-heading" className="font-bold">
            BOOK DETAILS
          </h2>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
            {loading && (
  <p role="status" className="mb-4 text-sm">
    Loading book details...
  </p>
)}

{error && (
  <p role="alert" className="mb-4 text-sm text-red-600">
    {error}
  </p>
)}
          {book.cover_image_url && (
            <img
              src={book.cover_image_url}
              alt={`Cover of ${book.title}`}
              className="mx-auto mb-5 h-40 w-28 object-contain"
            />
          )}

          <dl className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-4 gap-y-2 text-sm">
            <dt>Book ID</dt>
            <dd className="wrap-break-word">{book.id}</dd>

            <dt>Title</dt>
            <dd className="wrap-break-word">{book.title}</dd>

            <dt>Author</dt>
            <dd className="wrap-break-word">{book.author}</dd>

            <dt>ISBN</dt>
            <dd className="wrap-break-word">{book.isbn ?? "—"}</dd>

            <dt>Category</dt>
            <dd className="wrap-break-word">{book.category ?? "—"}</dd>

            <dt>Publisher</dt>
            <dd className="wrap-break-word">{book.publisher ?? "—"}</dd>

            <dt>Publication Year</dt>
            <dd>{book.publication_year ?? "—"}</dd>

            <dt>DDC Number</dt>
            <dd>{book.ddc_number ?? "—"}</dd>

            <dt>Author’s Number</dt>
            <dd>{book.authors_number ?? "—"}</dd>

            <dt>Subject Heading</dt>
            <dd className="wrap-break-word">
              {book.subject_heading ?? "—"}
            </dd>
          </dl>

          <h3 className="mb-3 mt-6 bg-neutral-500 py-1 text-center text-xs font-bold text-white">
            INVENTORY
          </h3>

          <dl className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-4 gap-y-2 text-sm">
            <dt>Total Copies</dt>
            <dd>{book.total_copies ?? "—"}</dd>

            <dt>Available</dt>
            <dd>{book.available ?? "—"}</dd>

            <dt>Borrowed</dt>
            <dd>{book.borrowed ?? "—"}</dd>

            <dt>Shelf Location</dt>
            <dd className="wrap-break-word">
              {book.shelf_location ?? "—"}
            </dd>

            <dt>Status</dt>
            <dd>{book.status ?? "—"}</dd>
          </dl>

          <h3 className="mb-3 mt-6 text-sm font-medium">
            BOOK DESCRIPTION
          </h3>

          <p className="whitespace-pre-wrap wrap-break-word text-sm leading-relaxed">
            {book.description || "No description provided."}
          </p>
        </div>

        <footer className="shrink-0 border-t border-neutral-300 px-5 py-3 text-center">
          <button
            type="button"
            onClick={onClose}
            className="rounded px-6 py-2 font-bold hover:bg-neutral-300 focus-visible:outline-2 focus-visible:outline-purple-700"
          >
            CLOSE
          </button>
        </footer>
      </section>
    </div>
  );
}

export default BookDetails;