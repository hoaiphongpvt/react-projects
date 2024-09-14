import { Form, redirect, useActionData, useNavigate, useNavigation } from "react-router-dom";
import { useState  } from "react";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import store from '../../store'
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlide";
import EmptyCart from '../cart/EmptyCart'
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const fomrErrors = useActionData()
  const { username, address, status, position, errors } = useSelector(state => state.user)
  const isLoading = status === 'loading'
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? (totalCartPrice * 20 / 100) : 0
  const totalPrice = totalCartPrice + priorityPrice
  const dispatch = useDispatch()

  if(!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label> 
          <div className="grow">
            <input className="input w-full" type="text" name="customer" required defaultValue={username}/>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {fomrErrors?.phone && <p className="text-xs bg-red-100 mt-2 text-red-600 p-2 rounded-md">{fomrErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full" type="text" name="address" required disabled={isLoading} defaultValue={address}/>
            {status === 'error' && <p className="text-xs bg-red-100 mt-2 text-red-600 p-2 rounded-md">{errors}</p>}
          </div>
          {!position.latitude && !position.longitude && <span className="absolute right-[3px] top-[34px] sm:right-[4px] sm:top-[2px]">
            <Button disabled={isLoading} type="small" onClick={(e) => {
              e.preventDefault()
              dispatch(fetchAddress())}}>
                Get Position
            </Button>
          </span>}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            className="h-6 w-5 accent-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}/> 
          <input type="hidden" name="position" value={ position.latitude && position.longitude ? `${position.latitude}, ${position.longitude}` : ''} />
          <Button type="primary" disabled={isSubmitting}>{isSubmitting ? "Placing order..." : `Order now from ${formatCurrency(totalPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true'
  }

  const errors = {}
  if(!isValidPhone(order.phone)) errors.phone = "Please give us your correct phone number! We need it to contact you."

  if(Object.keys(errors).length > 0) return errors

  const newOrder = await createOrder(order)

  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder;
