import React, { useEffect, useState } from 'react'
import ReportMoney from '../Components/ReportMonney'
import ReportCars from '../Components/ReportCars'
import Footer from '../Components/Footer'
import '../App'
import Bicycle from '../Components/FormBicycle'
import Cars from '../Components/Formcars'
import Motocycle from '../Components/FormMotocycle'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbarr from '../Components/Navbar'
import { motion } from "framer-motion";
import { useLocation } from 'react-router-dom';
function Body() {

    const [datacars, setDataCars] = useState([]);


    useEffect(() => {
        _fetchData()

    }, [])

    const _fetchData = async () => {
        await axios.get(`https://soukphasone.onrender.com/report/?status=ONLINE`)
            .then(response => {
                const data = response.data;
                setDataCars(data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <Navbarr />
            <motion.div className='big-con '
                initial={{ x: "-100vw" }}
                animate={{ x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}>
                <Container>
                    <div className='top-title'>
                        <h1 style={{ color: "white" }}>ລະບົບຈັດການປີ້ລົດ</h1>
                        <hr></hr>
                    </div>
                    <div className="container-cars">
                        <Cars fetchData={_fetchData} />
                        <Motocycle fetchData={_fetchData} />
                        <Bicycle fetchData={_fetchData} />
                    </div>
                    <Row className="justify-content-center">
                        <Col xs={12} md={4}>
                            < ReportMoney />
                        </Col>
                        <Col xs={12} md={4}>
                            {/* <div className="card-report " >
                                <h3>ລົດໃນຄອກຂະນະນີ້:</h3>
                                <hr></hr>
                                <div>
                                    <div style={{ display: "flex" }} className='report-title'><span>ລົດຈັກ :</span><p>{datacars.totalBike}</p></div>
                                    <div style={{ display: "flex" }} className='report-title'><span>ລົດຖີບ :</span><p>{datacars.totalCycle}</p></div>
                                    <div style={{ display: "flex" }} className='report-title'><span>ລົດໃຫຍ່ :</span><p>{datacars.totalCars}</p></div>
                                </div>
                                <Link href="/Checkout">
                                    <Button style={{ marginTop: "0rem", color: "white", width: "100%", background: "#0B666A", border: "none" }} className='btn '> ເບິ່ງລາຍລະອຽດ</Button>
                                </Link>
                            </div> */}
                            <ReportCars />
                        </Col>
                    </Row>
                </Container >
            </motion.div>
            <Footer />
        </>
    )
}

export default Body