import { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AboutModal from './AboutModal';

export default function Header() {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { pathname } = useRouter();

  const closeMenu = () => setExpanded(false);

  const openAboutModal = () => {
    setShowAboutModal(true);
    closeMenu();
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      dir="rtl"
      expanded={expanded}
      onToggle={setExpanded}
      className="shadow-sm py-2"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          href="/"
          onClick={closeMenu}
          className="fw-bold fs-4 d-flex align-items-center gap-2 ms-4"
        >
          <span
            aria-hidden="true"
            className="bg-white bg-opacity-10 p-2 rounded-circle fs-5 lh-1"
          >
            🛒
          </span>
          <span>רשימהלי</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-navbar-nav"
          aria-label="תפריט ניווט"
          className="border-0 shadow-none"
        />

        <Navbar.Collapse id="main-navbar-nav">
          {/* ms-auto aligns items to the right (start) in RTL */}
          <Nav className="ms-auto my-2 my-lg-0 gap-2 align-items-stretch align-items-lg-center text-end">
            <Nav.Link
              as={Link}
              href="/ShoppingListPage"
              onClick={closeMenu}
              active={pathname === '/ShoppingListPage'}
              className={`px-3 py-2 rounded-pill fw-semibold d-flex align-items-center justify-content-start gap-2 ${
                pathname === '/ShoppingListPage'
                  ? 'bg-primary text-white'
                  : 'text-light'
              }`}
            >
              <span aria-hidden="true">📝</span>
              <span>ניהול רשימה</span>
            </Nav.Link>

            <Button
              variant="outline-light"
              onClick={openAboutModal}
              className="rounded-pill px-3 py-2 fw-semibold border-0 text-end text-lg-center"
            >
              אודות
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <AboutModal show={showAboutModal} handleClose={() => setShowAboutModal(false)} />
    </Navbar>
  );
}