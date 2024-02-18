import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import "../App";
import axios from "axios";
import Navbarr from "../Components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


const BalanceHistoryForm = (props) => {
    const [data, setData] = useState([]);
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await axios.get(
                `https://soukphasone.onrender.com/orders?dateFrom=${dateFrom}&dateTo=${dateTo}`
            );
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [dateFrom, dateTo]);
    const Cashtotal = () => {
        return data
            .filter((item) => item.money === "cash")
            .reduce((total, item) => (total += item.amount), 0);
    };
    const Tranfertotal = () => {
        return data
            .filter((item) => item.money === "transfer")
            .reduce((total, item) => (total += item.amount), 0);
    };

    const h1 = { color: "white", marginTop: "15px" };
    return (
        <>
            <Navbarr />
            <Container
                className="con-balance"
                style={{ backgroundColor: "cadetblue", borderRadius: "20px 20px 0 0" }}
            >
                <Row>
                    <Col>
                        <h1 style={h1}>ປະຫວັດຍອດເງິນ</h1>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col md={5} xs={5} style={{ padding: "0px 0px 0px 12px" }}>
                        <Form>
                            <Form.Group>
                                <Form.Control type="date" onChange={(e) => setDateFrom(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md={2} xs={2} style={{ padding: "0px" }}><FontAwesomeIcon icon={faArrowRight} size="2xl" style={{ width: "100%", color: 'white' }} /></Col>

                    <Col md={5} xs={5} style={{ padding: "0px 12px 0px 0px" }}>
                        <Form>
                            <Form.Group>
                                <Form.Control type="date" onChange={(e) => setDateTo(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col xs={4} md={4} className="justify-content-center">
                        <Card>
                            <Card.Body>
                                <Card.Title>ເງິນໂອນ</Card.Title>
                                <Card.Text>{Tranfertotal()}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={4} md={4} className="justify-content-center">
                        <Card>
                            <Card.Body>
                                <Card.Title>ເງິນສົດ</Card.Title>
                                <Card.Text>{Cashtotal()}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={4} md={4} className="justify-content-center">
                        <Card>
                            <Card.Body>
                                <Card.Title> ລວມຍອດ</Card.Title>
                                <Card.Text>{Tranfertotal() + Cashtotal()}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default BalanceHistoryForm;
