import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/auth/dashboard");

        if (res.data.message) {
          setMessage(res.data.message);
        } else if (res.data.user?.email) {
          setMessage(
            `Welcome, ${res.data.user.email}! This is a protected page.`
          );
        } else if (res.data.email) {
          setMessage(
            `Welcome, ${res.data.email}! This is a protected page.`
          );
        } else {
          setMessage("Welcome! This is a protected page.");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>

      {message ? <p>{message}</p> : <p>Loading...</p>}

      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
