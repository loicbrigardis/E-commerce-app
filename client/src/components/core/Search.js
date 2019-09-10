import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCategories, list } from './apiCore';
import Card from './Card';
import { MDBCol, MDBRow, MDBDropdown, MDBDropdownItem, MDBDropdownToggle, MDBDropdownMenu, MDBFormInline, MDBBtn, MDBNavbarBrand, MDBCard, MDBNavbarToggler, MDBNavbar, MDBCollapse, MDBNavbarNav } from
    "mdbreact";

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    })

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories()
            .then(data => {
                if (data.err) {
                    console.log(data.err);
                } else {
                    setData({
                        ...data, categories: data
                    })
                }
            })
    }
    useEffect(() => {
        loadCategories()
    }, [])

    const searchData = () => {
        if (search) {
            list({ search: search || undefined, category })
                .then(res => {
                    if (res.err) {
                        console.log(res.err);
                    } else {
                        setData({ ...data, results: res, searched: true })
                    }
                })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        searchData();
    }

    const handleChange = (name) => e => {
        setData({ ...data, [name]: e.target.value, searched: false })
    }

    const searchMessage = (searched, results) => {
        if (searched && results.length <= 0) {
            return <p className="ml-3">No result found</p>;
        }
        if (searched && results.length > 0) {
            return <p className="ml-3"><b>{results.length} results</b> found</p>;
        }
    }

    const searchedProducts = (products = []) => {
        return (
            <>
                {searchMessage(searched, results)}
                <MDBRow>
                    {products.map((product, i) => (
                        <MDBCol key={i} sm="12" md="4" lg="3" className="mb-5">
                            <Card product={product} />
                        </MDBCol>))}
                </MDBRow>
            </>
        )
    }

    const searchForm = () => {
        return (
            <>
                <MDBRow>
                    <MDBCard className="card-body" style={{ width: "22rem", margin: "15px" }}>
                        <div style={{ display: "flex" }}>
                            <select
                                style={{ width: "25%" }}
                                className="browser-default custom-select"
                                onChange={handleChange('category')}
                            >
                                <option value="All">All categories</option>
                                {categories.map((c, i) => (
                                    <option key={i} value={c._id}>{c.name}</option>
                                ))}
                            </select>

                            <form style={{ width: "60%", paddingLeft: "2%" }} onSubmit={handleSubmit}>
                                <div className="form-group mb-0">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="search"
                                        aria-describedby="search"
                                        placeholder="Search"
                                        onChange={handleChange('search')}
                                    />
                                </div>
                            </form>

                            <div className="ml-3" >
                                <MDBBtn style={{ height: "38px", borderRadius: "5px", paddingTop: "0.5rem" }} outline color="primary" className="m-0">Search</MDBBtn>
                            </div>
                        </div>
                    </MDBCard>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        {searchedProducts(results)}
                    </MDBCol>
                </MDBRow>
            </>
        )
    }

    return (
        <>
            {searchForm()}
        </>
    )
}

export default Search;