// components/AboutModal.jsx
import React from 'react';
import { Modal, Button, Badge, Row, Col } from 'react-bootstrap';
import { BsGithub, BsLinkedin, BsInfoCircle, BsLightningFill, BsCodeSlash } from 'react-icons/bs';

const AboutModal = ({ show, handleClose }) => {
    const linkedinUrl = "https://www.linkedin.com/posts/romanbr87_%D7%A9%D7%9E%D7%97-%D7%9C%D7%A9%D7%AA%D7%A3-%D7%90%D7%AA%D7%9B%D7%9D-%D7%91%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98-%D7%90%D7%99%D7%A9%D7%99-%D7%97%D7%93%D7%A9-%D7%A8%D7%A9%D7%99%D7%9E%D7%AA-%D7%A7%D7%A0%D7%99%D7%95%D7%AA-activity-7373769571679342592-ogMO?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAABHwsSkBr8jZHKmNEql6D7gYX8zhyS-FaT4";
    const githubUrl = "https://github.com/romanbr87/ShoppingList/";

    const techBadges = [
        { bg: "info", text: "React.js", darkText: true },
        { bg: "dark", text: "Next.js" },
        { bg: "primary", text: "React-Bootstrap" },
        { bg: "secondary", text: "React Icons" },
        { bg: "warning", text: "JavaScript (ES6+)", darkText: true },
    ];

    return (
        <Modal show={show} onHide={handleClose} centered dir="rtl" size="lg" scrollable>
            <Modal.Header closeButton className="bg-light py-2">
                <Modal.Title className="d-flex align-items-center fs-6 fs-md-5">
                    <BsInfoCircle className="ms-2 text-primary flex-shrink-0" />
                    אודות הפרויקט: רשימהלי (ShoppingList)
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-3">
                <section className="mb-3">
                    <h6 className="fw-bold border-bottom pb-1 mb-2">מהות האפליקציה</h6>
                    <p className="small mb-0">
                        <strong>רשימהלי</strong> היא אפליקציה מתקדמת לניהול רשימות קניות, שנועדה לייעל את תהליך הקניות היומיומי תוך דגש על נוחות ופשטות.
                    </p>
                </section>

                <section className="mb-3">
                    <h6 className="fw-bold border-bottom pb-1 mb-2"><BsLightningFill className="text-warning" /> יכולות המערכת ומאפייניה</h6>
                    <ul className="small list-unstyled mb-0 d-flex flex-column gap-2">
                        <li>✅ <strong>ניהול דו-מצבי:</strong> מעבר מהיר בין "מצב עריכה" ל"מצב צפייה" (סימון פריטים בלחיצה כפולה) לנוחות מקסימלית בזמן הקנייה.</li>
                        <li>✅ <strong>הוספה מרובה (Bulk Add):</strong> ממשק חכם להוספת רשימת מוצרים ארוכה בבת אחת, ללא צורך בהזנה פרטנית ומתישה.</li>
                        <li>✅ <strong>ארגון ויזואלי:</strong> סידור מחדש של הפריטים ברשימה בגרירה בדסקטופ.</li>
                        <li>✅ <strong>מיזוג נתונים חכם:</strong> אלגוריתם מובנה למניעת כפילויות ושמירה על רשימה מאורגנת בעת ייבוא או הוספת מוצרים.</li>
                        <li>✅ <strong>פירוט פריט:</strong> הגדרת שם ותיאור לכל מוצר בצורה גמישה, כולל אפשרות לעריכה מהירה ישירות ממצב הצפייה.</li>
                        <li>✅ <strong>סימון ומחיקה:</strong> אפשרות לסימון פריטים שנקנו באמצעות קו אמצעי או מחיקתם, למעקב מדויק אחר התקדמות הקנייה.</li>
                        <li>✅ <strong>עבודה עם קבצים:</strong> אפשרות לייצא ולייבא את הרשימה המלאה בפורמט JSON לגיבוי או העברה בין מכשירים.</li>
                    </ul>
                </section>

                <section className="mb-2">
                    <h6 className="fw-bold border-bottom pb-1 mb-2"><BsCodeSlash className="text-secondary" /> הטכנולוגיות</h6>
                    <Row className="g-2">
                        {techBadges.map((badge, index) => (
                            <Col xs={6} sm="auto" key={index}>
                                <Badge bg={badge.bg} text={badge.darkText ? "dark" : undefined} className="py-2 px-3 w-100 d-block text-center">
                                    {badge.text}
                                </Badge>
                            </Col>
                        ))}
                    </Row>
                </section>

                <hr className="my-3" />

                <div className="text-center">
                    <p className="small mb-2">
                        נוצר עם ☕ על ידי <strong>רומן ברברמן</strong>
                    </p>
                    <div className="d-grid d-sm-flex justify-content-sm-center gap-2">
                        <Button
                            variant="outline-primary"
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="d-flex align-items-center justify-content-center px-3 py-2 btn-sm"
                        >
                            <BsLinkedin className="ms-2" /> LinkedIn
                        </Button>

                        <Button
                            variant="outline-dark"
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="d-flex align-items-center justify-content-center px-3 py-2 btn-sm"
                        >
                            <BsGithub className="ms-2" /> GitHub
                        </Button>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer className="bg-light py-2">
                <Button variant="secondary" onClick={handleClose} className="w-100 w-sm-auto">
                    סגור
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AboutModal;