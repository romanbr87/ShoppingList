// components/Header.js
import { useState, useRef } from 'react'; // Import useRef
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import Link from 'next/link';

const Header = () => {
    const [showAboutModal, setShowAboutModal] = useState(false);
    // 1. Create a ref for the Navbar.Collapse
    const collapseRef = useRef(null); 

    const handleShow = () => setShowAboutModal(true);
    const handleClose = () => setShowAboutModal(false);

    // 2. Function to close the menu programmatically
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
                {/* 3. Call closeMenu when the Brand is clicked */}
                <Navbar.Brand as={Link} href="/" onClick={closeMenu}>
                    רשימת קניות 🛒
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {/* 4. Attach the ref to Navbar.Collapse */}
                <Navbar.Collapse id="basic-navbar-nav" ref={collapseRef}> 
                    <Nav className="me-auto">
                        {/* 5. Call closeMenu when Nav.Links are clicked */}
                        <Nav.Link as={Link} href="/edit" onClick={closeMenu}>
                            מצב עריכה ✍️
                        </Nav.Link>
                        <Nav.Link as={Link} href="/view" onClick={closeMenu}>
                            מצב צפייה 👀
                        </Nav.Link>
                        {/* 6. Call handleShow, and then closeMenu */}
                        <Nav.Link onClick={() => { handleShow(); closeMenu(); }}>
                            אודות
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>

            <Modal show={showAboutModal} onHide={handleClose} centered dir="rtl">
                <Modal.Header closeButton>
                    <Modal.Title>אודות האפליקציה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        אפליקציה זו פותחה כפרויקט אישי, המאפשר לנהל רשימות קניות בצורה פשוטה ויעילה.
                    </p>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                        <li>- בניית רשימת קניות דיגיטלית</li>
                        <li>- ייבוא וייצוא רשימות בפורמט JSON</li>
                        <li>- מיזוג חכם של רשימות קיימות</li>
                        <li>- שינוי סדר פריטים באמצעות גרירה ושינוי גודל</li>
                        <li>- סימון פריטים שנקנו בלחיצה כפולה</li>
                    </ul>
                    <hr />
                    <p className="text-muted small">פותח ע"י רומן ברמן</p>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-start">
                    <Button variant="secondary" onClick={handleClose}>
                        סגור
                    </Button>
                </Modal.Footer>
            </Modal>
        </Navbar>
    );
};

export default Header;