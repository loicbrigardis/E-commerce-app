import React from 'react';
import { Link } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBTable, MDBTableBody, MDBTableHead, MDBCol, MDBListGroup, MDBListGroupItem, MDBRow } from 'mdbreact';

import Layout from '../core/Layout';
import { isAuthentificated } from '../auth';


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