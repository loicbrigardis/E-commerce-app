import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { MDBAlert, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

import Layout from '../core/Layout';
import { signin, authenticate, isAuthentificated } from '../auth';

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { user } = isAuthentificated();

    const { email, password, error, loading, redirectToReferrer } = values;

    const handleChange = (e) => {
        setValues({ ...values, error: false, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: [], loading: true })
        signin({ email, password })
            .then(data => {
                if (data.err) {
                    setValues({ ...values, error: data.err, loading: false })
                } else {
                    authenticate(data, () => {
                        setValues({ ...values, redirectToReferrer: true })
                    })
                }
            })
    }

    const signinForm = () => {
        return (
            <MDBRow center>
                <MDBCol md="6">
                    <form>
                        <p className="h4 text-center mb-4">Welcome, ready to read a good book?</p>
                        {
                            error
                                ? error.map((err, i) => (
                                    <MDBAlert color="danger" key={i}>
                                        {err.msg}
                                    </MDBAlert>
                                ))
                                : ''
                        }
                        <label htmlFor="email" className="grey-text">
                            Your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => handleChange(e)}
                        />
                        <br />
                        <label
                            htmlFor="password"
                            className="grey-text"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => handleChange(e)}
                        />
                        <div className="text-center mt-4">
                            <MDBBtn color="unique" type="submit" onClick={handleSubmit}>
                                Signin
                        </MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        )
    }

    const showLoading = () => (
        loading && (<div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div >)
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/" />
            }
        }
    }

    return (
        <>
            <Layout title="Signin" description="Best Ebooks E-commerce site">
                {showLoading()}
                {signinForm()}
                {redirectUser()}
                <MDBRow center>
                    <MDBCol md="6">
                        <div className="text-center mt-4">
                            <MDBBtn color="primary" onClick={() => setValues({ email: "111111@111111.com", password: "111111" })}>User</MDBBtn>
                            <MDBBtn color="primary" onClick={() => setValues({ email: "000000@000000.com", password: "000000" })}>Admin</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow>
            </Layout>
        </>
    )
}

export default Signin;