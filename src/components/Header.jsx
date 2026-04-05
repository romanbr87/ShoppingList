// components/Header.js
import { useState, useRef } from 'react'; 
import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';
// New Import
import AboutModal from './AboutModal'; 

const Header = () => {
    const [showAboutModal, setShowAboutModal] = useState(false);
    const collapseRef = useRef(null); 

    const handleShow = () => setShowAboutModal(true);
    const handleClose = () => setShowAboutModal(false);

    // Function to close the menu programmatically
    const closeMenu = () => {
        // Check if the menu is currently expanded (has the 'show' class)
        if (collapseRef.current && collapseRef.current.classList.contains('show')) {
            // Programmatically click the Navbar.Toggle button to collapse the menu
            const toggleButton = document.querySelector('.navbar-toggler');
            if (toggleButton) {
                toggleButton.click();
            }
        }
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                {/* Brand link to Home */}
                <Navbar.Brand as={Link} href="/" onClick={closeMenu}>
                    רשימת קניות 🛒
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {/* Attach the ref to Navbar.Collapse */}
                <Navbar.Collapse id="basic-navbar-nav" ref={collapseRef}> 
                    <Nav className="me-auto">
                        
                        {/* UNIFIED LIST PAGE LINK */}
                        <Nav.Link as={Link} href="/shoppinglistapp" onClick={closeMenu}>
                            ניהול רשימה 📝
                        </Nav.Link>
                        
                        {/* About Modal Link */}
                        <Nav.Link onClick={() => { handleShow(); closeMenu(); }}>
                            אודות
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>

            <AboutModal show={showAboutModal} handleClose={handleClose} />
        </Navbar>
    );
};

export default Header;