import MyPizza from "./MyPizza";
import { pizzaData } from "../data/pizzaData";
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function PizzaList() {
    return (
        <div>
            <Container style={{marginTop: '20px'}} md ={4}>
                <Row>
                    {pizzaData.map((pizzaItem) => (
                        <Col key={pizzaItem.Id} xs={12} sm={6} md={4} lg={3}>
                            <MyPizza pizza={pizzaItem} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
export default PizzaList;