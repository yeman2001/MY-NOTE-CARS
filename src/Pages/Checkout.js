
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Button, Card, InputGroup, Pagination } from 'react-bootstrap';
import "../Switch.css"
import '../App';
import axios from 'axios';
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Navbarr from '../Components/Navbar';
import { motion } from "framer-motion";

const Checkout = () => {
    const userId = localStorage.getItem('user_id').replace(/^"(.*)"$/, '$1');
    const [tableData, setTableData] = useState([]);
    const [datacars, setDataCars] = useState([]);
    const [sign, setSign] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);


    const totalPages = Math.ceil(tableData.length / itemsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }



    useEffect(() => {
        _fetchData()
    }, []);

    const _fetchData = async () => {
        await axios.get(`https://soukphasone.onrender.com/orders?status=ONLINE&sign=${sign}`)
            .then(response => {
                setTableData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    useEffect(() => {
        _fetchData()
    }, [sign])


    const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
    console.log("Token", token);
    const headers = {
        'Authorization': `STORE ${token}`
    };

    const handleUpdateStatus = async (id) => {
        await axios.put(`https://soukphasone.onrender.com/order/${id}`, { status: "OFFLINE" }, { headers })
            .then(response => {
                _fetchData()
                _getCars()

            })
            .catch(error => {
                console.log(error);
            });
        // Perform search logic here and update tableData state
    }
    ///report 
    useEffect(() => {
        _getCars()
    }, []);

    const _getCars = async () => {

        await axios.get(`https://soukphasone.onrender.com/report/?status=ONLINE&userId=${userId}`)
            .then(response => {
                const data = response.data;
                setDataCars(data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const h1 = { color: "white", marginTop: '15px' }

    return (
        <>
            <Navbarr />
            <Container className='con-checkout' style={{ backgroundColor: "cadetblue", borderRadius: "20px 20px 0 0" }}>
                <Row>
                    <Col>
                        <h1 style={h1}>ລົດໃນຄອກຂະນະນີ້</h1>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col ></Col>
                    <Col ></Col>
                    <Col ></Col>
                    <Col xs={12} md={3}>
                        <motion.div initial={{ x: "-100vw" }}
                            animate={{ x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}>
                            <Form >
                                <Form.Group >
                                    <InputGroup>
                                        <InputGroup.Text id="basic-addon1" style={{ backgroundColor: "white" }}><FontAwesomeIcon icon={faMagnifyingGlass} /></InputGroup.Text>
                                        <Form.Control type="text" placeholder='ຄົ້ນຫາທະບຽນ/ກົງເຕີ' onChange={(e) => setSign(e.target.value)} />
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                        </motion.div>
                    </Col>
                </Row>
                <br></br>
                <Row >
                    <Col xs={6} md={3} className="justify-content-center pb-4">
                        <motion.div initial={{ x: "-100vw" }}
                            animate={{ x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}>
                            <Card >
                                <Card.Body style={{ textAlign: "center" }}>
                                    <Card.Title>ຈຳນວນລົດຖີບ :</Card.Title>
                                    <Card.Text>{datacars.totalCycle}</Card.Text>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    </Col>

                    <Col xs={6} md={3} className="justify-content-center">
                        <motion.div initial={{ x: "-100vw" }}
                            animate={{ x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}>
                            <Card >
                                <Card.Body style={{ textAlign: "center" }}>
                                    <Card.Title>ຈຳນວນລົດຈັກ :</Card.Title>
                                    <Card.Text>{datacars.totalBike}</Card.Text>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    </Col>
                    <Col xs={6} md={3} className="justify-content-center">
                        <motion.div initial={{ x: "-100vw" }}
                            animate={{ x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}>
                            <Card >
                                <Card.Body style={{ textAlign: "center" }}>
                                    <Card.Title> ຈຳນວນລົດໃຫຍ່ :</Card.Title>
                                    <Card.Text>{datacars.totalCars}</Card.Text>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    </Col>
                    <Col xs={6} md={3} className="justify-content-center">
                        <motion.div initial={{ x: "-100vw" }}
                            animate={{ x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}>
                            <Card >
                                <Card.Body style={{ textAlign: "center" }}>
                                    <Card.Title> ຈຳນວນທັງໝົດ :</Card.Title>
                                    <Card.Text>{datacars.totalCars + datacars.totalCycle + datacars.totalBike}</Card.Text>
                                </Card.Body>
                            </Card>
                        </motion.div>
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
                                    <th style={{ textAlign: "center" }}>ສະຖານະ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* tableData */}
                                {/* {tableData.map((item, index) => ( */}
                                {tableData
                                    .filter(item => item.userId === userId)
                                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                    .map((item, index) => (
                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.sign}</td>
                                            <td>{item.carType}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.money}</td>
                                            <td>{item.note}</td>
                                            <td style={{ textAlign: "center" }}>
                                                <button onClick={(e) => {
                                                    Swal.fire({
                                                        title: 'Are you sure?',
                                                        text: "You won't be able to revert this!",
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#3085d6',
                                                        cancelButtonColor: '#d33',
                                                        confirmButtonText: `Yes, delete it!`
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            handleUpdateStatus(item._id)
                                                            Swal.fire(
                                                                'Deleted!',
                                                                'Your file has been deleted.',
                                                                'success',
                                                            )
                                                        }
                                                    })
                                                }} style={{ backgroundColor: "#0B666A", color: "white", border: "none", borderRadius: "5px" }}>{item.status}</button>
                                            </td>
                                        </tr>
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
            </Container ></>
    );
}

export default Checkout;