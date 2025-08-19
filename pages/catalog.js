import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Amplify } from "aws-amplify";
import { get } from "aws-amplify/api"; // ✅ Modular API import for Amplify v6+
import awsExports from "../aws-exports";

Amplify.configure(awsExports);

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const router = useRouter();

  const categories = ["All", "Art", "Business", "Marketing"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await get({ apiName: "productsApi", path: "/products" }).response;
        const data = await response.body.json();
        console.log("Fetched products:", data);
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  const handleViewProduct = (id) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="page-bg py-5">
      <div className="container">
        {/* Hero */}
        <div className="hero p-4 p-md-5 mb-5 text-center text-md-start">
          <h1 className="display-6 fw-bold mb-2 gradient-text">Product Catalog</h1>
          <p className="lead mb-0" style={{ color: "#374151" }}>
            Curated digital templates — pick a category and start exploring.
          </p>
        </div>

        {/* Filter */}
        <div className="d-flex align-items-center gap-3 flex-wrap mb-4 filter-box p-3">
          <label htmlFor="categoryFilter" className="form-label mb-0">
            Filter by category:
          </label>
          <select
            id="categoryFilter"
            className="form-select w-auto fancy-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        <div className="row g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-lift">
                  <div className="position-relative">
                    <img
                      src={product.thumbnail}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <span className="badge category-badge">{product.category}</span>
                    <span className="price-chip">${product.price?.toFixed(2)}</span>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-2">{product.name}</h5>
                    <p className="card-text text-muted small mb-3">
                      {product.description || "Premium, ready-to-use design asset."}
                    </p>
                    <button
                      className="btn btn-primary mt-auto w-100"
                      onClick={() => handleViewProduct(product.id)}
                    >
                      View Product
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No products found.</p>
          )}
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .page-bg {
          background: white; /* ✅ Restores white background */
          min-height: 100vh;
        }
        .hero {
          background: linear-gradient(135deg, rgba(106, 17, 203, 0.08), rgba(37, 117, 252, 0.08));
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 1.5rem;
        }
        .gradient-text {
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .filter-box {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 1rem;
        }
        .fancy-select {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          border-radius: 999px;
          padding: 0.5rem 1.25rem;
        }
        .card-img-top {
          height: 185px;
          object-fit: cover;
        }
        .hover-lift {
          transition: transform 220ms ease, box-shadow 220ms ease;
          background: #ffffff;
        }
        .hover-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 30px rgba(0, 0, 0, 0.1);
        }
        .category-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(255, 255, 255, 0.85);
          color: #111827;
          font-weight: 600;
          border-radius: 999px;
          padding: 0.35rem 0.65rem;
          font-size: 0.75rem;
          backdrop-filter: saturate(140%) blur(4px);
        }
        .price-chip {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: linear-gradient(135deg, #ffcc00, #ffd75a);
          color: #111827;
          font-weight: 700;
          border-radius: 999px;
          padding: 0.4rem 0.75rem;
          font-size: 0.85rem;
          box-shadow: 0 6px 16px rgba(255, 204, 0, 0.35);
        }
      `}</style>
    </div>
  );
}
