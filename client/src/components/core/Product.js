import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import Layout from './Layout';
import { read } from './apiCore';
import Card from './Card';
import { listRelated } from './apiCore';

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [relatedProduct, setRelatedProduct] = useState([]);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.err) {
                setError(data.err);
            } else {
                setProduct(data);
                listRelated(data._id)
                    .then(data => {
                        if (data.err) {
                            setError(data.err);
                        } else {
                            setRelatedProduct(data);
                        }
                    })
            }
        })
    }

    useEffect(() => {
        const productId = props.match.params.id;
        loadSingleProduct(productId)
    }, [props])

    return (
        <Layout title={product.name} description={product && product.description && product.description.substring(0, 100)}>

            <MDBRow>
                <MDBCol md="8">
                    <h2>Product</h2>
                    {product && product.description && product.description && (
                        <Card product={product} isSingle={true} />
                    )}
                </MDBCol>
                <MDBCol md="4">
                    <h4>Related product</h4>
                    {error ? <p>{error}</p> : ''}
                    {relatedProduct.map((product, i) => (
                        <Card key={i} product={product} />
                    ))}
                </MDBCol>
            </MDBRow>
        </Layout>
    )
}

export default Product;