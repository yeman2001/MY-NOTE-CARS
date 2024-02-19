import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, ListGroup, Form, Container } from 'react-bootstrap';

function ForgetPassWord() {
    const [showModal1, setShowModal1] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        fname: '',
        lname: '',
        address: '',
        number: '',
        dob: '',
        file: null,
        notes: '',
    });

    const handleClose = () => {
        setShowModal1(false);
    };

    const handleShow1 = () => setShowModal1(true);

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

    return (
        <Container>
            <Row>
                <Col>
                    <Button variant="" onClick={handleShow1}>
                        ລືມລະຫັດຜ່ານ?
                    </Button>
                </Col>
            </Row>
            <Modal show={showModal1} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>ແບບຟອມເພື່ອກູ້ລະຫັດຜ່ານ</Modal.Title>
                </Modal.Header>
                <Row>
                    <Col md={7}>
                        <Form>
                            <Modal.Body>

                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Control
                                                type="text"
                                                placeholder="ຊື່ບັນຊີ ທີ່ລົງທະບຽນແລ້ວ"
                                                name='name'
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Control
                                                type="email"
                                                placeholder="email@example.com"
                                                onChange={handleChange}
                                                required
                                                name='email'
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Control
                                                type="text"
                                                placeholder="ຊື່ແທ້ ທີ່ລົງທະບຽນແລ້ວ"
                                                required
                                                name='fname'
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Control
                                                type="text"
                                                placeholder="ນາມສະກຸນ ທີ່ລົງທະບຽນແລ້ວ"
                                                name='lname'
                                                required
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Control
                                                type="text"
                                                placeholder="ທີ່ຢູ່ ທີ່ລົງທະບຽນແລ້ວ"
                                                name='address'
                                                required
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Control
                                                type="number"
                                                placeholder="ເບີໂທ ທີ່ລົງທະບຽນແລ້ວ"
                                                required
                                                name='number'
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Control
                                                type="date"
                                                name='dob'
                                                required
                                                onChange={handleChange}
                                            />
                                            <Form.Text className="text-muted">
                                                ວັນເດືອນປີເກີດ.
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formFile" className="mb-3" >
                                            <Form.Control type="file" name='file' onChange={handleFileChange} />
                                            <Form.Text className="text-muted">
                                                ໃສ່ຮູບ ຫນັງສືເດີນທາງ ຫລື ບັດປະຈຳຕົວ.
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>ໝາຍເຫດ</Form.Label>
                                    <Form.Control as="textarea" rows={3} name='notes' onChange={handleChange} />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => console.log("data", formData)}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Col>
                    <Col md={5} className="pd-0">
                        <Modal.Body>
                            <Modal.Title>ຕິດຕໍ່ດ່ວນ</Modal.Title>
                            <br />
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
        </Container >
    );
}

export default ForgetPassWord;
