
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Card, InputGroup, Pagination } from 'react-bootstrap';
import moment from 'moment';
import '../App';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Navbarr from '../Components/Navbar';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { da } from 'date-fns/locale';

function CarHistory() {
    const [data, setData] = useState([])
    const [note, setNote] = useState('')
    const [sign, setSign] = useState('')
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);





    const h1 = { color: "white", marginTop: '15px' }

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        fetchData()

    }, [])

    async function fetchData() {
        try {
            const response = await axios.get(`https://soukphasone.onrender.com/orders?sign=${sign}&note=${note}&dateFrom=${dateFrom}&dateTo=${dateTo}&status=OFFLINE`)
            setData(response.data)
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [sign, dateFrom, dateTo])
    const userId = localStorage.getItem('user_id').replace(/^"(.*)"$/, '$1');
    const countCar= () => {
        return data.filter((item) => item.userId === userId && item.carType === "ລົດໃຫຍ່").length;
    };
    
    const countBike = () => {
        return data.filter((item) => item.userId === userId && item.carType === "ລົດຈັກ").length;
    };
    
    const countCycle = () => {
        return data.filter((item) => item.userId === userId && item.carType === "ລົດຖີບ").length;
    };
    
console.log("data", data)
    return (
        <>
            <Navbarr />
            <Container style={{ backgroundColor: "cadetblue", borderRadius: "20px 20px 0 0" }}>
                <Row>
                    <Col>
                        <h1 style={h1}>ປະຫວັດລົດເຂົ້າ-ອອກ</h1>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Form >
                        <Row >
                            <Col xs={5} md={4} className='mb-2' style={{ paddingRight: "0px", }}>
                                <Form.Group >
                                    <Form.Control type="date" id="date-picker" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className='mb-2' />
                                </Form.Group>
                            </Col>
                            <Col style={{ paddingRight: "0px", paddingLeft: '0px' }} ><FontAwesomeIcon icon={faArrowRight} size="2xl" style={{ width: "100%", color: 'white' }} /></Col>
                            <Col xs={5} md={4} style={{ paddingLeft: "0px" }}>
                                <Form.Group >
                                    <Form.Control type="date" id="date-picker" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className='mb-2' />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={3} >
                                <Form.Group >
                                    <InputGroup>
                                        <InputGroup.Text id="basic-addon1" style={{ backgroundColor: "white" }}><FontAwesomeIcon icon={faMagnifyingGlass} className='' /></InputGroup.Text>
                                        <Form.Control type="text" onChange={(e) => setSign(e.target.value)} placeholder='ຄົ້ນຫາທະບຽນ/ກົງເຕີ' />
                                    </InputGroup> {/* <Button variant="primary" type="submit" onClick={''} style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }} >ຄົ້ນຫາ</Button> */}
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <br></br>
                <Row style={{ marginTop: "-15px" }}>
                    <Col xs={6} md={3} className="justify-content-center mb-2"  >
                        <Card className=''>
                            <Card.Body style={{ textAlign: "center", }}>
                                <Card.Title>ຈຳນວນລົດຖີບ :</Card.Title>
                                <Card.Text>{countCycle()}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={3} >
                        <Card className=''  >
                            <Card.Body style={{ textAlign: "center" }}>
                                <Card.Title>ຈຳນວນລົດຈັກ :</Card.Title>
                                <Card.Text>{countBike()}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={3} >
                        <Card className=''>
                            <Card.Body style={{ textAlign: "center" }}>
                                <Card.Title  > ຈຳນວນລົດໃຫຍ່ :</Card.Title>
                                <Card.Text>{countCar()}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={3} >
                        <Card className=''>
                            <Card.Body style={{ textAlign: "center" }}>
                                <Card.Title  > ຈຳນວນທັງໝົດ :</Card.Title>
                                <Card.Text>{countCar() + countBike() + countCycle()}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ທະບຽນ/ເລກກົງເຕີ</th>
                                    <th>ປະເພດ</th>
                                    <th>ລາຄາ</th>
                                    <th>ປະເພດສຳລະ</th>
                                    <th>ຫມາຍເຫດ</th>
                                    <th>ເວລາເຂົ້າ</th>
                                    <th>ເວລາອອກ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data
                                .filter(row => row.userId === userId)
                                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((row, i) => (
                                    <tr key={i._id}>
                                        <td>{i + 1}</td>
                                        <td>{row?.sign || "---"}</td>
                                        <td>{row?.carType}</td>
                                        <td>{row?.amount}</td>
                                        <td>{row?.money}</td>
                                        <td>{row?.note}</td>
                                        <td>{moment(row?.createdAt).format('YYY-MM-DD, h:mm:ss a')}</td>
                                        <td>{moment(row?.createdOut).format('YYY-MM-DD, h:mm:ss a')}</td>
                                    </ tr>
                                ))}
                            </tbody>
                        </Table>
                        <br></br>
                        <Pagination>
                            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                            {pageNumbers.map(number => (
                                <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                                    {number}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
                            <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                        </Pagination>
                    </Col>
                </Row>
            </Container></>
    );
}

export default CarHistory;
