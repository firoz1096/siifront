import React from "react";
import { Link } from "react-router-dom";

// NotFound.jsx — Bootstrap 5 version
// Usage: <Route path="*" element={<NotFound />} />

export default function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light px-3">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5 text-center">
              <h1 className="display-1 fw-bold text-primary">404</h1>
              <h2 className="fw-semibold mt-3">Page Not Found</h2>
              <p className="text-muted mt-2">
                The page you're trying to reach doesn’t exist or might have been moved.
              </p>

              <div className="mt-4 d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link
                  to="/"
                  className="btn btn-primary px-4 py-2 fw-semibold shadow-sm"
                >
                  Go to Homepage
                </Link>

  
              </div>

              <div className="mt-4">
                {/* Simple SVG Illustration */}
                <svg
                  width="260"
                  height="160"
                  viewBox="0 0 320 240"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="20" y="20" width="280" height="170" rx="20" fill="#e7f1ff" />
                  <path d="M60 150h200" stroke="#bdd7ff" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="110" cy="90" r="28" fill="#0d6efd" />
                  <rect x="150" y="65" width="110" height="60" rx="10" fill="#6ea8fe" />
                  <text x="110" y="98" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">404</text>
                </svg>
              </div>

            
            </div>

            <div className="text-center text-muted small mt-3">
              © {new Date().getFullYear()} Sai Enterprises — <Link to="/">Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
