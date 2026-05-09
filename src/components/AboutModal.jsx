// components/AboutModal.jsx
import React from 'react';
import { Modal, Button, Badge, Row, Col } from 'react-bootstrap'; // ייבוא Row ו-Col
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
        <Modal show={show} onHide={handleClose} centered dir="rtl" size="lg">
            <Modal.Header closeButton className="bg-light py-2">
                <Modal.Title className="d-flex align-items-center fs-5">
                    <BsInfoCircle className="ms-2 text-primary" />
                    אודות הפרויקט: רשימהלי (ShoppingList)
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-2">
                {/* פעימה ראשונה */}
                <section className="mb-4">
                    <h6 className="fw-bold border-bottom pb-1 mb-1">מהות האפליקציה</h6>
                    <p className="small mb-0">
                        <strong>רשימהלי</strong> היא אפליקציה מתקדמת לניהול רשימות קניות, שנועדה לייעל את תהליך הקניות היומיומי תוך דגש על נוחות ופשטות.
                    </p>
                </section>

                {/* פעימה שנייה */}
                <section className="mb-2">
                    <h6 className="fw-bold border-bottom pb-1 mb-1"><BsLightningFill className="text-warning" /> יכולות המערכת ומאפייניה</h6>
                    <ul className="small mt-1" style={{ listStyleType: 'none', padding: 0 }}>
                        <li className="mb-1">✅ <strong>ניהול דו-מצבי:</strong> מעבר מהיר בין "מצב עריכה" ל"מצב צפייה" (סימון פריטים ב-Double Click) לנוחות מקסימלית בזמן הקנייה.</li>
                        <li className="mb-1">✅ <strong>הוספה מרובה (Bulk Add):</strong> ממשק חכם להוספת רשימת מוצרים ארוכה בבת אחת, ללא צורך בהזנה פרטנית ומתישה.</li>
                        <li className="mb-1">✅ <strong>ארגון ויזואלי (Drag & Drop):</strong> סידור מחדש של הפריטים ברשימה בגרירה פשוטה, כדי להתאים את הרשימה למסלול ההליכה בחנות.</li>
                        <li className="mb-1">✅ <strong>מיזוג נתונים חכם:</strong> אלגוריתם מובנה למניעת כפילויות ושמירה על רשימה מאורגנת בעת ייבוא או הוספת מוצרים.</li>
                        <li className="mb-1">✅ <strong>פירוט פריט:</strong> הגדרת שם ותיאור לכל מוצר בצורה גמישה, כולל אפשרות לעריכה מהירה ישירות ממצב הצפייה.</li>
                        <li className="mb-1">✅ <strong>סימון ומחיקה:</strong> אפשרות לסימון פריטים שנקנו באמצעות קו אמצעי או מחיקתם, למעקב מדויק אחר התקדמות הקנייה.</li>
                        <li className="mb-1">✅ <strong>עבודה עם קבצים:</strong> אפשרות לייצא ולייבא את הרשימה המלאה בפורמט JSON לגיבוי או העברה בין מכשירים.</li>
                    </ul>
                </section>
                
                {/* פעימה שלישית - טכנולוגיה, מותאמת למובייל */}
                <section className="mb-2">
                    <h6 className="fw-bold border-bottom pb-1 mb-1"><BsCodeSlash className="text-secondary" /> הטכנולוגיה</h6>
                    
                    {/* תצוגת דסקטופ/טאבלט (wrap כרגיל) */}
                    <div className="d-md-flex d-none flex-md-wrap gap-1 mt-1">
                        {techBadges.map((badge, index) => (
                            <Badge key={index} bg={badge.bg} text={badge.darkText ? "dark" : undefined} className="py-1">
                                {badge.text}
                            </Badge>
                        ))}
                    </div>

                    {/* תצוגת מובייל (אחד מתחת לשני, full width) */}
                    <Row className="d-md-none gap-1 mt-1" xs={12}>
                        {techBadges.map((badge, index) => (
                            <Col key={index}>
                                <Badge bg={badge.bg} text={badge.darkText ? "dark" : undefined} className="py-1 w-100 d-block text-center">
                                    {badge.text}
                                </Badge>
                            </Col>
                        ))}
                    </Row>
                </section>

                <hr className="my-2" />

                <div className="text-center">
                    <p className="small mb-2">
                        נוצר עם ☕ על ידי <strong>רומן ברברמן</strong>
                    </p>
                    <div className="d-flex justify-content-center gap-2">
                        <Button
                            variant="outline-primary"
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="d-flex align-items-center px-3 py-1 btn-sm"
                        >
                            <BsLinkedin className="ms-2" /> LinkedIn
                        </Button>

                        <Button
                            variant="outline-dark"
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="d-flex align-items-center px-3 py-1 btn-sm"
                        >
                            <BsGithub className="ms-2" /> GitHub
                        </Button>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer className="bg-light py-1">
                <Button variant="secondary" size="sm" onClick={handleClose}>
                    סגור
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AboutModal;