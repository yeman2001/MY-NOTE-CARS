import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "../App.css"


function Footer() {
    const styles = {
        fontFamily: 'monospace'
    };


    return (
        <footer >
            <Container >
                <p style={styles}>&copy; 2023 My note-cars </p>
                <Row>
                    <Col className='' style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                        <a href="https://www.example.com">  <p style={styles}>Fontend by: NALONGSIT XAYAVONG ,  </p></a>
                        <a href="https://www.example.com">  <p style={styles}>Backend by: SOUKPHASONE DUANGPHANYA here</p></a>
                    </Col>

                </Row>
            </Container>
        </footer >
    )
}

export default Footer