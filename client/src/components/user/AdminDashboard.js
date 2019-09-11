import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthentificated } from '../auth';

import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBTable, MDBTableBody, MDBTableHead, MDBCardText, MDBCol, MDBListGroup, MDBListGroupItem, MDBRow } from 'mdbreact';

const AdminDashboard = () => {
    const { user: { _id, name, userEmail: email, role } } = isAuthentificated();

    const adminLinks = () => {
        return (
            <MDBCardBody>
                <MDBCardTitle>Admin Links</MDBCardTitle>
                <MDBListGroup>
                    <MDBListGroupItem>
                        <Link to="/category/create">Create category</Link>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                        <Link to={`/product/create/${_id}`}>Create product</Link>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                        <Link to="/admin/orders">View orders</Link>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                        <Link to="/admin/products">Manage products</Link>
                    </MDBListGroupItem>
                </MDBListGroup>
            </MDBCardBody>
        )
    }

    const adminInfo = () => (
        <MDBCol size="4">
            <MDBCard>
                <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
                {adminLinks()}
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
            <Layout title="Admin Dashboard" description={`Nice to see you ${name}`}>
                <MDBRow className="mb-5">
                    {adminInfo()}
                </MDBRow>
            </Layout>
        </>
    )
}

export default AdminDashboard;