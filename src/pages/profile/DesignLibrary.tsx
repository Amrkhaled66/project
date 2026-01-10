import {
  Edit,
  Trash2,
  ShoppingCart,
  FolderPlus,
  Paintbrush,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  useDesigns,
  useCreateDesign,
  useDeleteDesign,
} from "src/hooks/queries/design.queries";
import Button from "src/components/ui/Button";
import AddDesignModal from "src/components/Profile/Design/AddDesignModal";
import DeleteDesignModel from "src/components/Profile/Design/DeleteDesignModel";
import { useState } from "react";
import Toast from "src/components/ui/Toast";
import { useCart } from "src/context/cart.context";
import priceFormmater from "src/utils/priceFormmater";

export default function DesignLibraryPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { removeFromCart } = useCart();
  const navigate = useNavigate();

  const { data: designs, isLoading } = useDesigns();
  const createDesign = useCreateDesign();
  const deleteDesign = useDeleteDesign();

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

    Toast("Added to cart", "success", "#d1fae5", "top-end");
  };

  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    // 1️⃣ Delete design from backend
    await deleteDesign.mutateAsync(deleteId);

    // 2️⃣ Remove from cart if exists
    removeFromCart(deleteId);

    // 3️⃣ Close modal & cleanup
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  const handleCreate = async (name: string) => {
    const res = await createDesign.mutateAsync(name);
    navigate(`/profile/design-library/${res.id}`);
  };

  // ----------------------------
  // Animations
  // ----------------------------
  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const cardAnim = {
    hidden: { opacity: 0, y: 15, scale: 0.97 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.05, duration: 0.25 },
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
      className="min-h-screen space-y-4 bg-gray-50 px-6 py-10"
    >
      {/* HEADER */}
      <div className="mx-auto mb-10 flex max-w-6xl items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Designs</h1>
          <p className="text-sm text-gray-500">{totalDesigns} saved designs</p>
        </div>

        {!isLoading && totalDesigns > 0 && (
          <Button
            isLoading={createDesign.isPending}
            className="flex items-center gap-x-1 px-3 py-2"
            onClick={() => setShowCreateModal(true)}
          >
            <Paintbrush size={16} strokeWidth={2.2} />
            New Design
          </Button>
        )}
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {designs!.map((design: any, index: number) => {
              const quantity = getItemQuantity(design.id);

              return (
                <motion.div
                  key={design.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardAnim}
                  className="flex flex-col gap-4 rounded-xl border bg-white p-5 shadow-lg hover:bg-gray-50"
                >
                  {/* Preview */}
                  <div className="relative h-40 rounded-lg bg-gray-100 p-2">
                    {quantity > 0 && (
                      <div className="bg-primary absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-bold text-white">
                        {quantity}
                      </div>
                    )}

                    {design?.previewImage ? (
                      <img
                        src={import.meta.env.VITE_API_URL+design.previewImage}
                        alt={design.name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        No Preview
                      </div>
                    )}
                  </div>

                  {/* Name & Price */}
                  <div className="flex items-center justify-between">
                    <h2 className="truncate text-lg font-semibold">
                      {design.name}
                    </h2>
                    <p className="font-bold">{priceFormmater(design.price)}</p>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex flex-col gap-2">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(design.id)}
                        className="flex w-2/3 items-center justify-center gap-2 rounded-lg border p-3 hover:bg-gray-800 hover:text-white"
                      >
                        <Edit size={16} />
                        Edit
                      </button>

                      <button
                        onClick={() => openDeleteModal(design.id)}
                        className="flex w-1/3 items-center justify-center rounded-lg border p-3 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* ADD / INCREASE CART */}
                    <button
                      onClick={() => handleAddToCart(design)}
                      className="hover:bg-primary flex items-center justify-center gap-2 rounded-lg border p-3 transition hover:text-white"
                    >
                      <ShoppingCart size={16} />
                      {quantity > 0 ? `Add More (${quantity})` : "Add To Cart"}
                    </button>
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
            <Button onClick={() => setShowCreateModal(true)}>
              Create New Design
            </Button>
          </div>
        )}
      </div>

      {/* MODALS */}
      <AddDesignModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={(name) => {
          setShowCreateModal(false);
          handleCreate(name);
        }}
        isLoading={createDesign.isPending}
      />

      <DeleteDesignModel
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </motion.div>
  );
}
