import {
  Edit,
  ShoppingCart,
  CheckCircle2,
  Tag,
  ImageOff,
  FolderPlus,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { useDesigns } from "src/hooks/queries/design.queries";
import { useCart } from "src/context/cart.context";
import priceFormmater from "src/utils/priceFormmater";
import getImageLink from "src/utils/getImageLink";
import { motion, AnimatePresence } from "framer-motion";

export default function DesignLibraryPage() {
  const navigate = useNavigate();
  const { data: designs, isLoading } = useDesigns();
  const { addOrIncrease, cartItems } = useCart();
  const totalDesigns = designs?.length ?? 0;

  // ----------------------------
  // Helpers
  // ----------------------------
  const getItemQuantity = (designId: string) =>
    cartItems.find((item) => item.designId === designId)?.quantity ?? 0;

  const handleEdit = (id: string) => navigate(`/profile/design-library/${id}`);

  const handleAddToCart = (design: any) => {
    addOrIncrease({
      designId: design.id,
      name: design.name,
      previewImage: design.previewImage ?? null,
      price: design.price,
    });
  };

  // ----------------------------
  // Animations
  // ----------------------------
  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const cardAnim = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="min-h-screen space-y-4"
    >
      {/* HEADER */}
      <div className="page-header flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900">My Designs</h1>
        <p className="text-sm text-gray-500">{totalDesigns} saved designs</p>
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-6xl">
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border bg-white p-4 shadow-sm">
                <Skeleton height={150} />
                <Skeleton className="mt-4" width="70%" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && totalDesigns > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {designs!.map((design: any, index: number) => {
              const quantity = getItemQuantity(design.id);
              const inCart = quantity > 0;

              return (
                <motion.div
                  key={design.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardAnim as any}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white"
                  style={{
                    border: "1px solid #f3f4f6",
                    boxShadow:
                      "0 2px 12px rgba(0,32,81,0.06), 0 1px 3px rgba(0,32,81,0.04)",
                    transition: "box-shadow 0.25s ease, transform 0.25s ease",
                  }}
                  whileHover={{
                    y: -3,
                    boxShadow:
                      "0 12px 32px rgba(0,32,81,0.12), 0 2px 8px rgba(0,32,81,0.06)",
                  }}
                >
                  {/* Preview image area */}
                  <div className="bg-primary/10 relative size-40 w-full overflow-hidden p-2">
                    {design?.previewImage ? (
                      <img
                        src={getImageLink(design.previewImage)}
                        alt={design.name}
                        className="size-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col h-full items-center justify-center gap-2">
                        <ImageOff
                          size={28}
                          style={{ color: "#a098ae" }}
                          strokeWidth={1.5}
                        />
                        <span style={{ fontSize: "12px", color: "#a098ae" }}>
                          No Preview
                        </span>
                      </div>
                    )}

                    {/* Sold ribbon */}
                    {design.sold && (
                      <div
                        className="absolute top-0 right-0 flex items-center gap-1.5 rounded-bl-xl px-3 py-1.5"
                        style={{
                          background: "rgba(0,32,81,0.85)",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        <Tag size={11} color="white" />
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "white",
                            letterSpacing: "0.06em",
                          }}
                        >
                          SOLD
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col gap-4 p-4">
                    {/* Name & Price */}
                    <div className="flex items-start justify-between gap-2">
                      <h2
                        className="truncate text-base leading-tight font-semibold"
                        style={{ color: "#002051" }}
                      >
                        {design.name}
                      </h2>
                      <span
                        className="shrink-0 rounded-lg px-2.5 py-1 text-sm font-bold"
                        style={{
                          background: "#ebf3ff",
                          color: "#002051",
                          fontSize: "13px",
                        }}
                      >
                        {priceFormmater(design.price)}
                      </span>
                    </div>

                    {/* Divider */}
                    <div style={{ height: "1px", background: "#f3f4f6" }} />

                    {/* Actions */}
                    {design.sold ? (
                      <div className="mt-auto">
                        <div
                          className="flex items-center justify-center gap-2 rounded-xl py-2.5"
                          style={{
                            background: "#f3f4f6",
                            border: "1px solid #dedede",
                          }}
                        >
                          <Tag size={13} style={{ color: "#a098ae" }} />
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: 500,
                              color: "#565e6d",
                            }}
                          >
                            This design has been sold
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-auto flex gap-2">
                        {/* Edit */}
                        <motion.button
                          onClick={() => handleEdit(design.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5"
                          style={{
                            background: "white",
                            border: "1.5px solid #dedede",
                            color: "#002051",
                            fontSize: "13px",
                            fontWeight: 500,
                            cursor: "pointer",
                            transition: "border-color 0.2s, background 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#002051";
                            e.currentTarget.style.background = "#ebf3ff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#dedede";
                            e.currentTarget.style.background = "white";
                          }}
                        >
                          <Edit size={14} strokeWidth={2} />
                          Edit
                        </motion.button>

                        {/* Add to Cart */}
                        <motion.button
                          onClick={() => !inCart && handleAddToCart(design)}
                          disabled={inCart}
                          whileHover={!inCart ? { scale: 1.02 } : {}}
                          whileTap={!inCart ? { scale: 0.97 } : {}}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5"
                          style={{
                            background: inCart ? "#ebf3ff" : "#002051",
                            border: inCart
                              ? "1.5px solid #a0c4ff"
                              : "1.5px solid #002051",
                            color: inCart ? "#002051" : "white",
                            fontSize: "13px",
                            fontWeight: 500,
                            cursor: inCart ? "default" : "pointer",
                            transition: "all 0.25s ease",
                            boxShadow: inCart
                              ? "none"
                              : "0 2px 8px rgba(0,32,81,0.25)",
                          }}
                        >
                          <AnimatePresence mode="wait">
                            {inCart ? (
                              <motion.span
                                key="added"
                                className="flex items-center gap-1.5"
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.85 }}
                                transition={{ duration: 0.18 }}
                              >
                                <CheckCircle2 size={14} strokeWidth={2.5} />
                                Added
                              </motion.span>
                            ) : (
                              <motion.span
                                key="add"
                                className="flex items-center gap-1.5"
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.85 }}
                                transition={{ duration: 0.18 }}
                              >
                                <ShoppingCart size={14} strokeWidth={2} />
                                Add to Cart
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {!isLoading && totalDesigns === 0 && (
          <div className="flex flex-col items-center gap-4 py-16">
            <FolderPlus size={36} />
            <p>No designs yet</p>
          </div>
        )}
      </div>

      {/* <DeleteDesignModel
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      /> */}
    </motion.div>
  );
}
