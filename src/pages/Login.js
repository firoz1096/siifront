import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { LuLogIn } from "react-icons/lu";
import Logo from "../assets/logo-dark.png";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.error || "Server error");
    }
  };

  return (
    <div className="bg_login_section">
      <div style={{ maxWidth: "350px", margin:'auto', paddingTop:'3rem' }}>
        <ToastContainer />
          <div className="mb-4 text-center"><img style={{maxHeight:'20px'}} src={Logo} alt="Sai Enterprises" /></div>
        
        <h1 className="text-center mb-4">Welcome!</h1>
      

        <form onSubmit={handleSubmit}>

        <div className="mb-3"> 
          <label htmlFor="email_lbl" className="form-label">Email address</label>
          <input id="email_lbl" type="email" className="form-control mb-3" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />    
          </div>  

          <div className="mb-3"> 
            <label htmlFor="password_lbl" className="form-label">Password</label>
              <input id="password_lbl" type="password" autoComplete="off" className="form-control mb-3" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>

        
          <button type="submit" className="btn btn-primary w-100"><LuLogIn /> Login</button>
        </form>
      </div>
     </div>
  );
}
