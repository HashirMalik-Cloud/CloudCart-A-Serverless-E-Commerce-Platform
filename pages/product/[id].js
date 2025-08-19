import { useState } from 'react';

export default function ProductPage({ product }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [
            { name: product.name, price: product.price, quantity: 1 },
          ],
        }),
      });

      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        alert(data.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error starting checkout:', error);
      alert('Unable to start checkout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      {/* Product Card */}
      <div className="row align-items-center g-5">
        {/* Image */}
        <div className="col-lg-6 text-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid shadow-lg rounded-4"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>

        {/* Details */}
        <div className="col-lg-6">
          <h1 className="fw-bold mb-3">{product.name}</h1>
          <p className="lead text-muted mb-4">
            Elevate your work with our premium template — fully editable and optimized for modern needs.
          </p>

          {/* Features */}
          <ul className="list-unstyled mb-4">
            <li>✔ Fully customizable & editable</li>
            <li>✔ High-resolution design</li>
            <li>✔ Instant digital download</li>
            <li>✔ Compatible with multiple platforms</li>
          </ul>

          {/* Price */}
          <h3 className="fw-bold mb-4" style={{ color: '#2563eb' }}>
            ${product.price.toFixed(2)}
          </h3>

          {/* Buy Button */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="btn btn-lg btn-primary px-5 py-3 rounded-pill"
            style={{
              fontWeight: 'bold',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
            }}
          >
            {loading ? 'Processing...' : 'Buy Now'}
          </button>
        </div>
      </div>

      {/* Page Styles */}
      <style jsx>{`
        .container {
          min-height: 80vh;
        }
        ul li {
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  // Product data mapping
  const products = {
    1: {
      id: 1,
      name: 'Art Template',
      price: 19.99,
      image: '/images/art-template.jpg',
    },
    2: {
      id: 2,
      name: 'Business Template',
      price: 29.99,
      image: '/images/business-template.jpg',
    },
    3: {
      id: 3,
      name: 'Marketing Template',
      price: 39.99,
      image: '/images/marketing-template.jpg',
    },
  };

  const product = products[id] || null;

  if (!product) {
    return { notFound: true };
  }

  return { props: { product } };
}
