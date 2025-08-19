// /pages/my-purchases.js
import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa"; // npm install react-icons

export default function MyPurchasesPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_PURCHASES =
    "https://rzstnrgpeb.execute-api.us-east-1.amazonaws.com/dev/mypurchases";
  const API_DOWNLOAD =
    "https://rzstnrgpeb.execute-api.us-east-1.amazonaws.com/dev/download";

  const TEST_USER_ID = "test-user-1"; // Replace with actual auth user ID

  useEffect(() => {
    async function fetchPurchases() {
      try {
        const res = await fetch(`${API_PURCHASES}?userId=${TEST_USER_ID}`);
        const data = await res.json();

        console.log("✅ Purchases API response:", data); // DEBUG

        // Ensure defaults for missing fields
        const normalized = (data.items || []).map((p) => ({
          ...p,
          status: p.status || "delivered", // default to delivered
          s3Key: p.s3Key || "art-template.jpg", // default test key
        }));

        setPurchases(normalized);
      } catch (err) {
        console.error("❌ Error fetching purchases:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPurchases();
  }, []);

  async function handleDownload(s3Key) {
    try {
      const res = await fetch(API_DOWNLOAD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ s3Key }),
      });

      if (!res.ok) throw new Error("Failed to get download link");

      const { downloadUrl } = await res.json();

      if (downloadUrl) {
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = s3Key.split("/").pop(); // Extract filename
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (err) {
      console.error("❌ Download failed:", err);
      alert("Could not download file. Please try again later.");
    }
  }

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <h1 className="mb-4 fw-bold text-primary">My Purchases</h1>

        {loading ? (
          <p className="text-muted">Loading your purchases...</p>
        ) : purchases.length === 0 ? (
          <div className="alert alert-info shadow-sm rounded-4">
            You have no purchases yet.
          </div>
        ) : (
          <div className="row g-4">
            {purchases.map((purchase) => {
              const status = purchase.status.toLowerCase();

              return (
                <div
                  key={purchase.purchaseId}
                  className="col-12 col-md-6 col-lg-4"
                >
                  <div className="card shadow-sm border-0 rounded-4 overflow-hidden h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="fw-bold">{purchase.itemName}</h5>
                      <p className="text-muted small mb-2">
                        Purchased on:{" "}
                        {new Date(purchase.purchaseDate).toLocaleDateString()}
                      </p>
                      <p className="fw-bold text-success">
                        ${purchase.price?.toFixed(2)}
                      </p>

                      {/* ✅ If delivered → show message + download */}
                      {status === "delivered" && purchase.s3Key ? (
                        <div className="mt-auto">
                          <p className="text-success fw-semibold mb-2">
                            ✅ You’ve purchased this item. Download below:
                          </p>
                          <button
                            onClick={() => handleDownload(purchase.s3Key)}
                            className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                          >
                            <FaDownload />
                            Download
                          </button>
                        </div>
                      ) : (
                        <span className="badge rounded-pill bg-secondary">
                          {purchase.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
