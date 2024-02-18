import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";
import Iframe from 'react-iframe';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, ListGroup } from 'react-bootstrap';
import myImage from '../asset/image/QR.jpg';

const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => {
    const Navigate = useNavigate()
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const user = JSON.parse(localStorage.getItem('user'));
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const handleClose = () => {
        setShowModal1(false);
        setShowModal2(false);
    };

    const handleShow1 = () => setShowModal1(true);
    const handleShow2 = () => setShowModal2(true);


    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchData()
    };

    async function fetchData() {
        try {

            const response = await axios.post(`https://soukphasone.onrender.com/login`, {
                "username": name,
                "password": password

            })
            // localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('user_id', JSON.stringify(response.data.data._id))
            localStorage.setItem('token', JSON.stringify(response.data.accessToken))
            setIsLoggedIn(true)
            // Navigate('/')
            Navigate('/');
        } catch (error) {
            console.error(error)
            setError('Incorrect username or password')
            setTimeout(() => {
                setError('')
                setName('')
                setPassword('')
            }, 3000)

        }

    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true);
        }
    }, []);
    const imageStyle = {
        width: '250px',
        height: '250px',
    };
    return (

        <section className="vh-100 " style={{ backgroundColor: " cadetblue", }} >
            <motion.div className="container py-5 h-100 "
                // initial={{ x: "-100vw" }}
                // animate={{ x: 0 }}
                // transition={{ duration: 1, ease: "easeOut" }}
                initial={{ x: "-100vw", y: 0 }}
                animate={{ x: 0, y: 0 }}
                transition={{ duration: 2, ease: "easeOut", type: "spring", bounce: 0.3 }}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: " 10px", boxShadow: "10px 10px" }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="https://images.pexels.com/photos/1974520/pexels-photo-1974520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        alt="login form" className="img-fluid" style={{ borderRadius: " 10px 0 0 10px" }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onSubmit={handleSubmit}>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <FontAwesomeIcon icon={faCar} style={{ color: "#0B666A" }} className='fas fa-cubes fa-3x me-3' />
                                                <span className="h1 fw-bold mb-0" style={{ color: "#000000A6", fontFamily: "monospace" }}>MY NOTE CARS</span>
                                            </div>
                                            <br></br>
                                            <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>ເຂົ້າສູ່ລະບົບ</h3>
                                            <div className="form-outline mb-4">
                                                <input type="text" id="name" className="form-control form-control-md" placeholder='ໃສ່ຊື່ບັນຊີ' value={name}
                                                    onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="password" id="password" className="form-control form-control-md" placeholder='ໃສ່ລະຫັດຜ່ານ' value={password}
                                                    onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                            {error && <div style={{ color: 'red' }}>{error}</div>}
                                            <div className="pt-1 mb-4">
                                                <button className="btn btn-md btn-block" type="submit" style={{ backgroundColor: "#0B666A", color: 'white', width: "100%", boxShadow: " 5px 5px 5px #888888" }}>ຕົກລົງ</button>
                                            </div>
                                            <Row>
                                                <Col > <Button variant="" onClick={handleShow1}>
                                                    ລືມລະຫັດຜ່ານ?
                                                </Button>
                                                </Col>
                                                <Col >
                                                    <Button variant="" onClick={handleShow2}>
                                                        ສະຫມັກໃຊ້ງານ
                                                    </Button>
                                                </Col>


                                            </Row>
                                            <Modal show={showModal1} onHide={handleClose} size="xl"
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title>ແບບຟອມເພື່ອກູ້ລະຫັດຜ່ານ</Modal.Title>
                                                </Modal.Header>
                                                <Row>
                                                    <Col md={7}>
                                                        <Modal.Body>
                                                            <Form>
                                                                <Row>
                                                                    {/* <Form.Label>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                                                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Form.Label> */}
                                                                    <Col><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                        <Form.Control
                                                                            type="name"
                                                                            placeholder="ຊື່ບັນຊີ ທີ່ລົງທະບຽນແລ້ວ"
                                                                            required
                                                                        />
                                                                    </Form.Group></Col>
                                                                    <Col> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                        <Form.Control
                                                                            type="email"
                                                                            placeholder="email@example.com"
                                                                            required
                                                                        />
                                                                    </Form.Group></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                        <Form.Control
                                                                            type="fname"
                                                                            placeholder="ຊື່ແທ້ ທີ່ລົງທະບຽນແລ້ວ"
                                                                            required
                                                                        />
                                                                    </Form.Group></Col>
                                                                    <Col> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                        <Form.Control
                                                                            type="lname"
                                                                            placeholder="ນາມສະກຸນ ທີ່ລົງທະບຽນແລ້ວ"
                                                                            required
                                                                        />
                                                                    </Form.Group></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                        <Form.Control
                                                                            type="address"
                                                                            placeholder="ທີ່ຢູ່ ທີ່ລົງທະບຽນແລ້ວ"
                                                                            required
                                                                        />
                                                                    </Form.Group></Col>
                                                                    <Col> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                        <Form.Control
                                                                            type="number"
                                                                            placeholder="ເບີໂທ ທີ່ລົງທະບຽນແລ້ວ"
                                                                            arequired
                                                                        />
                                                                    </Form.Group></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col>
                                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                            <Form.Control
                                                                                type="date"
                                                                                required
                                                                            />
                                                                            <Form.Text className="text-muted">
                                                                                ວັນເດືອນປີເກີດ.
                                                                            </Form.Text>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Group controlId="formFile" className="mb-3">
                                                                            <Form.Control type="file" />
                                                                            <Form.Text className="text-muted">
                                                                                ໃສ່ຮູບ ຫນັງສືເດີນທາງ ຫລື ບັດປະຈຳຕົວ.
                                                                            </Form.Text>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <Form.Group
                                                                    className="mb-3"
                                                                    controlId="exampleForm.ControlTextarea1"
                                                                >
                                                                    <Form.Label>ໝາຍເຫດ</Form.Label>
                                                                    <Form.Control as="textarea" rows={3} />
                                                                </Form.Group>
                                                            </Form>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="secondary" onClick={handleClose}>
                                                                Close
                                                            </Button>
                                                            <Button variant="primary" onClick={handleClose}>
                                                                Save Changes
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Col>
                                                    <Col md={5} className='pd-0'>
                                                        <Modal.Body >
                                                            <Modal.Title >ຕິດຕໍ່ດ່ວນ</Modal.Title>
                                                            <br></br>
                                                            <ListGroup variant="flush" className="">
                                                                <ListGroup>
                                                                    <li>ເບີໂທ : 0000000</li>
                                                                </ListGroup>
                                                                <ListGroup>
                                                                    <li>Email : company@gmail.com</li>
                                                                </ListGroup>
                                                                <ListGroup>
                                                                    <li>Facebook : My note cars </li>
                                                                </ListGroup>
                                                            </ListGroup>
                                                        </Modal.Body>
                                                    </Col>
                                                </Row>
                                            </Modal>
                                            <Modal show={showModal2} onHide={handleClose} size="xl"
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title>ແບບຟອມສະຫມັກສະມາຊີກໃຫມ່</Modal.Title>


                                                </Modal.Header>
                                                <Row>
                                                    <Col md={7}>
                                                        <Modal.Body>
                                                            <Form>

                                                                <Row>
                                                                    <Col><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                        <Form.Control
                                                                            type="fname"
                                                                            placeholder="ຊື່ແທ້ "
                                                                            required
                                                                        />
                                                                    </Form.Group></Col>
                                                                    <Col> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                        <Form.Control
                                                                            type="lname"
                                                                            placeholder="ນາມສະກຸນ "
                                                                            required
                                                                        />
                                                                    </Form.Group></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                        <Form.Control
                                                                            type="address"
                                                                            placeholder="ທີ່ຢູ່ "
                                                                            required
                                                                        />
                                                                    </Form.Group></Col>
                                                                    <Col> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                        <Form.Control
                                                                            type="number"
                                                                            placeholder="ເບີໂທ "
                                                                            arequired
                                                                        />
                                                                    </Form.Group></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                        <Form.Control
                                                                            type="email"
                                                                            placeholder="email@example.com"
                                                                            required
                                                                        />
                                                                    </Form.Group></Col>
                                                                    <Col>
                                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                            <Form.Control
                                                                                type="date"
                                                                                required
                                                                            />
                                                                            <Form.Text className="text-muted">
                                                                                ວັນເດືອນປີເກີດ.
                                                                            </Form.Text>
                                                                        </Form.Group>
                                                                    </Col>

                                                                </Row>
                                                                <Row>
                                                                    <Col>
                                                                        <Form.Group controlId="formFile" className="mb-3">
                                                                            <Form.Control type="file" />
                                                                            <Form.Text className="text-muted">
                                                                                ໃສ່ຮູບ ຫນັງສືເດີນທາງ ຫລື ບັດປະຈຳຕົວ.
                                                                            </Form.Text>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Group controlId="formFile" className="mb-3">
                                                                            <Form.Control type="file" />
                                                                            <Form.Text className="text-muted">
                                                                                ໃສ່ຮູບ ໃບບິນຄ່າທຳນຽມສະຫມັກໃຊ້ງານ.
                                                                            </Form.Text>
                                                                        </Form.Group>
                                                                    </Col>

                                                                </Row>
                                                                <Form.Group
                                                                    className="mb-3"
                                                                    controlId="exampleForm.ControlTextarea1"
                                                                >
                                                                    <Form.Label>ໝາຍເຫດ</Form.Label>
                                                                    <Form.Control as="textarea" rows={3} />
                                                                </Form.Group>
                                                            </Form>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="secondary" onClick={handleClose}>
                                                                Close
                                                            </Button>
                                                            <Button variant="primary" onClick={handleClose}>
                                                                Save Changes
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Col>
                                                    <Col md={5} className='pd-0'>
                                                        <Modal.Body >
                                                            {/* <Modal.Title >ອ່ານກ່ອນສະຫມັກບັນຊີ </Modal.Title> */}



                                                            <Modal.Title >ເງື່ອນໄຂ ສະຫມັກໃຊ້ງານ</Modal.Title>

                                                            <ListGroup>
                                                                <li>
                                                                    ສະບາຍດີ ພວກເຮົາແມ່ນ ເວບໃຊ້ໃຫ້ບໍລິການເຊົ່າ ລະບົບ ເກັບປີ້ລົດ
                                                                </li>
                                                                <li>ຄ່າທຳນຽມໃນການໃຊ້ງານ 159.000 ກີບ/ເດືອນ ແຕ່ ລູກຄ້າຕ້ອງໄດ້ໂອນເງິນມັດຈຳລ່ວງຫນ້າ 1 ເດືອນ ລວມເປັນ ເງິນ 318.000 ກີບ .
                                                                    ລູກຄ້າຈະໄດຮັບເງິນມັດຈຳຄືນຫລັງຈາກຢຸດການໃຊ້
                                                                </li>
                                                                <li>
                                                                    ແອັດມິນຈະສົ່ງຊື່ບັນຊີ ແລະ ລະຫັດຜ່ານເພື່ອໃຊ້ງານ ທາງອີເມວພາຍໃນ 5-30 ນາທີ
                                                                </li>
                                                            </ListGroup>
                                                            <br></br>
                                                            <Col> <div>
                                                                <h4>ບັນຊີ ທະນາຄານ</h4>
                                                                <img src={myImage} alt="My Image" style={imageStyle} />
                                                            </div></Col>
                                                            <br></br>
                                                            <Modal.Title >ສະຖານທີ່  </Modal.Title>
                                                            <ListGroup>
                                                                <li>
                                                                    ບ້ານ 123 , ເມືອງ 123 , ແຂວງ 123, ລາວ
                                                                </li>

                                                            </ListGroup>
                                                            <div>
                                                                <Iframe
                                                                    url="https://maps.app.goo.gl/BWhsh9vsw9hj7QBBA"
                                                                    width="100%"
                                                                    height="300px"
                                                                    id="myId"
                                                                    className="myClassname"
                                                                    display="initial"
                                                                    position="relative"
                                                                    allowFullScreen
                                                                />
                                                            </div>

                                                            {/* <ListGroup variant="flush" className="">
                                                                <ListGroup>
                                                                    <li>ເບີໂທ : 0000000</li>
                                                                </ListGroup>
                                                                <ListGroup>
                                                                    <li>Email : company@gmail.com</li>
                                                                </ListGroup>
                                                                <ListGroup>
                                                                    <li>Facebook : My note cars </li>
                                                                </ListGroup>
                                                            </ListGroup> */}
                                                        </Modal.Body>
                                                    </Col>
                                                </Row>
                                            </Modal>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section >
    );
};

export default LoginPage;