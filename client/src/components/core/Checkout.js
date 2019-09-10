import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import { isAuthentificated } from '../auth'

const Checkout = ({ products }) => {

    const getTotal = () => {
        return products.reduce((acc, product) => {
            return acc + product.count * product.price;
        }, 0)
    }

    const showCheckout = () => {
        return isAuthentificated() ? (
            <button type="button" className="btn btn-success">Chekout</button>
        ) : (
                <Link to="signin">
                    <button type="button" className="btn btn-primary">Sign in to Checkout</button>
                </Link>
            )

    }

    return (<div>
        <h2>Total: {getTotal()} €</h2>

        {showCheckout()}
    </div>)
}

export default Checkout;