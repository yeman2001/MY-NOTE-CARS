// async function fetchData() {
//     try {
//         const response = await axios.post(`https://hostel-backend-nxr5.onrender.com/auth/signin`, {
//             "identifier": name,
//             "password": password

//         })
//         if (response.status === 200) {
//             if (response.data.jwt) {
//                 setIsLoggedIn(true)
//                 Navigate('/')
//             }
//         }
//     } catch (error) {
//         console.error(error)
//         if (error.response.status === 400) {
//             setError('Incorrect username or password')
//             setTimeout(() => {
//                 setError('')
//                 setName('')
//                 setPassword('')
//             }, 3000)
//         }
//     }
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";


const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => {
    const Navigate = useNavigate()
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const user = JSON.parse(localStorage.getItem('user'));




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
                                            <a href=''><p>forget password?</p></a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default LoginPage;

