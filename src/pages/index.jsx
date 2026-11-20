import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import Link from 'next/link';
import { BsListCheck, BsCloudArrowUp, BsFiles, BsPhone } from 'react-icons/bs';

const Home = () => {
    return (
        <Container className="py-4 py-md-5 px-3" dir="rtl">
            <div className="bg-light p-4 p-md-5 rounded-4 text-center shadow-sm mb-4 mb-md-5">
                <h1 className="display-5 display-md-4 fw-bold text-primary">רשימהלי 🛒</h1>
                <p className="lead fs-6 fs-md-4 mt-3">
                    הדרך הפשוטה והחכמה ביותר לנהל את הקניות שלכם.
                    <br className="d-none d-md-block" />
                    בלי הרשמה, בלי סיבוכים - פשוט יוצרים ויוצאים לדרך.
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-4">
                    <Button as={Link} href="/ShoppingListPage" variant="primary" size="lg" className="px-5 shadow-sm py-3 py-md-2">
                        התחל עכשיו
                    </Button>
                </div>
            </div>

            <h3 className="text-center mb-3 mb-md-4 fw-bold fs-4">מה אפשר לעשות כאן?</h3>
            <Row className="g-3 g-md-4">
                <Col xs={12} sm={6} lg={3}>
                    <Card className="h-100 border-0 shadow-sm text-center p-2 p-md-3">
                        <Card.Body>
                            <div className="mb-3 text-primary">
                                <BsListCheck size={36} />
                            </div>
                            <Card.Title className="fw-bold fs-5">ניהול מהיר</Card.Title>
                            <Card.Text className="small text-muted">
                                הוספת מוצרים בבת אחת, עריכה קלה וסימון פריטים שנרכשו בלחיצה.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} lg={3}>
                    <Card className="h-100 border-0 shadow-sm text-center p-2 p-md-3">
                        <Card.Body>
                            <div className="mb-3 text-success">
                                <BsCloudArrowUp size={36} />
                            </div>
                            <Card.Title className="fw-bold fs-5">גיבוי מקומי</Card.Title>
                            <Card.Text className="small text-muted">
                                ייצוא הרשימה לקובץ JSON ושמירה בטלפון או במחשב לשימוש חוזר.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} lg={3}>
                    <Card className="h-100 border-0 shadow-sm text-center p-2 p-md-3">
                        <Card.Body>
                            <div className="mb-3 text-info">
                                <BsFiles size={36} />
                            </div>
                            <Card.Title className="fw-bold fs-5">מיזוג רשימות</Card.Title>
                            <Card.Text className="small text-muted">
                                יש לכם רשימה ישנה? ניתן למזג אותה עם הרשימה הנוכחית ללא כפילויות.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} lg={3}>
                    <Card className="h-100 border-0 shadow-sm text-center p-2 p-md-3">
                        <Card.Body>
                            <div className="mb-3 text-warning">
                                <BsPhone size={36} />
                            </div>
                            <Card.Title className="fw-bold fs-5">מותאם למובייל</Card.Title>
                            <Card.Text className="small text-muted">
                                חוויית שימוש חלקה בסופרמרקט ישירות מהדפדפן בטלפון הנייד.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <div className="mt-4 mt-md-5">
                <h4 className="fw-bold mb-3 text-center text-md-end px-1 fs-5">
                    איך זה עובד?
                </h4>

                <div className="p-3 p-md-4 border-0 rounded-4 bg-white shadow-sm">
                    <ul className="list-unstyled mb-0 p-0 d-flex flex-column gap-3">
                        <li className="d-flex align-items-start gap-3">
                            <span className="badge rounded-circle bg-light text-dark border p-2 flex-shrink-0">1</span>
                            <span>נכנסים לדף <strong>"ניהול רשימה"</strong>.</span>
                        </li>
                        <li className="d-flex align-items-start gap-3">
                            <span className="badge rounded-circle bg-light text-dark border p-2 flex-shrink-0">2</span>
                            <span>מוסיפים מוצרים ידנית או מייבאים קובץ קיים.</span>
                        </li>
                        <li className="d-flex align-items-start gap-3">
                            <span className="badge rounded-circle bg-light text-dark border p-2 flex-shrink-0">3</span>
                            <span>בזמן הקניות, עוברים ל<strong>"מצב צפייה"</strong> ומסמנים פריטים בלחיצה כפולה.</span>
                        </li>
                        <li className="d-flex align-items-start gap-3">
                            <span className="badge rounded-circle bg-light text-dark border p-2 flex-shrink-0">4</span>
                            <span>בסיום, ניתן לייצא את הרשימה המעודכנת לעתיד.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </Container>
    );
};

export default Home;