import { useCart } from "src/context/cart.context";
const Corners = () => {
  const {
    cartItem: { upgrades, cornerImage },
  } = useCart();

  const corners = [
    "absolute top-0 left-0",
    "absolute top-0 right-0",
    "absolute right-0 bottom-0 ",
    "absolute bottom-0 left-0",
    "absolute top-1/2 right-0 -translate-y-1/2",
    "absolute top-1/2 left-0 -translate-y-1/2 ",
    "absolute top-0 left-1/2 -translate-x-1/2 ",
    "absolute bottom-0 left-1/2  -translate-x-1/2 ",
  ];

  const isDouble = upgrades?.some((u) => u.id === "cornerstonesDouble");
  const cornersToRender = isDouble ? corners : corners.slice(0, 4);

  return (
    <>
      {cornersToRender.map((position, index) => (
        <img
          className={`size-5 ${position}`}
          key={index}
          src={cornerImage||""}
        />
      ))}
    </>
  );
};

export default Corners;
