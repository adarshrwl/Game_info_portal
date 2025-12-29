import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.msg || "Signup successful!");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.msg || "Signup failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-gradient">
      <div className="card shadow-lg border-0" style={{ width: "600px" }}>
        <div className="card-header text-center bg-info text-white py-3">
          <h3 className="mb-0 text-dark">Create Account</h3>
          <small className="text-secondary">Register to continue</small>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {/* USERNAME */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">
                Username
              </label>
              <input
                type="text"
                className="form-control border-primary"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* EMAIL */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">
                Email Address
              </label>
              <input
                type="email"
                className="form-control border-primary"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD WITH EYE ICON */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">
                Password
              </label>

              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control border-primary"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                  ></i>
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD WITH EYE ICON */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">
                Confirm Password
              </label>

              <div className="input-group">
                <input
                  type={showConfirm ? "text" : "password"}
                  className="form-control border-primary"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  <i
                    className={showConfirm ? "bi bi-eye-slash" : "bi bi-eye"}
                  ></i>
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-success w-100 fw-bold">
              Register
            </button>

            <p className="text-center mt-3 mb-0">
              <small className="text-muted">
                Already have an account?{" "}
                <a href="/login" className="text-primary fw-semibold">
                  Login
                </a>
              </small>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
