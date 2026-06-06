import MainDashButton from "src/components/ui/MainDashButton";
import priceFormmater from "src/utils/priceFormmater";

type DesignViewerFooterProps = {
  price: number;
  inCart: boolean;
  onAddToCart: () => void;
};

const DesignViewerFooter = ({
  price,
  inCart,
  onAddToCart,
}: DesignViewerFooterProps) => {
  return (
    <div className="mt-3 lg:w-[40%] ms-auto flex h-fit flex-col items-center justify-between gap-4 rounded-[18px] border border-[color:rgba(0,32,81,0.08)] bg-white px-6 py-4 shadow-[0_8px_20px_rgba(0,32,81,0.06)] sm:flex-row">
      <div className="flex flex-row items-center gap-2">
        <span className="text-subTitle tracking-wider uppercase">Total:</span>
        <span className="font-bold">{priceFormmater(price)}</span>
      </div>

      <MainDashButton
        disabled={inCart}
        text={inCart ? "Added" : "Commission Build"}
        className="!h-fit !rounded-full px-3"
        onClick={onAddToCart}
      />
    </div>
  );
};

export default DesignViewerFooter;
