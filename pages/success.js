import Link from 'next/link';

export default function Success() {
  return (
    <div className="container text-center py-5">
      {/* Success Icon */}
      <div className="mb-4">
        <span
          style={{
            fontSize: '4rem',
            color: '#16a34a',
          }}
        >
          ✅
        </span>
      </div>

      {/* Heading */}
      <h1 className="fw-bold mb-3">Payment Successful!</h1>
      <p className="lead text-muted mb-4">
        Thank you for your purchase. Your download is now available in your
        account.
      </p>

      {/* Back Button */}
      <Link href="/catalog" passHref>
        <button className="btn btn-lg btn-primary rounded-pill px-4">
          Browse More Templates
        </button>
      </Link>

      {/* Styles */}
      <style jsx>{`
        .container {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
