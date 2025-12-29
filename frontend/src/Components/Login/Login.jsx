import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Login successful");
      } else {
        toast.error(data.message || "Login failed");
      }

      console.log(data);
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-gradient">
      <div className="card shadow-lg border-0" style={{ width: "600px" }}>
        <div className="card-header text-center bg-info text-white py-3">
          <h3 className="mb-0 text-dark">Welcome Back</h3>
          <small className="text-secondary">Login to your account</small>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label text-dark fw-semibold"
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control border-primary"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="form-text text-muted">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label text-dark fw-semibold"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control border-primary"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input border-primary"
                id="rememberMe"
              />
              <label
                className="form-check-label text-dark"
                htmlFor="rememberMe"
              >
                Remember me
              </label>
            </div>

            <button type="submit" className="btn btn-success w-100 fw-bold">
              Login
            </button>

            <p className="text-center mt-3 mb-0">
              <small className="text-muted">
                Don't have an account?{" "}
                <a href="/register" className="text-primary fw-semibold">
                  Register
                </a>
              </small>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
