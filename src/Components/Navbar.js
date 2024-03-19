import { Navbar, Nav, Container, Dropdown, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSitemap, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbarr() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const userId = localStorage.getItem('user_id');
    const username = localStorage.getItem('username').replace(/^"(.*)"$/, '$1');
    const navigate = useNavigate();
    const title = `Hello!, ${username}`;

    useEffect(() => {
        // Check if user is logged in when the component mounts
        setIsLoggedIn(!!userId);
    }, [userId]);

    const navigateToLogin = () => {
        // Navigate to login page
        navigate('/login');
    };

    const handleLogout = () => {
        try {
            // Clear local storage
            localStorage.clear();
            // Update isLoggedIn state
            setIsLoggedIn(false);
            // Navigate to login page
            navigateToLogin();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };




    return (
        <>
            <Navbar expand="lg" style={{ backgroundColor: "white" }} sticky="top">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" style={{ marginBottom: "13px", color: "#0B666A", fontWeight: "bold" }}>
                        <FontAwesomeIcon icon={faSitemap} as={Link} to="/" style={{ fontSize: "40px", color: "#0B666A", marginRight: "10px" }} />
                        MY NOTE CARS
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {isLoggedIn && (<Nav.Link as={Link} to="/">ຫນ້າຫລັກ</Nav.Link>)}
                            {isLoggedIn && (<Nav.Link as={Link} to="/Checkout">ລົດໃນຄອກຂະນະນີ້</Nav.Link>)}
                            {isLoggedIn && (<Nav.Link as={Link} to="/Carhistory">ປະຫວັດລົດເຂົ້າ-ອອກ</Nav.Link>)}
                            {isLoggedIn && (<Nav.Link as={Link} to="/moneyhistory">ປະຫວັດຍອດເງິນ</Nav.Link>)}
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title={title}
                                    menuVariant="light"
                                >
                                    {isLoggedIn && (<NavDropdown.Item onClick={handleLogout} style={{ color: "red" }}>
                                        ອອກຈາກລະບົບ<FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: "red", marginLeft: "5px" }} />
                                    </NavDropdown.Item>)}
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navbarr;
