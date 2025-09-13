import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import "./LandingPage.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="landing-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          className="hero-content"
          variants={itemVariants}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to <span className="highlight">Vidoo</span>
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            variants={itemVariants}
          >
            Connect instantly with secure, high-quality video meetings.  
            Join as a guest or create an account to unlock more features.
          </motion.p>

          <motion.div 
            className="cta-buttons"
            variants={itemVariants}
          >
            <motion.button 
              className="btn primary" 
              onClick={() => navigate("/register")}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Register
            </motion.button>
            <motion.button 
              className="btn secondary" 
              onClick={() => navigate("/login")}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Login
            </motion.button>
            <motion.button 
              className="btn guest" 
              onClick={() => navigate("/guest")}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Join as Guest
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80" 
            alt="Modern Video Conference Illustration" 
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features">
        <motion.div 
          className="feature-card"
          variants={itemVariants}
          whileHover={{ y: -10, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.img 
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png" 
            alt="Secure" 
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <h3>Secure Meetings</h3>
          <p>All your calls are encrypted, keeping your conversations private and secure.</p>
        </motion.div>
        <motion.div 
          className="feature-card"
          variants={itemVariants}
          whileHover={{ y: -10, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.img 
            src="https://cdn-icons-png.flaticon.com/512/1040/1040221.png" 
            alt="Fast" 
            whileHover={{ rotate: -360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <h3>Fast & Reliable</h3>
          <p>Experience low-latency, high-quality video streaming anywhere in the world.</p>
        </motion.div>
        <motion.div 
          className="feature-card"
          variants={itemVariants}
          whileHover={{ y: -10, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.img 
            src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" 
            alt="Guest" 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <h3>Easy Guest Access</h3>
          <p>Join instantly without signup  just enter your name and dive into the conversation.</p>
        </motion.div>
      </section>

      {/* Footer */}
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