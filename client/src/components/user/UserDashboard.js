import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthentificated } from '../auth';

import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBTable, MDBTableBody, MDBTableHead, MDBCardText, MDBCol, MDBListGroup, MDBListGroupItem, MDBRow } from 'mdbreact';

const Dashboard = () => {
    const { user: { _id, name, userEmail: email, role } } = isAuthentificated();

    const userLinks = () => {
        return (
            <MDBCardBody>
                <MDBCardTitle>User Links</MDBCardTitle>
                <MDBListGroup>
                    <MDBListGroupItem>
                        <Link to="/cart">My Cart</Link>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                        <Link to="/profile/update">Update profile</Link>
                    </MDBListGroupItem>
                </MDBListGroup>
            </MDBCardBody>
        )
    }

    const userInfo = () => (
        <MDBCol size="4">
            <MDBCard>
                <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
                {userLinks()}
                <MDBCardBody>
                    <MDBCardTitle>User informations</MDBCardTitle>
                    <MDBListGroup>
                        <MDBListGroupItem>Name: <b>{name}</b></MDBListGroupItem>
                        <MDBListGroupItem>Email: <b>{email}</b></MDBListGroupItem>
                        <MDBListGroupItem>Role: <b>{role === 1 ? 'Admin' : 'Registered user'}</b></MDBListGroupItem>
                    </MDBListGroup>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )

    const userHistory = () => (
        <MDBCol size="8">
            <h1>Purchase history</h1>
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th>#</th>
                        <th>First</th>
                        <th>Last</th>
                        <th>Handle</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
        </MDBCol>
    )

    return (
        <>
            <Layout title="Dashboard" description={`Nice to see you ${name}`}>
                <MDBRow className="mb-5">
                    {userInfo()}
                    {userHistory()}
                </MDBRow>
            </Layout>
        </>
    )
}

export default Dashboard;