import Link from 'next/link';

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      <div className="container">
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>
          Welcome to the Digital Store
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1rem', opacity: 0.9 }}>
          Browse and buy amazing digital templates!
        </p>
        <Link href="/catalog" passHref>
          <button
            className="btn btn-lg mt-4"
            style={{
              backgroundColor: '#ffcc00',
              color: '#333',
              fontWeight: 'bold',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '50px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#ffdb4d')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#ffcc00')}
          >
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
}
