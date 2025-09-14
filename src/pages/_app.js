// pages/_app.js
import '@/styles/style.css'
import "@/styles/well.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function App({ Component, pageProps }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}