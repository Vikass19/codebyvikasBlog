import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");

  // Use environment variables (Vite exposes with VITE_)
  const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.username === ADMIN_USERNAME && form.password === ADMIN_PASSWORD) {
      setMsg("Login successful!");
      localStorage.setItem("isAdmin", "true"); // simple session
      navigate("/admin"); // redirect to admin dashboard
    } else {
      setMsg("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Admin Login</h2>

        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-black focus:outline-none"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-black focus:outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-2xl font-semibold hover:bg-white hover:text-black border border-black transition-colors duration-300"
        >
          Login
        </button>

        {msg && <p className="text-center text-sm text-red-500">{msg}</p>}
      </form>
    </div>
  );
}
