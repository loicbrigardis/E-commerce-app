import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import { MDBBtn, MDBAlert, MDBInput } from "mdbreact";

import Card from './Card';
import { isAuthentificated } from '../auth';
import { getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import { emptyCart } from './cartHelpers';

const Checkout = ({ products }) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const userId = isAuthentificated() && isAuthentificated().user._id;
    const token = isAuthentificated() && isAuthentificated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token)
            .then(data => {
                console.log(data);
                if (data.err) {
                    setData({ ...data, error: data.err })
                } else {
                    setData({ clientToken: data.clientToken })
                }
            })
    }

    useEffect(() => {
        getToken(userId, token);
    }, [])

    const getTotal = () => {
        return products.reduce((acc, product) => {
            return acc + product.count * product.price;
        }, 0)
    }

    const showCheckout = () => {
        return isAuthentificated() ? (
            <div>{showDropIn()}</div>
        ) : (
                <Link to="signin">
                    <button type="button" className="btn btn-primary">Sign in to Checkout</button>
                </Link>
            )

    }

    let deliveryAddress = data.address;

    const buy = () => {
        setData({ loading: true })
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                console.log(data);
                nonce = data.nonce;

                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                }

                processPayment(userId, token, paymentData)
                    .then(res => {
                        console.log(res);
                        const createOrderData = {
                            products: products,
                            transaction_id: res.transaction.id,
                            amount: res.transaction.amount,
                            address: deliveryAddress
                        }

                        createOrder(userId, token, createOrderData);

                        setData({ ...data, success: res.success })
                        emptyCart(() => {
                            setData({ loading: false, success: true })
                            console.log('payment success and empty cart');
                        })
                        //create order
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(error => {
                setData({ ...data, error: error.message })
                setData({ loading: false })
                console.error(error);
            })
    }



    const handleAddress = (e) => {
        setData({ ...data, address: e.target.value })
    }

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: "" })}>
            {data.clientToken !== null && products.length > 0
                ? (
                    <div>
                        <MDBInput
                            onChange={handleAddress}
                            type="textarea"
                            label="Your delivery address:"
                            background
                        />
                        <DropIn options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }} onInstance={instance => setData({ ...data, instance: instance })} />

                        <MDBBtn onClick={buy} className="btn-block" color="success">Pay</MDBBtn>
                    </div>
                )
                : null}
        </div>
    )

    const showError = error => {
        if (error) {
            return (
                <MDBAlert color="danger" > {error} </MDBAlert>
            )
        }
    }

    const showSuccess = success => {
        if (success) {
            return (
                <MDBAlert color="info" > Thanks! your payment was successfull </MDBAlert>
            )
        }
    }

    const showLoading = loading => {
        if (loading) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }
    }

    return (<div>
        <h2>Total: {getTotal()} €</h2>
        {showLoading(data.loading)}
        {showError(data.error)}
        {showSuccess(data.success)}
        {showCheckout()}
    </div>)
}

export default Checkout;