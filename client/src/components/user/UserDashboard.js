import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthentificated } from '../auth';
import { getPurchaseHistory } from './apiUser';
import moment from 'moment';

import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBTable, MDBTableBody, MDBTableHead, MDBCol, MDBListGroup, MDBListGroupItem, MDBRow } from 'mdbreact';

const Dashboard = () => {
    const [history, setHistory] = useState([]);
    const { user: { _id, name, userEmail: email, role } } = isAuthentificated();
    const token = isAuthentificated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setHistory(data);
                }
            })
    }

    useEffect(() => {
        init(_id, token)
    }, [_id, token])

    const userLinks = () => {
        return (
            <MDBCardBody>
                <MDBCardTitle>User Links</MDBCardTitle>
                <MDBListGroup>
                    <MDBListGroupItem>
                        <Link to="/cart">My Cart</Link>
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                        <Link to={`/profile/${_id}`}>Update profile</Link>
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
                        <th>Name</th>
                        <th>Price</th>
                        <th>Date</th>
                    </tr>
                </MDBTableHead>
                {history.map((h, i) => {
                    return h.products.map((product, iProduct) => {
                        return (
                            <MDBTableBody key={iProduct}>
                                <tr>
                                    <td>{product.name}</td>
                                    <td>{product.price} €</td>
                                    <td>{moment(h.createdAt).fromNow()}</td>
                                </tr>
                            </MDBTableBody>
                        )
                    })
                })}
            </MDBTable>
        </MDBCol>
    )

    return (
        <>
            <Layout title="Dashboard" description={`Nice to see you ${name}`}>
                <MDBRow className="mb-5">
                    {userInfo()}
                    {userHistory(history)}
                </MDBRow>
            </Layout>
        </>
    )
}

export default Dashboard;