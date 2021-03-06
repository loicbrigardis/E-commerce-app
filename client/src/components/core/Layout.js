import React from 'react';
import Menu from '../core/Menu';
import { MDBContainer, MDBJumbotron, MDBRow, MDBCol, MDBCardTitle } from "mdbreact";


const Layout = ({ title = 'Title', description = 'description', children }) => {
    return (
        <>
            <Menu />
            <MDBContainer className="text-center" fluid>
                <MDBRow>
                    <MDBCol style={{ padding: 0 }} >
                        <MDBJumbotron style={{ padding: 0 }}>
                            <MDBCol className="text-white effect2 text-center py-1 px-4 my-1" style={{ backgroundSize: 'cover', backgroundImage: `url(https://nordiclifescience.org/wp-content/public_html/2018/01/publication-e1516615172666.jpg)` }}>
                                <MDBCol className="py-4">
                                    <MDBCardTitle className="l-title h1-responsive pt-3 m-5 font-bold">{title}</MDBCardTitle>
                                    <p className="l-desc mx-5 mb-2">{description}</p>
                                </MDBCol>
                            </MDBCol>
                        </MDBJumbotron>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <MDBContainer>
                <MDBRow>
                    <MDBCol>{children}</MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}

export default Layout;