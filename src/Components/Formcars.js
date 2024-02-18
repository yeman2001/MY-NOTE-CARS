
import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

function Cars({ fetchData }) {
    const [showModal, setShowModal] = useState(false);
    const [sign, setSign] = useState("")
    const [carType, setCarType] = useState("ລົດໃຫຍ່");
    const [amount, setAmount] = useState("10000");
    const [note, setNote] = useState("");
    const [money, setMoney] = useState('');
    const navigate = useNavigate();
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (sign.trim() === '' || money.trim() === '') {
            Swal.fire({
                title: 'Error!',
                text: 'Data field cannot be empty',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        const userId = localStorage.getItem('user_id').replace(/^"(.*)"$/, '$1');
        console.log("UserId", userId);
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        console.log("Token", token);
        const headers = {
            'Authorization': `STORE ${token}`
        };
    
        try {
            const response = await axios.post(`https://soukphasone.onrender.com/order`, { userId, sign, carType, amount, note, money }, { headers });
            navigate("/");
            Swal.fire({
                title: 'Success!',
                text: 'Form submitted successfully.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
            handleClose();
            fetchData();
            setSign('');
            setNote('');
            setMoney('');
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while submitting the form.',
                icon: 'error',
                showConfirmButton: true
            });
        }
    }
    
    
    
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
                                value={sign} onChange={(e) => setSign(e.target.value)}
                            />
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
                                {/* <Form.Check type="checkbox" label="ເງິນສົດ" name="cash" checked={money.cash} onChange={handlePaymentMethodChange} />
                                <Form.Check type="checkbox" label="ເງິນໂອນ" name="transfer" checked={money.transfer} onChange={handlePaymentMethodChange} /> */}
                                <Form.Check type="radio" name="money" defaultChecked={money === 'cash' ? true : false} onChange={() => setMoney("cash")} label='ເງິນສົດ' />
                                <Form.Check type="radio" name="money" defaultChecked={money === 'transfer' ? true : false} onChange={() => setMoney("transfer")} label='ເງິນໂອນ' />
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

            </Modal >
        </>
    );
}

export default Cars;



