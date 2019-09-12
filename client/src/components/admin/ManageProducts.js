import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBBtn } from 'mdbreact';
import { isAuthentificated } from '../auth';
import { getProducts, deleteProduct } from './apiAdmin';

import Layout from '../core/Layout';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthentificated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.err) {
                console.log(data.err);
            } else {
                setProducts(data)
            }
        })
    }

    useEffect(() => {
        loadProducts();
    }, [])

    const destroy = (productId) => {
        const confirmed = window.confirm("Are you sure you want delete this product?")
        if (confirmed) {
            deleteProduct(productId, user._id, token)
                .then(data => {
                    if (data.err) {
                        console.log(data.err);
                    } else {
                        loadProducts();
                    }

                })
        }
    }

    return (
        <Layout title="Manage products" description="Perform CRUD on products">
            <h2>Manage products</h2>
            <MDBRow>
                <MDBCol>
                    <h2>Total products : {products.length}</h2>
                    <MDBListGroup>
                        {products.map((product, i) => {
                            return (
                                <MDBListGroupItem key={i}>
                                    {product.name}
                                    <MDBBtn
                                        style={{ float: "right" }}
                                        size="sm"
                                        color="danger"
                                        onClick={() => destroy(product._id)}
                                    >Delete</MDBBtn>
                                    <MDBBtn
                                        style={{ float: "right" }}
                                        size="sm"
                                        color="success"><Link style={{ color: "white" }} to={`/admin/product/update/${product._id}`}>Update</Link></MDBBtn>
                                </MDBListGroupItem>
                            )
                        })}
                    </MDBListGroup>
                </MDBCol>
            </MDBRow>
        </Layout>
    )
}

export default ManageProducts;