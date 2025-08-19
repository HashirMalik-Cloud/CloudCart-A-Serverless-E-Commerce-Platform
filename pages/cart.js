import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart } = useCart();

  async function handleCheckout() {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart })
    });

    const { url } = await res.json();
    window.location.href = url;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container py-5">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id}>
              {item.name} — {item.quantity} × ${item.price}
            </div>
          ))}
          <h2>Total: ${total.toFixed(2)}</h2>
          <button className="btn btn-success" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
