import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBAlert, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

import Layout from '../core/Layout';
import { signup } from '../auth';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: [],
        success: false
    });

    const { name, email, password, error, success } = values;

    const handleChange = (e) => {
        setValues({ ...values, error: false, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signup({ name, email, password })
            .then(data => {
                if (data.err) {
                    setValues({ ...values, error: data.err, success: false })
                } else {
                    setValues({ ...values, name: '', email: '', password: '', error: '', success: true })
                }
            })
    }



    const signupForm = () => {
        return (
            <MDBRow center>
                <MDBCol md="6">
                    <form>
                        <p className="h4 text-center mb-4">Sign up</p>
                        <label htmlFor="name" className="grey-text">
                            Your name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className={
                                error.hasOwnProperty("name")
                                    ? "form-control is-invalid"
                                    : 'form-control'
                            }
                            name="name"
                            value={name}
                            onChange={(e) => handleChange(e)}
                        />
                        {/* name check */}
                        {error && error.name
                            ? error.name.map((pass, i) => (
                                <div className="invalid-feedback" key={i}>{pass.msg}</div>
                            ))
                            : ""
                        }
                        {/* /name check */}
                        <br />
                        <label htmlFor="email" className="grey-text">
                            Your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={
                                error.hasOwnProperty("email")
                                    ? "form-control is-invalid"
                                    : 'form-control'
                            }
                            name="email"
                            value={email}
                            onChange={(e) => handleChange(e)}
                        />
                        {/* email check */}
                        {error && error.email
                            ? error.email.map((pass, i) => (
                                <div className="invalid-feedback" key={i}>{pass.msg}</div>
                            ))
                            : ""
                        }
                        {/* /email check */}
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
                            className={
                                error.hasOwnProperty("password")
                                    ? "form-control is-invalid"
                                    : 'form-control'
                            }
                            value={password}
                            onChange={(e) => handleChange(e)}
                        />
                        {/* Password check */}
                        {error && error.password
                            ? error.password.map((pass, i) => (
                                <div className="invalid-feedback" key={i}>{pass.msg}</div>
                            ))
                            : ""
                        }
                        {/* /Password check */}
                        <div className="text-center mt-4">
                            <MDBBtn color="unique" type="submit" onClick={handleSubmit}>
                                Signup
                        </MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        )
    }

    const showSuccess = () => {
        return (
            <div style={{ display: success ? 'block' : 'none' }}>
                <MDBAlert color="info">
                    New account created. Please <Link to="/signin">Signin</Link>
                </MDBAlert>
            </div>

        )
    }

    return (
        <>
            <Layout title="Signup" description="Signup to E-commerce site">
                {showSuccess()}

                {signupForm()}
            </Layout>
        </>
    )
}

export default Signup;