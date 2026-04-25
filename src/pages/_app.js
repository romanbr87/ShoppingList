// pages/_app.js
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '@/styles/globals.css'
import '@/styles/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({ Component, pageProps }) => {
    const title = "רשימהלי - ניהול רשימות קנייה בקלות";
    const description = "ניהול רשימת קניות פשוט ויעיל. צור, ערוך, ייבא וייצא רשימות קנייה. אפליקציה חינמית וקלה לשימוש לכל מטרה.";
    const imageUrl = "image.jpeg";
    const iconUrl = "icon.png"
    const websiteUrl = "https://shopping-list-beta-eosin.vercel.app/";
    const authorUrl = "https://www.linkedin.com/in/romanbr87/";
    const githubUrl = "https://github.com/romanbr87/"
    const facebookUrl = "https://www.facebook.com/ronenbr0/"
    const instagramUrl = "https://www.instagram.com/ronenbr60/"
    const twitterHandle = "@ronenbr60"; // עדכן לכינוי הטוויטר שלך
    const keywords = "רשימהלי, רשימת קניות, קניות, אפליקציית קניות, רשימת מכולת, ניהול קניות, רשימת קניות דיגיטלית, רשימה דיגיטלית, ייבוא רשימה, ייצוא רשימה, מיזוג רשימות, shopping list, shopping list Hebrew";

    return (
        <div className="d-flex flex-column min-vh-100">
            <Head>
                {/* General & Core SEO Tags */}
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content="Roman Braverman" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="google-site-verification" content="INZ1lPlJ4uJihxsPJiYcnm62efEwDySXzWSfo5iZfIQ" />

                {/* Robots & Crawling */}
                <meta name="robots" content="index, follow, noodp, noydir" />
                <meta name="googlebot" content="index, follow, noodp, noydir" />
                <meta name="bingbot" content="index, follow, noodp, noydir" />
                <meta name="google" content="notranslate" />

                {/* Canonical URL */}
                <link rel="canonical" href={websiteUrl} />
                <meta name="application-url" content={websiteUrl} />

                {/* Open Graph Tags (for Facebook, WhatsApp, etc.) */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={websiteUrl} />
                <meta property="og:image" content={websiteUrl + imageUrl} />
                <meta property="og:site_name" content="רשימהלי" />
                <meta property="og:locale" content="he_IL" />
                <meta property="og:image:alt" content="איור של רשימת קניות" />
                <meta property="og:image:width" content="1024" />
                <meta property="og:image:height" content="572" />
                <meta property="og:image:type" content="image/jpeg" />

                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={websiteUrl + imageUrl} />
                <meta name="twitter:url" content={websiteUrl} />
                <meta name="twitter:site" content={twitterHandle} />
                <meta name="twitter:creator" content={twitterHandle} />

                {/* Mobile SEO & PWA */}
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="theme-color" content="#FFFFFF" />
                <link rel="manifest" href="/manifest.json" />

                {/* Icons & Favicons */}
                <link rel="icon" type="image/png" sizes="512x512" href="/icon.png" />
                <link rel="shortcut icon" type="image/png" sizes="512x512" href="/icon.png" />
                <link rel="apple-touch-icon" type="image/png" sizes="512x512" href="/icon.png" />
                <link id="favicon" rel="shortcut icon" type="image/png" sizes="512x512" href={websiteUrl + iconUrl} />

                {/* Structured Data (JSON-LD) */}
                <script type="application/ld+json">
                    {`
                        {
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "name": "${title}",
                            "url": "${websiteUrl}"
                        }
                    `}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": title,
                        "url": websiteUrl,
                        "sameAs": [
                            authorUrl,
                            githubUrl,
                            facebookUrl,
                            instagramUrl,
                            twitterHandle ? `https://twitter.com/${twitterHandle.replace('@', '')}` : ''
                        ].filter(url => Boolean(url) && url.trim() !== "")
                    })}
                </script>
            </Head>
            <Header />
            <main className="flex-grow-1">
                <Component {...pageProps} />
            </main>
            <Footer />
        </div>
    );
};

export default App;