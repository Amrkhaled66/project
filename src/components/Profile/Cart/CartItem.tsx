import priceFormatter from "src/utils/priceFormmater";

type CartItemProps = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const CartItem = ({ id, name, price, quantity }: CartItemProps) => {
  return (
    <div className="flex items-center justify-between border-b border-b-gray-400 pb-1">
      <div className="flex w-full items-center">
        <div className="size-20 overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src="/placeholder.png"
            alt={name}
          />
        </div>

        <div className="flex w-full flex-col ml-4">
          <div className="flex w-full justify-between text-lg">
            <p>{name}</p>
            <p>{priceFormatter(price)}</p>
          </div>
          <p className="font-extralight">Quantity: {quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
