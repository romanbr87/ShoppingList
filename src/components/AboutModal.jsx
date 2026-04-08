// components/AboutModal.jsx
import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';
import { BsGithub, BsLinkedin, BsInfoCircle, BsLightningFill, BsCodeSlash } from 'react-icons/bs'; 

const AboutModal = ({ show, handleClose }) => {
    const linkedinUrl = "https://www.linkedin.com/posts/romanbr87_%D7%A9%D7%9E%D7%97-%D7%9C%D7%A9%D7%AA%D7%A3-%D7%90%D7%AA%D7%9B%D7%9D-%D7%91%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98-%D7%90%D7%99%D7%A9%D7%99-%D7%97%D7%93%D7%A9-%D7%A8%D7%A9%D7%99%D7%9E%D7%AA-%D7%A7%D7%A0%D7%99%D7%95%D7%AA-activity-7373769571679342592-ogMO?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAABHwsSkBr8jZHKmNEql6D7gYX8zhyS-FaT4";
    const githubUrl = "https://github.com/romanbr87/ShoppingList/";

    return (
        <Modal show={show} onHide={handleClose} centered dir="rtl" size="lg">
            <Modal.Header closeButton className="bg-light">
                <Modal.Title className="d-flex align-items-center">
                    <BsInfoCircle className="me-2 text-primary" />
                    אודות הפרויקט: רשימהלי (ShoppingList)
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <section className="mb-4">
                    <h5 className="fw-bold border-bottom pb-2">מהות האפליקציה</h5>
                    <p>
                        <strong>רשימהלי</strong> פותחה כפרויקט אישי במטרה לספק פתרון טכנולוגי פשוט, מהיר ונגיש לניהול רשימות קניות. 
                        הדגש בפיתוח הושם על חווית משתמש חלקה, המאפשרת מעבר בין מצבי תצוגה שונים וניהול נתונים חכם.
                    </p>
                </section>

                <section className="mb-4">
                    <h5 className="fw-bold border-bottom pb-2"><BsLightningFill className="text-warning" /> פיצ'רים מרכזיים</h5>
                    <ul className="small mt-2" style={{ listStyleType: 'none', padding: 0 }}>
                        <li className="mb-2">✅ <strong>ניהול דו-מצבי:</strong> מעבר בין "מצב עריכה" ל"מצב צפייה" (סימון פריטים ב-Double Click).</li>
                        <li className="mb-2">✅ <strong>מיזוג נתונים חכם:</strong> אלגוריתם למניעת כפילויות בעת ייבוא או הוספת מוצרים.</li>
                        <li className="mb-2">✅ <strong>גרור ושחרר (Drag & Drop):</strong> סידור מחדש של הפריטים ברשימה.</li>
                        <li className="mb-2">✅ <strong>עבודה עם קבצים:</strong> ייצוא וייבוא מלא של הרשימה בפורמט JSON.</li>
                        <li className="mb-2">✅ <strong>הוספה מרובה:</strong> ממשק להוספת רשימת מוצרים ארוכה בבת אחת (Bulk Add).</li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h5 className="fw-bold border-bottom pb-2"><BsCodeSlash className="text-secondary" /> טכנולוגיות בשימוש</h5>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                        <Badge bg="info" text="dark">React.js</Badge>
                        <Badge bg="dark">Next.js</Badge>
                        <Badge bg="primary">React-Bootstrap</Badge>
                        <Badge bg="secondary">React Icons</Badge>
                        <Badge bg="warning" text="dark">JavaScript (ES6+)</Badge>
                        <Badge bg="light" text="dark" className="border">JSON Data Handling</Badge>
                    </div>
                </section>

                <hr />
                
                <div className="text-center py-2">
                    <p className="mb-3">
                        נוצר עם ☕ על ידי <strong>רומן ברמן</strong>
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <Button 
                            variant="outline-primary" 
                            href={linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="d-flex align-items-center px-4"
                        >
                            <BsLinkedin className="ms-2" /> LinkedIn
                        </Button>
                        
                        <Button 
                            variant="outline-dark" 
                            href={githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="d-flex align-items-center px-4"
                        >
                            <BsGithub className="ms-2" /> GitHub
                        </Button>
                    </div>
                </div>
            </Modal.Body>
            
            <Modal.Footer className="bg-light py-2"> 
                <Button variant="secondary" size="sm" onClick={handleClose}>
                    סגור
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AboutModal;