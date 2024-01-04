
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";


function Motocycle({ fetchData }) {
    const [showModal, setShowModal] = useState(false);
    const [sign, setSign] = useState("")
    const [carType, setCarType] = useState("ລົດຈັກ");
    const [amount, setAmount] = useState("5000");
    const [note, setNote] = useState("");
    const [money, setMoney] = useState('');

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);



    const handleSubmit = async (event) => {
        event.preventDefault();
        if (sign.trim() === '') {
            // alert('Please enter your name.');
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                showConfirmButton: false,
                timer: 500
            })
            return;
        }
        else {
            const response = await axios.post(`https://soukphasone.onrender.com/order`, { sign, carType, amount, note, money });
            console.log(response.data);

            // alert('Form submitted successfully!');
            Swal.fire({
                title: 'Success!',
                text: 'Do you want to continue',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            fetchData()
            setSign('');
            setNote('');
            setMoney('');
        }
    }
    // if (sign !== '') {
    //     // submit form
    //     setSign('');
    //     setNote('');

    //     // close modal

    // } else {
    //     alert('ກະລຸນາ! ໃສ່ທະບຽນລົດ ຫຼື ເລກກົງເຕີ');
    // }
    // handleClose();
    // Logic to submit form data to backend


    return (
        <>
            <Button variant="primary" onClick={handleShow} className='Modal' size='md' style={{ backgroundColor: "#0B666A", color: "white", border: "none" }}>
                <FontAwesomeIcon icon={faMotorcycle} />  ລົດຈັກ
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ໃສຂໍ້ມູນລົກຈັກ</Modal.Title>
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
                                <option >ລົດຈັກ</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Control as="select" value={amount} onChange={(e) => setAmount(e.target.value)} required disabled className="mb-2" >
                                <option >5000</option>
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

export default Motocycle;


