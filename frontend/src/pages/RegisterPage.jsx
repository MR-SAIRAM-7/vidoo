import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
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
  AlertCircle
} from "lucide-react";
import "./RegisterPage.css";

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

export default function RegisterPage() {
  const navigate = useNavigate();

  // Updated form data to match database schema
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    // Real-time username validation
    if (name === "userName" && value.length > 2) {
      checkUsernameAvailability(value);
    }
  };

  const checkUsernameAvailability = async (username) => {
    setIsCheckingUsername(true);
    try {
      // Simulate API call to check username availability
      await new Promise(resolve => setTimeout(resolve, 800));

      // Simulate username validation (replace with actual API call)
      const unavailableUsernames = ["admin", "user", "test", "vidoo"];
      if (unavailableUsernames.includes(username.toLowerCase())) {
        setErrors(prev => ({ ...prev, userName: "Username is already taken" }));
      }
    } catch (error) {
      console.error("Username check failed:", error);
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Username validation
    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required";
    } else if (formData.userName.length < 3) {
      newErrors.userName = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.userName)) {
      newErrors.userName = "Username can only contain letters, numbers, and underscores";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepare data for API (excluding confirmPassword)
      const registrationData = {
        name: formData.name.trim(),
        userName: formData.userName.trim(),
        password: formData.password
      };

      // Simulate API registration call
      console.log("Registering user:", registrationData);
      await new Promise(resolve => setTimeout(resolve, 2000));

      // On success, navigate to login or dashboard
      navigate("/login", {
        state: {
          message: "Account created successfully! Please log in.",
          userName: formData.userName
        }
      });

    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ submit: "Registration failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isUsernameValid = formData.userName.length >= 3 &&
    /^[a-zA-Z0-9_]+$/.test(formData.userName) &&
    !errors.userName &&
    !isCheckingUsername;

  return (
    <motion.div
      className="register-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div className="hero-section" variants={heroVariants}>
        <div className="hero-content">
          <div className="hero-badge">
            <Video className="badge-icon" />
            <span>Video Calling Platform</span>
          </div>

          <h1 className="hero-title">
            Join <span className="brand-text">Vidoo</span>
          </h1>

          <p className="hero-subtitle">
            Connect instantly with secure, high-quality video meetings.
            Create your account and start building meaningful connections.
          </p>

          <div className="hero-features">
            <div className="feature-item">
              <Shield className="feature-icon" />
              <span>End-to-end encrypted</span>
            </div>
            <div className="feature-item">
              <Zap className="feature-icon" />
              <span>Lightning fast</span>
            </div>
            <div className="feature-item">
              <Users className="feature-icon" />
              <span>Multi-participant</span>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card card-1">
            <Video className="card-icon" />
            <span>HD Video</span>
          </div>
          <div className="floating-card card-2">
            <Shield className="card-icon" />
            <span>Secure</span>
          </div>
          <div className="floating-card card-3">
            <Users className="card-icon" />
            <span>Group Calls</span>
          </div>
        </div>
      </motion.div>

      {/* Form Section */}
      <motion.div className="form-section" variants={formVariants}>
        <div className="form-container">
          <div className="form-header">
            <h2 className="form-title">Create Account</h2>
            <p className="form-subtitle">
              Start your video calling journey today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {errors.submit && (
              <div className="error-banner">
                <AlertCircle className="error-icon" />
                <span>{errors.submit}</span>
              </div>
            )}

            {/* Full Name Input */}
            <motion.div
              className="input-group"
              custom={0}
              variants={inputVariants}
            >
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={errors.name ? "error" : ""}
                  disabled={isSubmitting}
                />
              </div>
              {errors.name && (
                <span className="error-message">
                  <AlertCircle className="error-icon" />
                  {errors.name}
                </span>
              )}
            </motion.div>

            {/* Username Input */}
            <motion.div
              className="input-group"
              custom={1}
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
                  className={errors.userName ? "error" : isUsernameValid ? "success" : ""}
                  disabled={isSubmitting}
                />
                {isCheckingUsername && (
                  <div className="input-spinner">
                    <div className="spinner"></div>
                  </div>
                )}
                {isUsernameValid && (
                  <CheckCircle className="input-success-icon" />
                )}
              </div>
              {errors.userName && (
                <span className="error-message">
                  <AlertCircle className="error-icon" />
                  {errors.userName}
                </span>
              )}
              {isUsernameValid && (
                <span className="success-message">
                  <CheckCircle className="success-icon" />
                  Username is available
                </span>
              )}
            </motion.div>

            {/* Password Input */}
            <motion.div
              className="input-group"
              custom={2}
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

            {/* Confirm Password Input */}
            <motion.div
              className="input-group"
              custom={3}
              variants={inputVariants}
            >
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className={errors.confirmPassword ? "error" : ""}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="error-message">
                  <AlertCircle className="error-icon" />
                  {errors.confirmPassword}
                </span>
              )}
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
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="button-icon" />
                </>
              )}
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="form-footer">
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="link-button"
              >
                Sign in here
              </button>
            </p>
          </div>
          {/* Footer */}
          
        </div>
       
      </motion.div>
       <footer className="footer">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Designed and developed by SaiRam
            </motion.p>
          </footer>
    </motion.div>
    
  );
}