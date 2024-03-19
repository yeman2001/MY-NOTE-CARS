// src/components/Cars.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { submitCarForm } from "../Services/api";
import { showErrorAlert, showSuccessAlert } from "../helper/SweetAlert";

function Cars({ fetchData }) {
    const [showModal, setShowModal] = useState(false);
    const [sign, setSign] = useState("");
    const [carType, setCarType] = useState("ລົດໃຫຍ່");
    const [amount, setAmount] = useState("10000");
    const [note, setNote] = useState("");
    const [money, setMoney] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (sign.trim() === '' || money.trim() === '') {
            setError('Please enter sign');
            return;
        }

        const userId = localStorage.getItem('user_id').replace(/^"(.*)"$/, '$1');
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        const headers = {
            'Authorization': `STORE ${token}`
        };

        try {
            await submitCarForm({ userId, sign, carType, amount, note, money, headers });
            navigate("/");
            showSuccessAlert('Form submitted successfully.');

            handleClose();
            fetchData();
            setSign('');
            setNote('');
            setMoney('');
        } catch (error) {
            console.error("Error:", error);
            showErrorAlert('An error occurred while submitting the form.');
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow} className='Modal' size='md' style={{ backgroundColor: "#0B666A", color: "white", border: "none" }}>
                <FontAwesomeIcon icon={faCar} /> ລົດໃຫຍ່
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ໃສ່ຂໍ້ມູນລົດໃຫຍ່</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="formTitle" className='mb-2'>
                            <Form.Control
                                type="text"
                                placeholder="ໃສ່ທະບຽນລົດ ຫຼື ເລກກົງເຕີ"
                                name="title"
                                value={sign}
                                onChange={(e) => setSign(e.target.value)}
                                style={{ border: error && sign.trim() === '' ? '1px solid red' : '' }}
                            />
                            {error && sign.trim() === '' && <div style={{ color: 'red' }}>Please enter a value for sign</div>}
                        </Form.Group>
                        <Form.Group >
                            <Form.Control as="select" value={carType} onChange={(e) => setCarType(e.target.value)} required disabled className="mb-2">
                                <option >ລົດໃຫຍ່</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Control as="select" value={amount} onChange={(e) => setAmount(e.target.value)} required disabled className="mb-2" >
                                <option >10000</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formNote" className="mb-2">
                            <Form.Control as="textarea" rows={3} value={note}
                                onChange={(e) => setNote(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formPaymentMethod">
                            <div>
                                <Form.Check
                                    type="radio"
                                    name="money"
                                    defaultChecked={money === 'cash'}
                                    onChange={() => setMoney("cash")}
                                    label={<span style={{ color: error && money.trim() === '' ? 'red' : '' }}>ເງິນສົດ</span>}
                                />
                                <Form.Check
                                    type="radio"
                                    name="money"
                                    defaultChecked={money === 'transfer'}
                                    onChange={() => setMoney("transfer")}
                                    label={<span style={{ color: error && money.trim() === '' ? 'red' : '' }}>ເງິນໂອນ</span>}
                                />
                                {error && money.trim() === '' && <div style={{ color: 'red' }}>Please enter a value for money</div>}
                            </div>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            ຍົກເລີກ
                        </Button>
                        <Button variant="primary" type="submit">
                            ບັນທຶກ
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default Cars;
