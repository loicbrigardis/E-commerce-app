import React, { useState, useEffect } from 'react';
import { MDBAlert, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';

import Layout from '../core/Layout';
import { isAuthentificated } from '../auth';
import { createProduct, getCategories } from './apiAdmin';


const AddProduct = () => {
    const { user, token } = isAuthentificated();
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: '',
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })

    const { name, description, price, categories, photo, quantity, loading, error, createdProduct, formData } = values;

    //Load categoeries
    const init = () => {
        getCategories()
            .then(data => {
                if (data.err) {
                    setValues({ ...values, error: data.err })
                } else {
                    setValues({ ...values, categories: data, formData: new FormData() })
                }
            })
    }

    useEffect(() => {
        init();
    }, [])

    const handleChange = (e) => {
        const value = e.target.name === 'photo' ? e.target.files[0] : e.target.value;

        formData.set([e.target.name], value);
        setValues({
            ...values,
            [e.target.name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: '', loading: true });
        createProduct(user._id, token, formData)
            .then((data) => {
                if (data.err) {
                    setValues({ ...values, error: data.err });
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        price: '',
                        category: '',
                        shipping: '',
                        quantity: '',
                        photo: '',
                        loading: false,
                        error: '',
                        createdProduct: data.name,
                    })
                }
            })
    }

    const newProductForm = () => (
        <MDBRow center>
            <MDBCol md="6">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name" className="grey-text">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
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

                    <label htmlFor="description" className="grey-text">Description</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon">
                                <i className="fas fa-pencil-alt prefix"></i>
                            </span>
                        </div>
                        <textarea
                            className={
                                error
                                    ? "form-control is-invalid"
                                    : 'form-control'
                            }
                            id="description"
                            name="description"
                            minLength="2"
                            rows="5"
                            value={description}
                            onChange={handleChange}
                            required
                        >

                        </textarea>
                    </div>
                    <label htmlFor="price" className="grey-text">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        min="1"
                        className={
                            error
                                ? "form-control is-invalid"
                                : 'form-control'
                        }
                        value={price}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="choose-photo">
                                <MDBIcon icon="file-upload" />
                            </span>
                        </div>
                        <div className="custom-file">
                            <input
                                type="file"
                                className="custom-file-input"
                                aria-describedby="choose-photo"
                                name="photo"
                                id="photo"
                                accept="image/*"
                                onChange={handleChange}
                            />
                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                                {photo ? photo.name : 'Choose a photo'}
                            </label>
                        </div>
                    </div>
                    <label htmlFor="category" className="grey-text">Category</label>
                    <div>
                        <select
                            className="browser-default custom-select"
                            onChange={handleChange}
                            name="category"
                            id="category"
                        >
                            <option>Choose your category</option>
                            {categories && categories.map((categorie, i) =>
                                (<option key={i} value={categorie._id}>{categorie.name}</option>))
                            }
                        </select>
                    </div>
                    <label htmlFor="quantity" className="grey-text">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        className={
                            error
                                ? "form-control is-invalid"
                                : 'form-control'
                        }
                        min="1"
                        value={quantity}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="shipping" className="grey-text">Shipping</label>
                    <div>
                        <select
                            className="browser-default custom-select"
                            onChange={handleChange}
                            name="shipping"
                            id="shipping"
                        >
                            <option>Do you want shipping ?</option>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>
                    <div className="text-center mt-4">
                        <MDBBtn color="indigo" type="submit">Create product</MDBBtn>
                    </div>
                </form>
            </MDBCol>
        </MDBRow>
    )

    const showSuccess = () => {
        if (createdProduct) {
            return (
                <MDBAlert color="success" >
                    {createdProduct} is created
                </MDBAlert>
            )
        }
    }

    const showError = () => {
        if (error) {
            console.log(error);
            return (
                <MDBAlert color="danger" >
                    {error[0].msg}
                </MDBAlert>
            )
        }
    }

    const showLoading = () => {
        if (loading) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }
    }

    return (
        <>
            <Layout title="Product" description="Create a new product">
                {showLoading()}
                {showSuccess()}
                {showError()}
                {newProductForm()}
            </Layout>
        </>
    )
}

export default AddProduct;