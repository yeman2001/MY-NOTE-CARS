import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSitemap } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';


function Navbarr() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    // handle login
    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    return (
        <>
            <Navbar expand="lg" style={{ backgroundColor: "white" }} sticky="top" >
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" style={{ marginBottom: "13px", color: "#0B666A", fontWeight: "bold", }}>
                        <FontAwesomeIcon icon={faSitemap} as={Link} to="/" style={{ fontSize: "40px", color: "#0B666A", marginRight: "10px" }} />MY NOTE CARS
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="me-auto">
                            {/* <Nav.Link href="/home" style={{ fontSize: "20px", color: "#0B666A", }}>MY NOTE CARS</Nav.Link> */}
                            {!isLoggedIn && (<Nav.Link as={Link} to="/">ຫນ້າຫລັກ</Nav.Link>)}
                            {!isLoggedIn && (<Nav.Link as={Link} to="/Checkout">ລົດໃນຄອກຂະນະນີ້</Nav.Link>)}
                            {!isLoggedIn && (<Nav.Link as={Link} to="/Carhistory">ປະຫວັດລົດເຂົ້າ-ອອກ</Nav.Link>)}
                            {!isLoggedIn && (<Nav.Link as={Link} to="/moneyhistory">ປະຫວັດຍອດເງິນ</Nav.Link>)}
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Nav.Link as={Link} to="/login" style={{ color: "red" }}>ອອກຈາກລະບົບ</Nav.Link>
                                <Nav.Link as={Link} to="/login"><FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: "red" }} /></Nav.Link>
                                {/* <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title="Action"
                                    menuVariant="dark"
                                >
                                    <NavDropdown.Item as={Link} to="/login">
                                        ອອກຈາກລະບົບ
                                    </NavDropdown.Item>

                                </NavDropdown> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </>
    );
}

export default Navbarr;