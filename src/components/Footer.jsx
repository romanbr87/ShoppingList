// components/Footer.js
import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Navbar expand="lg" variant="dark" bg="dark" className="mt-auto">
            <Container className="text-center py-2">
                <span className="text-white small">
                    © {currentYear} כל הזכויות שמורות.
                </span>
            </Container>
        </Navbar>
    );
};

export default Footer;