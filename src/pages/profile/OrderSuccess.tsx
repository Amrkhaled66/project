import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "src/components/ui/Button";
// Confetti particle
const Particle = ({ index }: { index: number }) => {
  const colors = [
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#f43f5e",
    "#3b82f6",
  ];
  const color = colors[index % colors.length];
  const size = Math.random() * 8 + 4;
  const startX = Math.random() * 100;
  const rotation = Math.random() * 360;

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        left: `${startX}%`,
        top: "-10px",
        rotate: rotation,
      }}
      initial={{ y: -20, opacity: 1, rotate: rotation }}
      animate={{
        y: ["0%", "110vh"],
        opacity: [1, 1, 0],
        rotate: rotation + (Math.random() > 0.5 ? 360 : -360),
        x: [0, (Math.random() - 0.5) * 200],
      }}
      transition={{
        duration: Math.random() * 2 + 2,
        delay: Math.random() * 1.5,
        ease: "easeIn",
      }}
    />
  );
};

const checkVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.6, delay: 0.4, ease: "easeOut" },
  },
};

const circleVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const pulseRingVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: [1, 1.6, 1.8],
    opacity: [0.6, 0.3, 0],
    transition: { duration: 1.2, delay: 0.6, ease: "easeOut" },
  },
};

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { id: routeId } = useParams();
  const [searchParams] = useSearchParams();
  const [showParticles, setShowParticles] = useState(false);

  const orderId =
    routeId || searchParams.get("id") || searchParams.get("orderId") || "";

  const handleTrackOrder = () => {
    const query = orderId ? `?orderId=${encodeURIComponent(orderId)}` : "";
    navigate(`/profile/orders${query}`);
  };

  useEffect(() => {
    const t = setTimeout(() => setShowParticles(true), 200);
    return () => clearTimeout(t);
  }, []);

  const particles = Array.from({ length: 60 });

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-12">
      {/* Confetti */}
      {showParticles && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          {particles.map((_, i) => (
            <Particle key={i} index={i} />
          ))}
        </div>
      )}

        {/* Soft background blobs — rose/red tones */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/4 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #fecdd3, #fff1f2)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #fda4af, #ffe4e6)" }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #fecaca, #fef2f2)" }}
      />

      <div className="relative mx-auto mt-7">
        {/* Success Icon */}
        <motion.div
          className="mb-10 flex flex-col items-center"
          initial="hidden"
          animate="visible"
        >
          <div className="relative flex h-24 w-24 items-center justify-center">
            {/* Pulse ring */}
            <motion.div
              variants={pulseRingVariants}
              className="absolute inset-0 rounded-full"
              style={{ border: "2px solid #6366f1" }}
            />
            {/* Glassy circle */}
            <motion.div
              variants={circleVariants}
              className="bg-primary flex h-24 w-24 items-center justify-center rounded-full"
              style={{
                boxShadow:
                  "0 8px 32px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.5)",
              }}
            >
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M8 22L18 32L36 12"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={checkVariants}
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Header text */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h1
            className="mb-2 text-5xl font-semibold"
            style={{
              color: "#1e1b4b",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Order Confirmed
          </h1>
          <p className="text-lg" style={{ color: "#6b7280", fontWeight: 400 }}>
            Your blanket is on its way ✦
          </p>
        </motion.div>

        {/* Glassy Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="max-w-xl mx-auto"
          style={{
            background: "rgba(255, 255, 255, 0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            borderRadius: "28px",
            padding: "36px",
            boxShadow:
              "0 8px 32px rgba(99,102,241,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          {/* Status row */}
          <div className="mb-2 flex items-center gap-3">
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: "#10b981", boxShadow: "0 0 8px #10b981" }}
            />
            <span
              style={{
                color: "#059669",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Payment Successful
            </span>
          </div>

          {orderId && (
            <p
              className="mt-1"
              style={{
                color: "#9ca3af",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "0.05em",
              }}
            >
              ORDER #{orderId}
            </p>
          )}

          {/* Shimmer divider */}
          <div
            className="my-6"
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(99,102,241,0.25), rgba(139,92,246,0.25), transparent)",
            }}
          />

          <p
            className="mb-6"
            style={{
              color: "#4b5563",
              fontSize: "15px",
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            We've received your order and it's being prepared with care. You'll
            receive a confirmation email shortly with tracking details.
          </p>

          <Button onClick={handleTrackOrder} className="w-full">Track My Order →</Button>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;
