// components/ShoppingList.js
import { Container, Row, Col } from 'react-bootstrap';
import ItemCard from './ItemCard';

const ShoppingList = ({ items }) => {
    return (
        <Container className="mt-4">
            <Row xs={1} md={2} lg={3} className="g-4">
                {Object.entries(items).map(([name, description]) => (
                    <Col key={name}>
                        <ItemCard name={name} description={description} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ShoppingList;