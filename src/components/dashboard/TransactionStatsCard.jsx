import { useState, useEffect } from "react";
import axios from "axios";

export const TransactionStatsCard = () => {
  const [royaltyData, setRoyaltyData] = useState({
    royaltyReceived: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchRoyaltyData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Extract royaltyReceived from profile response
        const { royaltyReceived } = response.data;
        
        setRoyaltyData({
          royaltyReceived: royaltyReceived || 0,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error("Error fetching royalty data:", error);
        setRoyaltyData({
          royaltyReceived: 0,
          loading: false,
          error: "Failed to load royalty data"
        });
      }
    };

    fetchRoyaltyData();
  }, []);

  if (royaltyData.loading) {
    return (
      <div className="col-6 mb-4">
        <div className="card">
          <div className="card-body d-flex justify-content-center align-items-center p-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (royaltyData.error) {
    return (
      <div className="col-6 mb-4">
        <div className="card">
          <div className="card-body">
            <div className="alert alert-danger mb-0">{royaltyData.error}</div>
          </div>
        </div>
      </div>
    );
  }

  // Format royalty amount
  const formattedRoyalty = royaltyData.royaltyReceived.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div className="col-6 mb-4">
      <div className="card">
        <div className="card-body">
          <div className="card-title d-flex align-items-start justify-content-between">
            {/* <div className="avatar flex-shrink-0 p-3 rounded bg-primary bg-opacity-10"> */}
              <i className="bx bx-book-content text-primary fs-3"></i>
            {/* </div> */}
            <div className="dropdown">
              <button
                aria-label="Click me"
                className="btn p-0"
                type="button"
                id="cardOpt1"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="bx bx-dots-vertical-rounded"></i>
              </button>
              <div className="dropdown-menu" aria-labelledby="cardOpt1">
                <a aria-label="view more" className="dropdown-item" href="#">
                  View History
                </a>
                <a aria-label="details" className="dropdown-item" href="#">
                  View Details
                </a>
              </div>
            </div>
          </div>
          <span className="fw-medium d-block mb-1">Royalty Received</span>
          <h3 className="card-title mb-2">
            ₹{formattedRoyalty}
          </h3>
          <small className="text-muted fw-medium d-flex align-items-center">
            <i className="bx bx-calendar me-1"></i>
            Total lifetime earnings
          </small>
        </div>
      </div>
    </div>
  );
};