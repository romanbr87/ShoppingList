// pages/index.js
import { Container, Jumbotron, Button } from 'react-bootstrap';
import Link from 'next/link';

const Home = () => {
    return (
        <>
            <Container className="text-center mt-5">
                <div className="bg-light p-5 rounded-3">
                    <h1>ברוכים הבאים לרשימת הקניות שלכם! 🛍️</h1>
                    <p className="lead mt-3">
                        כאן תוכלו לנהל את רשימת הקניות שלכם בקלות.
                        <br />
                        עברו למצב עריכה כדי להוסיף, לערוך או למחוק פריטים,
                        או למצב צפייה כדי להציג את הרשימה הנוכחית.
                    </p>
                    <hr className="my-4" />
                    <Link href="/edit" passHref>
                        <Button variant="primary" size="lg">התחל עכשיו</Button>
                    </Link>
                </div>
            </Container>
        </>
    );
};

export default Home;