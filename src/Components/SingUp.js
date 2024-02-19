import React, { useState, useEffect } from 'react';
import { Col, Row, Modal, Button, Form, ListGroup } from 'react-bootstrap';
import Iframe from 'react-iframe';
import myImage from '../asset/image/QR.jpg'; // Replace with the actual path to your image
import axios from 'axios';


function SingUp() {
    const [showModal2, setShowModal2] = useState(false);
    const handleClose = () => {
        setShowModal2(false);
    };
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        fname: '',
        lname: '',
        address: '',
        number: '',
        dob: '',
        fileA: null,
        fileB: null,
        notes: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async () => {
        try {
            // Perform the API call using axios
            const response = await axios.post('your_api_endpoint', formData);
            console.log(response.data); // Log the response from the server
            handleClose(); // Close the modal after successful submission (you can modify this based on your requirements)
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    useEffect(() => {
        // You can perform additional actions when the component mounts
        // For example, fetch data from an API
    }, []);

    const handleShow2 = () => setShowModal2(true);
    const imageStyle = {
        width: '250px',
        height: '250px',
    };
    return (
        <>
            <Col>
                <Button variant="" onClick={handleShow2}>
                    ສະຫມັກໃຊ້ງານ
                </Button>
            </Col>
            <Modal show={showModal2} onHide={handleClose} size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>ແບບຟອມສະຫມັກສະມາຊີກໃຫມ່</Modal.Title>
                </Modal.Header>
                <Row>
                    <Col md={7}>
                        <Form>
                            <Modal.Body>
                                <Row>
                                    <Col><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            type="text"
                                            placeholder="ຊື່ແທ້ "
                                            required
                                            name='fname'
                                            onChange={handleChange}
                                        />
                                    </Form.Group></Col>
                                    <Col> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            name='lname'
                                            type="text"
                                            placeholder="ນາມສະກຸນ "
                                            required
                                            onChange={handleChange}
                                        />
                                    </Form.Group></Col>
                                </Row>
                                <Row>
                                    <Col><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            name='address'
                                            type="text"
                                            placeholder="ທີ່ຢູ່ "
                                            required
                                            onChange={handleChange}
                                        />
                                    </Form.Group></Col>
                                    <Col> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            name='number'
                                            type="number"
                                            placeholder="ເບີໂທ "
                                            arequired
                                            onChange={handleChange}
                                        />
                                    </Form.Group></Col>
                                </Row>
                                <Row>
                                    <Col> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            name='email'
                                            type="email"
                                            placeholder="email@example.com"
                                            required
                                            onChange={handleChange}
                                        />
                                    </Form.Group></Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Control
                                                name='dob'
                                                type="date"
                                                required
                                                onChange={handleChange}
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
                                            <Form.Control
                                                name='fileA'
                                                type="file"
                                                onChange={handleFileChange} />
                                            <Form.Text className="text-muted">
                                                ໃສ່ຮູບ ຫນັງສືເດີນທາງ ຫລື ບັດປະຈຳຕົວ.
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Control
                                                name='fileB'
                                                type="file"
                                                onChange={handleFileChange}
                                            />
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
                                    <Form.Control as="textarea" rows={3} name='notes' onChange={handleChange} />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => console.log("SingUp_data", formData)}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Col>
                    <Col md={5} className='pd-0'>
                        <Modal.Body >
                            <Modal.Title >ເງື່ອນໄຂ ສະຫມັກໃຊ້ງານ</Modal.Title>
                            <ListGroup>
                                <li>
                                    ເວບໃຊ້ໃຫ້ບໍລິການເຊົ່າ ລະບົບຈັດການເກັບປີ້ລົດ ອອນລາຍ
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
                        </Modal.Body>
                    </Col>
                </Row>
            </Modal >
        </ >
    );
}

export default SingUp;














