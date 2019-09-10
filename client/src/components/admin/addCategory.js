import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBAlert, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

import Layout from '../core/Layout';
import { isAuthentificated } from '../auth';
import { createCategory } from './apiAdmin';


const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthentificated();

    const handleChange = (e) => {
        setError(false);
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //API
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.err) {
                    setSuccess(false);
                    setError(true);
                } else {
                    setError(false);
                    setSuccess(true);
                }
            })
    }

    const newCategoryForm = () => (
        <MDBRow center>
            <MDBCol md="6">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name" className="grey-text">Category name</label>
                    <input
                        type="text"
                        id="name"
                        className={
                            error
                                ? "form-control is-invalid"
                                : 'form-control'
                        }
                        minLength="2"
                        value={name}
                        onChange={handleChange}
                        autoFocus
                        required
                    />
                    <div className="text-center mt-4">
                        <MDBBtn color="indigo" type="submit">Create category</MDBBtn>
                    </div>
                    <div className="text-center mt-4">
                        {goBack()}
                    </div>
                </form>
            </MDBCol>
        </MDBRow>
    )

    const showSuccess = () => {
        if (success) {
            return (
                <MDBAlert color="success" >
                    {name} is created!
                </MDBAlert>
            )
            setName('');
        }
    }

    const showError = () => {
        if (error) {
            return (
                <MDBAlert color="danger" >
                    Category {name} already exist!
                </MDBAlert>
            )
        }
    }

    const goBack = () => {
        return (
            <Link to='/admin/dashboard'>Back to Dashboard</Link>
        )
    }

    return (
        <>
            <Layout title="Category" description="Create a new category">
                {showSuccess()}
                {showError()}
                {newCategoryForm()}
            </Layout>
        </>
    )
}

export default AddCategory;