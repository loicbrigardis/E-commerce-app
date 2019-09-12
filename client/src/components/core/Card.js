import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import InputRange from 'react-input-range';
import { MDBBtn, MDBBadge, MDBCard, MDBIcon, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';

import ShowImage from './showImage';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({ product, refreshPage, isSingle = false, showAddToCartButton = true, cartUpdate = false, showRemoveProductButton = false, ...rest }) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const singleProductView = () => (
        !isSingle && (<>
            <MDBBtn outline color="info" size="sm">
                <Link color="mdb-color" size="sm" to={`/product/${product._id}`}>More infos</Link>
            </MDBBtn>
        </>)
    )

    const addToCard = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    }

    const shouldRedirect = (redirect) => {
        if (redirect) {
            return <Redirect to='/cart' />
        }
    }

    const showAddToCart = (showAddToCartButton) => {
        if (showAddToCartButton && product.quantity > 0) {
            return (
                <MDBBtn className="float-right" onClick={addToCard} size="sm" color="indigo" href="" >
                    <MDBIcon icon="shopping-cart" />
                </MDBBtn>
            )
        }

    }

    const handleChange = (productId, value) => {
        setCount(value < 1 ? 1 : value);
        if (value >= 1) {
            updateItem(productId, value);
            refreshPage();
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
                        refreshPage();
                    }}
                    type="button"
                    className="btn btn-light btn-sm">Remove product</button>
            </>
        )
    }

    const showStock = (product) => {
        return product > 0
            ? (<MDBBadge className="ml-2" color="info">In stock</MDBBadge>)
            : (<MDBBadge className="ml-2" color="warning">Not in stock</MDBBadge>)
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

                {showAddToCart(showAddToCartButton)}

                {showCartUpdateOptions(cartUpdate)}

                {showCartRemoveButton(showCartRemoveButton)}

            </MDBCardBody>
        </MDBCard>
    )
}

export default Card;