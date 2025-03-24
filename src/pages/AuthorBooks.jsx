import { useState, useEffect } from "react";

export const AuthorBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        const response = await fetch("http://localhost:5000/api/books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch books");
        const data = await response.json();
        setBooks(data.books);
        setError(null);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">
          <span className="text-muted fw-light">Author /</span> Books Management
        </h4>
        <button className="btn btn-primary">
          <i className="bx bx-plus me-1"></i> Add New Book
        </button>
      </div>

      <div className="row">
        {books.map((book) => (
          <div key={book.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-lg">
              <div className="card-header bg-light py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 text-primary flex-grow-1">
                  <i className="bx bx-book-open me-2"></i>
                  {book.title}
                  <span className="text-muted fs-6">[{book.category}]</span>
                </h5>
                <button className="btn btn-outline-primary btn-sm">
                  <i className="bx bx-edit me-2"></i> Edit
                </button>
              </div>

              <div className="card-body d-flex flex-column">
                <div className="mb-3 text-center position-relative">
                  <img
                    src="src/assets/books/KAB1048.jpg"
                    alt={book.title}
                    className="img-fluid rounded-3 shadow-sm"
                    style={{
                      maxHeight: "200px",
                      maxWidth: "150px",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                  <div className="mt-2 small text-muted">ISBN: {book.isbn}</div>
                </div>

                <div className="flex-grow-1">
                  <dl className="row mb-2">
                    <dt className="col-sm-4 small text-muted">Category:</dt>
                    <dd className="col-sm-8 small fw-medium">
                      {book.category}
                    </dd>
                    <dt className="col-sm-4 small text-muted">Price:</dt>
                    <dd className="col-sm-8 small">₹{book.price}</dd>
                    <dt className="col-sm-4 small text-muted">Stock:</dt>
                    <dd className="col-sm-8 small text-capitalize">
                      {book.stock}
                    </dd>
                    <dt className="col-sm-4 small text-muted">Rating:</dt>
                    <dd className="col-sm-8 small">
                      {book.publication.rating}
                    </dd>
                    <dt className="col-sm-4 small text-muted">Published:</dt>
                    <dd className="col-sm-8 small text-capitalize">
                      {new Date(
                        book.publication.publishedDate
                      ).toLocaleDateString()}
                    </dd>
                  </dl>

                  <div className="mb-3">
                    <div className="d-flex gap-2 justify-content-center">
                      <a
                        href={book.marketplaceLinks.amazon}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-dark"
                      >
                        <i className="fab fa-amazon me-2"></i> Amazon
                      </a>
                      <a
                        href={book.marketplaceLinks.flipkart}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                      >
                        <i className="fas fa-shopping-bag me-2"></i> Flipkart
                      </a>
                    </div>
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <div className="border rounded p-2 text-center bg-light">
                        <small className="text-muted d-block">
                          Sold Copies
                        </small>
                        <strong className="text-success">
                          {book.soldCopies}
                        </strong>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="border rounded p-2 text-center bg-light">
                        <small className="text-muted d-block">Earnings</small>
                        <strong className="text-success">
                          ₹{book.royalties}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <a
                    href={`/book/${book.id}`}
                    className="btn btn-sm btn-outline-info w-100"
                  >
                    <i className="bx bx-detail me-1"></i> View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
