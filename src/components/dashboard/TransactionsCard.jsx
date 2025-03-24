// Recent Book Purchases

export const TransactionsCard = () => {
  const recentBookPurchases = [
    {
      id: 1,
      customerName: "John Doe",
      bookTitle: "The Art of Programming",
      amount: 29.99,
      date: "2023-12-01",
      status: "completed",
      avatar: "/assets/img/avatars/1.png",
    },
    {
      id: 2,
      customerName: "Sarah Smith",
      bookTitle: "Data Structures Explained",
      amount: 24.99,
      date: "2023-11-30",
      status: "pending",
      avatar: "/assets/img/avatars/5.png",
    },
    {
      id: 3,
      customerName: "Mike Johnson",
      bookTitle: "Web Development Guide",
      amount: 34.99,
      date: "2023-11-29",
      status: "completed",
      avatar: "public/assets/img/avatars/6.png",
    },
    {
      id: 4,
      customerName: "Emily Brown",
      bookTitle: "Python Mastery",
      amount: 19.99,
      date: "2023-11-28",
      status: "completed",
      avatar: "public/assets/img/avatars/7.png",
    },
  ];

  return (
    <div className="col-md-6 col-lg-4 order-2 mb-4">
      <div className="card h-100">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h5 className="card-title m-0 me-2">Recent Book Purchases</h5>
          <div className="dropdown">
            <button
              className="btn p-0"
              type="button"
              id="transactionID"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="bx bx-dots-vertical-rounded"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="transactionID">
              <a className="dropdown-item" href="#">Last 28 Days</a>
              <a className="dropdown-item" href="#">Last Month</a>
              <a className="dropdown-item" href="#">Last Year</a>
            </div>
          </div>
        </div>
        <div className="card-body">
          {recentBookPurchases.map((purchase) => (
            <div key={purchase.id} className="d-flex align-items-center mb-3">
              <img
                src={purchase.avatar}
                alt={`${purchase.customerName}'s avatar`}
                className="rounded-circle me-3"
                width="42"
                height="42"
              />
              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div className="me-2">
                  <h6 className="mb-0">{purchase.customerName}</h6>
                  <small className="text-muted d-block">{purchase.bookTitle}</small>
                </div>
                <div className="user-progress">
                  <small className="fw-medium">${purchase.amount}</small>
                  <span className={`badge bg-label-${purchase.status === 'completed' ? 'success' : 'warning'} ms-2`}>
                    {purchase.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};