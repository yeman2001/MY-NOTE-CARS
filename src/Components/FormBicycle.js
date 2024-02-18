
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBicycle } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";


function Bicycle({ fetchData }) {
    const [showModal, setShowModal] = useState(false);

    const [carType, setCarType] = useState("ລົດຖີບ");
    const [amount, setAmount] = useState("3000");
    const [note, setNote] = useState("");
    const [sign, setSign] = useState("");
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
            const response = await axios.post(`https://soukphasone.onrender.com/order`, { carType, amount, note, money, sign });
            // console.log(response.data);

            // alert('Form submitted successfully!');
            Swal.fire({
                title: 'Success!',
                text: 'Do you want to continue',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            fetchData()
            setNote('');
            setMoney('');
            setSign('')
        }
    }



    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     if (sign.trim() === '') {
    //         // alert('Please enter your name.');
    //         Swal.fire({
    //             title: 'Error!',
    //             text: 'Do you want to continue',
    //             icon: 'error',
    //             showConfirmButton: false,
    //             timer: 500
    //         })
    //         return;
    //     }
    //     else {
    //         const id = "your-id"; // replace with the actual id
    //         const response = await axios.post(`https://soukphasone.onrender.com/order/${id}`, { carType, amount, note, money, sign });
    //         console.log(response.data);

    //         // alert('Form submitted successfully!');
    //         Swal.fire({
    //             title: 'Success!',
    //             text: 'Do you want to continue',
    //             icon: 'success',
    //             showConfirmButton: false,
    //             timer: 1500
    //         })
    //         fetchData()
    //         setNote('');
    //         setMoney('');
    //         setSign('')
    //     }
    // }

    return (
        <>
            <Button variant="primary" onClick={handleShow} className='Modal' size='md' style={{ backgroundColor: "#0B666A", color: "white", border: "none" }}>
                <FontAwesomeIcon icon={faBicycle} /> ລົດຖີບ
            </Button>

            <Modal show={showModal} onHide={handleClose}  >
                <Modal.Header closeButton >
                    <Modal.Title >ໃສຂໍ້ມູນລົດຖີບ</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="formTitle" className='mb-2'>
                            <Form.Control
                                type="text"
                                placeholder="ຂໍ້ມູນລົດຖີບ"
                                name="title"
                                value={sign} onChange={(e) => setSign(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group >
                            <Form.Control as="select" value={carType} onChange={(e) => setCarType(e.target.value)} required disabled className="mb-2">
                                <option >ລົດຖີບ</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group >
                            <Form.Control as="select" value={amount} onChange={(e) => setAmount(e.target.value)} required disabled className="mb-2" >
                                <option >3000</option>
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

export default Bicycle;



