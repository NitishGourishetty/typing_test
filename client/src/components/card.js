import Card from 'react-bootstrap/Card';
import './card.css'
import 'bootstrap/dist/css/bootstrap.css';

function CardBody(props) {
  return (
    <Card className = "card">
      <Card.Body>{props.children}</Card.Body>
    </Card>
  );
}

export default CardBody;