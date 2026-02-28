import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import Button from "src/components/ui/Button";

const xVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.4, ease: "easeOut" },
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

const OrderCancel = () => {
  const navigate = useNavigate();
  const { id: routeId } = useParams();
  const [searchParams] = useSearchParams();

  const orderId =
    routeId || searchParams.get("id") || searchParams.get("orderId") || "";

  const handleGoHome = () => navigate("/");
  const handleTryAgain = () => {
    const query = orderId ? `?orderId=${encodeURIComponent(orderId)}` : "";
    navigate(`/checkout${query}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-12">
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
        {/* Cancel Icon */}
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
              style={{ border: "2px solid #f43f5e" }}
            />
            {/* Glassy circle */}
            <motion.div
              variants={circleVariants}
              className="flex h-24 w-24 items-center justify-center rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, rgba(244,63,94,0.85) 0%, rgba(239,68,68,0.85) 100%)",
                boxShadow:
                  "0 8px 32px rgba(244,63,94,0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.5)",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M12 12L28 28"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  variants={xVariants}
                />
                <motion.path
                  d="M28 12L12 28"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                      pathLength: 1,
                      opacity: 1,
                      transition: { duration: 0.5, delay: 0.65, ease: "easeOut" },
                    },
                  }}
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
              color: "#4c0519",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Order Cancelled
          </h1>
          <p className="text-lg" style={{ color: "#6b7280", fontWeight: 400 }}>
            Your payment was not completed ✦
          </p>
        </motion.div>

        {/* Glassy Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mx-auto max-w-xl"
          style={{
            background: "rgba(255, 255, 255, 0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            borderRadius: "28px",
            padding: "36px",
            boxShadow:
              "0 8px 32px rgba(244,63,94,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          {/* Status row */}
          <div className="mb-2 flex items-center gap-3">
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: "#f43f5e", boxShadow: "0 0 8px #f43f5e" }}
            />
            <span
              style={{
                color: "#e11d48",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Payment Cancelled
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
                "linear-gradient(90deg, transparent, rgba(244,63,94,0.25), rgba(239,68,68,0.2), transparent)",
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
            Your order was cancelled and no charge was made. If this was a
            mistake, you can return to checkout and try again — your cart is
            still saved.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleGoHome}
              style={{
                flex: 1,
                padding: "12px 24px",
                borderRadius: "12px",
                border: "1px solid rgba(244,63,94,0.2)",
                background: "rgba(255,241,242,0.6)",
                color: "#e11d48",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                backdropFilter: "blur(8px)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,228,230,0.8)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,241,242,0.6)")
              }
            >
              Return Home
            </button>
          </div>
        </motion.div>

     
      </div>
    </div>
  );
};

export default OrderCancel;