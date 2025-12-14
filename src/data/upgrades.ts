// addonsData.ts
export const upgrades = [
  {
    id: "embroidery",
    name: "Embroidery Zones",
    description: "Add custom text or designs to specific areas.",
    price: 15.0,
  },
  {
    id: "blocking",
    name: "Blocking",
    description: "Adds structural support and pattern definition.",
    price: 20.0,
  },
  {
    id: "cornerstonesSingle",
    name: "Cornerstones (Single)",
    description: "Add decorative patches to the 4 corners of the blanket.",
    price: 10.0,
  },
  {
    id: "cornerstonesDouble",
    name: "Cornerstones (Double)",
    description:
      "Add decorative patches to all 8 positions — 4 corners and 4 midpoints on each side.",
    price: 18.0, // you can adjust this based on your pricing
  },

  {
    id: "customPanels",
    name: "Custom Panels",
    description: "Integrate unique fabric panels into the design.",
    price: 30.0,
  },
  {
    id: "quiltedPreserve",
    name: "Quilted Preserve",
    description: "Enhanced durability and texture.",
    price: 25.0,
  },
  {
    id: "fringe",
    name: "Fringe Border",
    description: "Add a decorative fringe to the border.",
    price: 22.0,
  },
  {
    id: "binding",
    name: "Custom Anti-Fray Binding",
    description:
      "Protective stitched edge wrapping the full blanket; auto-enabled with Quilted Preserve.",
    price: 25.0,
    autoAppliedBy: "quiltedPreserve", // 👈 custom field for logic
  },
];
