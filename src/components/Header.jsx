// components/Header.js
import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} href="/">
                    רשימת קניות 🛒
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} href="/edit">
                            מצב עריכה ✍️
                        </Nav.Link>
                        <Nav.Link as={Link} href="/view">
                            מצב צפייה 👀
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;