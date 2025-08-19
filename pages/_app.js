// pages/_app.js
import { CartProvider } from '../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';

// ✅ Configure Amplify WITHOUT ssr: true
Amplify.configure(awsExports);

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
