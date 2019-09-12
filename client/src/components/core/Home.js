import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold')
            .then(data => {
                if (data.err) {
                    setError(data.err);
                } else {
                    setProductsBySell(data);
                }
            })
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt')
            .then(data => {
                if (data.err) {
                    setError(data.err);
                } else {
                    setProductsByArrival(data);
                }
            })
    }

    useEffect(() => {
        loadProductsBySell();
        loadProductsByArrival();
    }, [])

    return (
        <Layout title="E-Books everywhere" description="Expand your imagination">
            <Search />
            {error ? <p>{error}</p> : ''}
            <h2>New Arrivals Sellers</h2>
            <MDBRow>
                {productsByArrival.map((product, i) => (
                    <MDBCol key={i} sm="12" md="4" lg="3" className="mb-5">
                        <Card product={product} />
                    </MDBCol>
                ))}
            </MDBRow>

            <h2>Best Sellers</h2>
            <MDBRow>
                {productsBySell.map((product, i) => (
                    <MDBCol key={i} sm="12" md="4" lg="3" className="mb-5">
                        <Card product={product} />
                    </MDBCol>
                ))}
            </MDBRow>
        </Layout>
    )
}

export default Home;