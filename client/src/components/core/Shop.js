import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import { prices } from './fixedPrices';

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });

    //Load categories
    const init = () => {
        getCategories()
            .then(data => {
                if (data.err) {
                    setError(data.err)
                } else {
                    setCategories(data)
                }
            })
    }

    const loadFilteredResults = (newFilters) => {
        getFilteredProducts(skip, limit, newFilters)
            .then((data => {
                if (data.err) {
                    setError(data.err);
                } else {
                    setFilteredResults(data.products);
                    setSize(data.size);
                    setSkip(0)
                }
            }))
    }

    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters)
            .then((data => {
                if (data.err) {
                    setError(data.err);
                } else {
                    setFilteredResults([...filteredResults, ...data.products]);
                    setSize(data.size);
                    setSkip(toSkip);
                }
            }))
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <MDBBtn onClick={loadMore} color="primary">Load more</MDBBtn>
            )
        )
    }

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, [])

    const handleFilters = (filters, filterBy) => {
        console.log(filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy == "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }

        loadFilteredResults(myFilters.filters)

        setMyFilters(newFilters);
    }

    const handlePrice = id => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(id)) {
                array = data[key].array
            }
        }

        return array;
    }


    return (
        <Layout title="Shop page" description="Search book of your choice">
            <MDBRow>
                <MDBCol md="2">
                    <h4>Filter by categories</h4>
                    <ul className="pl-0">
                        <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, "category")} />
                    </ul>

                    <h4>Filter by price range</h4>
                    <ul className="pl-0">
                        <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, "price")} />
                    </ul>
                </MDBCol>
                <MDBCol md="10">
                    <h2>Products</h2>
                    <MDBRow center>
                        {filteredResults.map((product, i) => (
                            <MDBCol key={i} size="12" xs="10" sm="10" md="6" lg="4" className="mb-5">
                                <Card product={product} />
                            </MDBCol>
                        ))}
                    </MDBRow>
                    {loadMoreButton()}
                </MDBCol>
            </MDBRow>
        </Layout>
    )
};

export default Shop;