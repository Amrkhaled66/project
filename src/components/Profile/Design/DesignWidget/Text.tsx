// src/components/DesignWidget/Text.tsx
import { useState } from "react";
import { useCart } from "src/context/cart.context";
import { Pencil, Trash2 } from "lucide-react"; 
import MainDashButton from "src/components/ui/MainDashButton";

const fonts = [
  { label: "Cursive", value: "Cursive" },
  { label: "Block", value: "Block" },
  { label: "Script", value: "Script" },
  { label: "Modern Sans", value: "Sans" },
];

const zones = [
  "Top Left",
  "Top Center",
  "Top Right",
  "Bottom Left",
  "Bottom Center",
  "Bottom Right",
  "Left Side",
  "Right Side",
];

const Text = () => {
  const { updateEmbroidery, cartItem } = useCart();
  const [selectedZone, setSelectedZone] = useState(zones[0]);
  const [font, setFont] = useState(fonts[0].value);
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [color, setColor] = useState("#000000");
  const [editingId, setEditingId] = useState<string | null>(null);

  const embroideryUpgrade = cartItem.upgrades.find(
    (u) => u.id === "embroidery",
  );
  const existingZones = embroideryUpgrade?.props?.zones || [];

  const handleAddOrUpdate = () => {
    const newZone = {
      id: selectedZone.toLowerCase().replace(/\s/g, "-"),
      text,
      font,
      color,
      notes,
    };

    let updatedZones = [];

    if (editingId) {
      // update existing zone
      updatedZones = existingZones.map((z: any) =>
        z.id === editingId ? newZone : z,
      );
    } else {
      // add new zone
      updatedZones = [...existingZones, newZone];
    }

    updateEmbroidery(updatedZones);

    // reset fields
    setText("");
    setNotes("");
    setEditingId(null);
    setSelectedZone(zones[0]);
 
  };

  const handleDelete = (id: string) => {
    const filtered = existingZones.filter((z: any) => z.id !== id);
    updateEmbroidery(filtered);
  };

  const handleEdit = (z: any) => {
    setSelectedZone(
      zones.find((zone) => z.id.includes(zone.toLowerCase().split(" ")[0])) ||
        zones[0],
    );
    setFont(z.font);
    setText(z.text);
    setNotes(z.notes);
    setColor(z.color);
    setEditingId(z.id);

  };

  return (
    <div className="space-y-4">
      {existingZones.length > 0 && (
        <div className="border-b pt-4">
          <h4 className="mb-2 text-sm font-semibold text-gray-700">
            Existing Zones
          </h4>
          <div className="space-y-2">
            {existingZones.map((z: any) => (
              <div
                key={z.id}
                className="flex items-center justify-between rounded-md border border-gray-200 p-2 shadow-sm"
              >
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {z.text}{" "}
                    <span className="text-xs text-gray-500">({z.font})</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Zone: {z.id.replace(/-/g, " ")}
                  </p>
                  {z.notes && (
                    <p className="mt-1 text-xs text-gray-400">
                      Note: {z.notes}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(z)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(z.id)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Zone Selector */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">
          Position / Zone
        </label>
        <select
          className="rounded-md border border-gray-300 p-2 text-sm"
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
        >
          {zones.map((z) => (
            <option key={z}>{z}</option>
          ))}
        </select>
      </div>

      {/* Font Selector */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Font Style</label>
        <select
          className="rounded-md border border-gray-300 p-2 text-sm"
          value={font}
          onChange={(e) => setFont(e.target.value)}
        >
          {fonts.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Color Picker */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">
          Thread Color
        </label>
        <input
          type="color"
          className="h-8 w-16 cursor-pointer"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      {/* Text Input */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">
          Embroidery Text
        </label>
        <input
          className="rounded-md border border-gray-300 p-2 text-sm"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">
          Notes / Orientation
        </label>
        <textarea
          className="rounded-md border border-gray-300 p-2 text-sm"
          rows={2}
          placeholder="Describe direction or special instructions..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <MainDashButton
        text={editingId ? "Update Zone" : "Add Embroidery"}
        onClick={handleAddOrUpdate}
      />

      {/* List of zones */}
    </div>
  );
};

export default Text;
