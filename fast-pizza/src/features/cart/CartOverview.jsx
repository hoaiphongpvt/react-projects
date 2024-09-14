import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlide";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {

  const totalCartQuantity = useSelector(getTotalCartQuantity)
  const totalCartPrice = useSelector(getTotalCartPrice)

  if (!totalCartQuantity) return null

  return (
    <div className="flex items-center justify-between gap-5 bg-stone-800 text-stone-200 uppercase py-4 px-4">
      <p className="font-semibold text-stone-300">
        <span>{totalCartQuantity} pizzas</span>
        <span className="ml-4">{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
