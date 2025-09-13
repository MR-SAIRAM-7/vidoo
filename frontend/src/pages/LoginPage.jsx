import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  AtSign, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Video, 
  Shield, 
  Zap, 
  Users,
  CheckCircle,
  AlertCircle,
  LogIn
} from "lucide-react";
import "./LoginPage.css";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const formVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

const inputVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: i * 0.1,
      ease: "easeOut"
    }
  })
};

const heroVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get success message from registration
  const registrationMessage = location.state?.message;
  const prefilledUsername = location.state?.userName || "";

  const [formData, setFormData] = useState({
    userName: prefilledUsername,
    password: "",
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(!!registrationMessage);

  // Hide success message after 5 seconds
  useEffect(() => {
    if (registrationMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [registrationMessage]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required";
    } else if (formData.userName.length < 3) {
      newErrors.userName = "Username must be at least 3 characters";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepare login data
      const loginData = {
        userName: formData.userName.trim(),
        password: formData.password,
        rememberMe: formData.rememberMe
      };

      // Simulate API login call
      console.log("Logging in user:", { userName: loginData.userName, rememberMe: loginData.rememberMe });
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate login validation
      const mockUsers = [
        { userName: "testuser", password: "123456" },
        { userName: "admin", password: "admin123" },
        { userName: prefilledUsername, password: "123456" } // For demo purposes
      ];

      const user = mockUsers.find(u => 
        u.userName === loginData.userName && u.password === loginData.password
      );

      if (!user) {
        setErrors({ 
          submit: "Invalid username or password. Please try again." 
        });
        return;
      }

      // Store auth state (in real app, this would be handled by context/redux)
      if (formData.rememberMe) {
        localStorage.setItem("vidoo_user", JSON.stringify({ 
          userName: loginData.userName,
          token: "mock_token_" + Date.now()
        }));
      } else {
        sessionStorage.setItem("vidoo_user", JSON.stringify({ 
          userName: loginData.userName,
          token: "mock_token_" + Date.now()
        }));
      }

      // Navigate to dashboard or main app
      navigate("/dashboard", { 
        replace: true,
        state: { 
          welcomeMessage: `Welcome back, ${loginData.userName}!` 
        }
      });

    } catch (error) {
      console.error("Login failed:", error);
      setErrors({ 
        submit: "Login failed. Please check your connection and try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password or show modal
    navigate("/forgot-password");
  };

  const handleGuestLogin = () => {
    // Navigate to guest page
    navigate("/guest");
  };

  return (
    <motion.div 
      className="login-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div className="hero-section" variants={heroVariants}>
        <div className="hero-content">
          <div className="hero-badge">
            <Video className="badge-icon" />
            <span>Secure Video Platform</span>
          </div>

          <h1 className="hero-title">
            Welcome Back to <span className="brand-text">Vidoo</span>
          </h1>

          <p className="hero-subtitle">
            Sign in to continue your seamless video calling experience. 
            Connect with anyone, anywhere, anytime.
          </p>

          <div className="hero-features">
            <div className="feature-item">
              <Shield className="feature-icon" />
              <span>Secure & Private</span>
            </div>
            <div className="feature-item">
              <Zap className="feature-icon" />
              <span>Lightning Fast</span>
            </div>
            <div className="feature-item">
              <Users className="feature-icon" />
              <span>HD Group Calls</span>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Happy Users</span>
            </div>
            <div className="stat">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card card-1">
            <LogIn className="card-icon" />
            <span>Quick Login</span>
          </div>
          <div className="floating-card card-2">
            <Shield className="card-icon" />
            <span>Protected</span>
          </div>
          <div className="floating-card card-3">
            <Video className="card-icon" />
            <span>HD Quality</span>
          </div>
        </div>
      </motion.div>

      {/* Form Section */}
      <motion.div className="form-section" variants={formVariants}>
        <div className="form-container">
          <div className="form-header">
            <h2 className="form-title">Sign In</h2>
            <p className="form-subtitle">
              Access your account and start connecting
            </p>
          </div>

          {/* Success Message */}
          {showSuccessMessage && registrationMessage && (
            <motion.div 
              className="success-banner"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <CheckCircle className="success-icon" />
              <span>{registrationMessage}</span>
              <button 
                onClick={() => setShowSuccessMessage(false)}
                className="close-success"
                aria-label="Close message"
              >
                ×
              </button>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {errors.submit && (
              <div className="error-banner">
                <AlertCircle className="error-icon" />
                <span>{errors.submit}</span>
              </div>
            )}

            {/* Username Input */}
            <motion.div 
              className="input-group"
              custom={0}
              variants={inputVariants}
            >
              <div className="input-wrapper">
                <AtSign className="input-icon" />
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Username"
                  className={errors.userName ? "error" : ""}
                  disabled={isSubmitting}
                  autoComplete="username"
                />
              </div>
              {errors.userName && (
                <span className="error-message">
                  <AlertCircle className="error-icon" />
                  {errors.userName}
                </span>
              )}
            </motion.div>

            {/* Password Input */}
            <motion.div 
              className="input-group"
              custom={1}
              variants={inputVariants}
            >
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={errors.password ? "error" : ""}
                  disabled={isSubmitting}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <span className="error-message">
                  <AlertCircle className="error-icon" />
                  {errors.password}
                </span>
              )}
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div 
              className="form-options"
              custom={2}
              variants={inputVariants}
            >
              <label className="remember-me">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <span className="checkbox-custom"></span>
                Remember me
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="forgot-password"
                disabled={isSubmitting}
              >
                Forgot password?
              </button>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="button-icon" />
                </>
              )}
            </motion.button>

            {/* Guest Login */}
            <motion.button
              type="button"
              onClick={handleGuestLogin}
              className="guest-button"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Users className="button-icon" />
              Continue as Guest
            </motion.button>
          </form>

          {/* Register Link */}
          <div className="form-footer">
            <p>
              Don\'t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="link-button"
              >
                Create one here
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}