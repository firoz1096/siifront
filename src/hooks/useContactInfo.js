import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function useContactInfo() {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem("contactInfoSai");
    if (cached) {
      setContactInfo(JSON.parse(cached));
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/contact-info`);
        setContactInfo(res.data);
        localStorage.setItem("contactInfoSai", JSON.stringify(res.data));
      } catch (err) {
        console.error("Error fetching contact info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { contactInfo, loading };
}
