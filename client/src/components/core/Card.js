import React, { useState, useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import moment, { updateLocale } from 'moment';
import InputRange from 'react-input-range';
import { MDBBtn, MDBBadge, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

import ShowImage from './showImage';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({ product, isSingle = false, showAddToCartButton = true, cartUpdate = false, showRemoveProductButton = false, ...rest }) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const singleProductView = () => (
        !isSingle && (<>
            <Link color="mdb-color" size="sm" to={`/product/${product._id}`}>View product</Link>
        </>)
    )

    const addToCard = () => {
        addItem(product, () => {
            setRedirect(true)
            console.log(redirect);
        })
    }

    const shouldRedirect = (redirect) => {
        if (redirect) {
            return <Redirect to='/cart' />
        }
    }


    const showAddToCart = (showAddToCartButton) => {
        if (showAddToCartButton) {
            return (
                <MDBBtn onClick={addToCard} size="sm" color="indigo" href="" > Add to the cart</MDBBtn>
            )
        }

    }

    const handleChange = (productId, value) => {
        setCount(value < 1 ? 1 : value)
        if (value >= 1) {
            updateItem(productId, value);
        }
    }

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && (
            <>
                <h5 className="mb-3">Quantity</h5>
                <InputRange
                    maxValue={20}
                    minValue={1}
                    value={count}
                    onChange={(value) => handleChange(product._id, value)} />
                <br />
            </>
        )
    }

    const showCartRemoveButton = showRemoveProductButton => {
        return cartUpdate && (
            <>
                <button
                    onClick={() => {
                        removeItem(product._id);
                        // setRedirect(true);
                    }}
                    type="button"
                    className="btn btn-light btn-sm">Remove product</button>
            </>
        )
    }


    const showStock = (product) => {
        return product > 0 ? (<MDBBadge color="info">In stock</MDBBadge>) : (<MDBBadge color="warning">Not in stock</MDBBadge>)
    }

    return (
        <MDBCard style={{ maxWidth: "255px", margin: "0 auto" }}>
            {shouldRedirect(redirect)}
            <ShowImage item={product} url="product" />
            <MDBCardBody>
                <MDBCardTitle>{product.name}</MDBCardTitle>
                <MDBCardText>
                    {product.description.substring(0, 100)}...
                </MDBCardText>
                <MDBCardText>
                    {product.price} €
                </MDBCardText>
                <MDBCardText>
                    Category: {product.category && product.category.name}
                </MDBCardText>
                <MDBCardText>
                    Added on {moment(product.createdAt).fromNow()}
                </MDBCardText>

                {showStock(product.quantity)}
                <br />
                {singleProductView()}
                <br />
                {showAddToCart(showAddToCartButton)}

                {showCartUpdateOptions(cartUpdate)}

                {showCartRemoveButton(showCartRemoveButton)}

            </MDBCardBody>
        </MDBCard>
    )
}

export default Card;