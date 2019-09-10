import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import Card from './Card';
import Checkout from './Checkout';
import { getCart, removeItem } from './cartHelpers';
import { MDBCol, MDBRow } from 'mdbreact';


const Cart = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart())
    }, [])

    const showItems = items => {
        return (
            <>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => (
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        showRemoveProductButton={true}
                        cartUpdate={true}
                    />
                ))}
            </>
        )
    }

    const noItemsMessage = () => (
        <>
            <h2>Your cart is empty</h2> <br />
            <Link to="/shop">Continue shopping</Link>
        </>
    )

    return (
        <Layout title="Shopping Cart" description="Manage your cart items. Add remove or continue shopping">
            <MDBRow>
                <MDBCol md="6">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </MDBCol>
                <MDBCol md="6">
                    <Checkout products={items} />
                </MDBCol>
            </MDBRow>
        </Layout>
    )
}

export default Cart;