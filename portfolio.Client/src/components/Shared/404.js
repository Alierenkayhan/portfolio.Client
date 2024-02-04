// import necessary libraries
import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import styles from "./../../Css/Error404.module.scss";
import image from "./../../img/404.png";
const Error404 = () =>
{
    return (
        <Container className={styles.errorContainer}>
            <Row className="justify-content-center align-items-center">
                <Col sm={12} className="text-center">
                    <div className={styles.errorImage}>
                        <Image
                            src={image}
                            alt=""
                            className="img-fluid"
                        />
                    </div>
                    <h1 className="display-4 fw-bold">Oops! The page was not found.</h1>

                    <Link to="/" className={`btn btn-primary ${styles.goHomeButton}`}>
                        Go Home
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default Error404;
