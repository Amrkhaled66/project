export const embroideryZones = [
  {
    label: "Top Left",
    id: "top-left",
    style: { top: "0%", left: "8%", textAlign: "left" }
  },
  {
    label: "Top Center",
    id: "top-center",
    style: { top: "0%", left: "50%", transform: "translateX(-50%)" }
  },
  {
    label: "Top Right",
    id: "top-right",
    style: { top: "0%", right: "8%", textAlign: "right" }
  },

  // LEFT SIDE
  {
    label: "Left Top",
    id: "left-top",
    style: {
      top: "20%",
      left: "2%",
      transform: "rotate(-90deg)",
      transformOrigin: "left center"
    }
  },
  {
    label: "Left Center",
    id: "left-center",
    style: {
      top: "50%",
      left: "5%",
      transform: "rotate(-90deg) translateY(-50%)",
      transformOrigin: "left center"
    }
  },
  {
    label: "Left Bottom",
    id: "left-bottom",
    style: {
      bottom: "20%",
      left: "2%",
      transform: "rotate(-90deg)",
      transformOrigin: "left center"
    }
  },

  // RIGHT SIDE
  {
    label: "Right Top",
    id: "right-top",
    style: {
      top: "20%",
      right: "2%",
      transform: "rotate(90deg)",
      transformOrigin: "right center"
    }
  },
  {
    label: "Right Center",
    id: "right-center",
    style: {
      top: "50%",
      right: "0%",
      transform: "rotate(90deg) translateY(50%)",
      transformOrigin: "right center"
    }
  },
  {
    label: "Right Bottom",
    id: "right-bottom",
    style: {
      bottom: "20%",
      right: "2%",
      transform: "rotate(90deg)",
      transformOrigin: "right center"
    }
  },

  // BOTTOM
  {
    label: "Bottom Left",
    id: "bottom-left",
    style: { bottom: "0%", left: "8%", textAlign: "left" }
  },
  {
    label: "Bottom Center",
    id: "bottom-center",
    style: {
      bottom: "0%",
      left: "50%",
      transform: "translateX(-50%)"
    }
  },
  {
    label: "Bottom Right",
    id: "bottom-right",
    style: { bottom: "0%", right: "8%", textAlign: "right" }
  }
];
