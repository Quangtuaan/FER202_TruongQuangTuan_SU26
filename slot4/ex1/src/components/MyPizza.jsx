import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyModal from './MyModal';

function MyPizza({ pizza }) {
    const [show, setShow] = useState(false);

    return (
        <div>
            <Container>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <Card style={{ width: '18rem' }}>
                            {/* Đã sửa Image thành imageSrc */}
                            <Card.Img variant="top" src={pizza.imageSrc} />
                            <Card.Body>
                                {/* Đã sửa Name thành name */}
                                <Card.Title>{pizza.name}</Card.Title>
                                <Card.Text>
                                    {/* Đã sửa Id, Description, OldPrice */}
                                    ID: {pizza.id} <br />
                                    Description: {pizza.description} <br />
                                    Old Price: <del>{pizza.oldPrice}</del> <br />
                                    New Price: <strong>{pizza.newPrice}</strong> <br />
                                    Tag: {pizza.tag}
                                </Card.Text>
                                <Button variant="primary" onClick={() => setShow(true)}>View Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <MyModal show={show} onHide={() => setShow(false)} pizza={pizza} />
        </div>
    );
}
export default MyPizza;