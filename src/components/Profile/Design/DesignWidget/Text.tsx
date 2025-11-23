import { useState, useEffect } from "react";
import { useCart } from "src/context/cart.context";
import { Pencil, Trash2 } from "lucide-react";
import MainDashButton from "src/components/ui/MainDashButton";
import { motion, AnimatePresence } from "framer-motion";
import FormInput from "src/components/ui/FormInput";
import { embroideryZones } from "src/data/zones";

const fonts = [
  { label: "Cursive", value: "Cursive" },
  { label: "Block", value: "Block" },
  { label: "Script", value: "Script" },
  { label: "Modern Sans", value: "Sans" },
];

const Text = () => {
  const { updateEmbroidery, cartItem, hasDoubleCorner } = useCart();

  const [selectedZone, setSelectedZone] = useState(embroideryZones[0].id);
  const [font, setFont] = useState(fonts[0].value);
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [color, setColor] = useState("#000000");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false); // NEW

  const embroideryUpgrade = cartItem.upgrades.find(
    (u) => u.id === "embroidery",
  );
  const existingZones = embroideryUpgrade?.props?.zones || [];

  const resetForm = () => {
    setSelectedZone(embroideryZones[0].id);
    setFont(fonts[0].value);
    setText("");
    setNotes("");
    setColor("#000000");
    setEditingId(null);
  };

  const handleAddOrUpdate = () => {
    const newZone = {
      id: selectedZone,
      text,
      font,
      color,
      notes,
    };

    const updatedZones = editingId
      ? existingZones.map((z: any) => (z.id === editingId ? newZone : z))
      : [...existingZones, newZone];

    updateEmbroidery(updatedZones);
    resetForm();
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    updateEmbroidery(existingZones.filter((z: any) => z.id !== id));
  };

  const handleEdit = (z: any) => {
    setSelectedZone(z.id);
    setFont(z.font);
    setText(z.text);
    setNotes(z.notes);
    setColor(z.color);
    setEditingId(z.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* LIST VIEW */}
      {existingZones.length > 0 && !showForm && (
        <>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-h-[300px] overflow-x-hidden overflow-y-auto"
            >
              <h4 className="mb-3 text-sm font-semibold text-gray-700">
                Existing Embroidery
              </h4>

              <div className="space-y-3 px-1">
                {existingZones.map((z: any) => (
                  <motion.div
                    key={z.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md"
                  >
                    <div className="space-y-1">
                      <p className="flex items-center gap-2 text-sm font-bold text-gray-900">
                        {z.text}
                        <span
                          className="h-3 w-3 rounded-full border border-gray-300"
                          style={{ backgroundColor: z.color }}
                        />
                      </p>

                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                          {z.font}
                        </span>

                        <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">
                          {
                            embroideryZones.find((zone) => zone.id === z.id)
                              ?.label
                          }
                        </span>
                      </div>

                      {z.notes && (
                        <p className="text-xs text-gray-500 italic">
                          "{z.notes}"
                        </p>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(z)}
                        className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                      >
                        <Pencil size={17} />
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(z.id)}
                        className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 size={17} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <MainDashButton
            text="Add New Embroidery"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          />
        </>
      )}

      {/* FORM VIEW */}
      {(existingZones.length === 0 || showForm) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Embroidery Zone
            </label>

            <div className="grid grid-cols-3 gap-2">
              {embroideryZones.map((zone) => {
                const active = selectedZone === zone.id;
                const isCenterd = zone.label.split(" ")[1] === "Center";
                if (isCenterd && hasDoubleCorner) return null;
                return (
                  <motion.button
                    key={zone.id}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedZone(zone.id)}
                    className={`rounded-lg border p-2 text-xs font-medium transition ${
                      active
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {zone.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Font Style
            </label>

            <div className="mt-2 flex flex-wrap gap-2">
              {fonts.map((f) => {
                const active = f.value === font;
                return (
                  <motion.button
                    key={f.value}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFont(f.value)}
                    className={`rounded-md border px-3 py-2 text-sm transition ${
                      active
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {f.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Color Picker */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Thread Color
            </label>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md"
            >
              <div
                className="h-9 w-9 rounded-full border border-gray-300 shadow-inner"
                style={{ backgroundColor: color }}
              />

              <FormInput
                label=""
                name="threadColor"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-14 cursor-pointer border-none bg-transparent p-0"
              />

              <span className="font-mono text-xs text-gray-500">
                {color.toUpperCase()}
              </span>
            </motion.div>
          </div>

          {/* Text Input */}
          <FormInput
            label="Embroidery Text"
            name="embroideryText"
            placeholder="Enter text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Notes Input */}
          <FormInput
            label="Notes / Orientation"
            name="notes"
            placeholder="Special instructions..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          {/* Submit */}
          <MainDashButton
            text={editingId ? "Update Embroidery" : "Add Embroidery"}
            onClick={handleAddOrUpdate}
          />

          {/* Cancel */}
          {existingZones.length > 0 && (
            <MainDashButton
              text="Cancel"
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
            />
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Text;
