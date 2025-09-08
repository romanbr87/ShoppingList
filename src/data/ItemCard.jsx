// components/ItemCard.js
import { Card } from 'react-bootstrap';

const ItemCard = ({ name, description }) => {
    return (
        <Card className="h-100 shadow-sm">
            <Card.Body>
                <Card.Title className="text-primary">{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ItemCard;