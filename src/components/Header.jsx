// components/Header.js
import { useState } from 'react';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import Link from 'next/link';

const Header = () => {
    const [showAboutModal, setShowAboutModal] = useState(false);

    const handleShow = () => setShowAboutModal(true);
    const handleClose = () => setShowAboutModal(false);

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
                        <Nav.Link onClick={handleShow}>
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