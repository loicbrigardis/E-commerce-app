import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthentificated } from '../auth';

import { read, update, updateUser } from './apiUser';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, error, success } = values;
    const { token } = isAuthentificated();

    const init = (userId) => {
        read(userId, token)
            .then(data => {
                if (data.err) {
                    setValues({ ...values, error: true })
                } else {
                    setValues({ ...values, name: data.name, email: data.email })
                }
            })
    }

    useEffect(() => {
        init(match.params.userId);
    }, [])

    const handleChange = (e) => {
        setValues({ ...values, error: false, [e.target.name]: e.target.value })
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, password })
            .then(data => {
                if (data.err) {
                    console.log(data.err);
                } else {
                    updateUser(data, () => {
                        setValues({ ...values, name: data.name, email: data.email, success: true })
                    })
                }
            })
    }

    const redirectUser = (success) => {
        if (success) {
            return <Redirect to="/cart" />
        }
    }

    const profileUpdate = (name, email, passwor) => (
        <MDBRow>
            <MDBCol md="6">
                <MDBCard>
                    <MDBCardBody>
                        <form>
                            <p className="h4 text-center py-4">Your profile</p>
                            <label
                                htmlFor="defaultFormCardNameEx"
                                className="grey-text font-weight-light"
                            >
                                Your name
                            </label>
                            <input
                                type="text"
                                id="defaultFormCardNameEx"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={handleChange}
                            />
                            <br />
                            <label
                                htmlFor="defaultFormCardEmailEx"
                                className="grey-text font-weight-light"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                id="defaultFormCardEmailEx"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                            <br />
                            <label
                                htmlFor="defaultFormCardEmailEx"
                                className="grey-text font-weight-light"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="defaultFormCardEmailEx"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                            <div className="text-center py-4 mt-3">
                                <MDBBtn
                                    onClick={clickSubmit}
                                    className="btn btn-outline-purple"
                                    type="submit">
                                    Send
                                <MDBIcon far icon="paper-plane" className="ml-2" />
                                </MDBBtn>
                            </div>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    )

    return (
        <Layout title="Profile" description="Update profile">
            <h2>Profile</h2>
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </Layout>
    )
}

export default Profile;