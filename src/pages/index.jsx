import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

// The main App component containing all the calculator logic and UI.
const App = () => {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');

    // Handle changes to the textarea input.
    const handleInputChange = (event) => {
        setExpression(event.target.value);
        setResult('');
    };

    // Evaluate the JavaScript expression entered by the user.
    const evaluateExpression = () => {
        if (!expression.trim()) {
            setResult('Please enter an expression.');
            return;
        }

        try {
            // A safer way to evaluate a mathematical expression by using the Function constructor.
            const evalResult = new Function('return ' + expression)();
            if (typeof evalResult === 'number' || typeof evalResult === 'string') {
                setResult(evalResult);
            } else {
                setResult('Invalid expression.');
            }
        } catch (e) {
            setResult('Error: ' + e.message);
        }
    };

    // The main UI structure for the calculator using a single, self-contained React-Bootstrap file.
    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f2f5 0%, #e0e8f0 100%)' }} className="d-flex align-items-center justify-content-center p-4">
            <Card className="shadow-lg border-0 rounded-4" style={{ width: '100%', maxWidth: '600px' }}>
                <Card.Body className="p-4 p-md-5">
                    <h1 className="text-center fw-bold text-dark mb-4 mb-md-5">
                        JS Expression Calculator
                    </h1>

                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="text-muted fw-bold">
                                Enter your expression here:
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                id="expression-input"
                                rows="4"
                                value={expression}
                                onChange={handleInputChange}
                                className="rounded-3 border-2 p-3"
                                placeholder="e.g., (10 + 5) * 2 / 3"
                            />
                        </Form.Group>

                        <Button
                            onClick={evaluateExpression}
                            variant="primary"
                            className="w-100 py-3 fw-bold text-uppercase rounded-3 shadow-sm"
                        >
                            Calculate
                        </Button>
                    </Form>

                    {result && (
                        <Card className="mt-4 bg-light border-0 rounded-3">
                            <Card.Body className="p-3">
                                <h2 className="fw-bold mb-0 text-dark">Result:</h2>
                                <p className="mt-2 fs-4 fw-bold text-primary mb-0 text-break">
                                    {result}
                                </p>
                            </Card.Body>
                        </Card>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default App;
