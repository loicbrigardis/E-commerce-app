import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import moment from 'moment';

import Layout from '../core/Layout';
import { isAuthentificated } from '../auth';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthentificated()

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.err) {
                console.log(data.err);
            } else {
                setOrders(data);
            }
        })
    }
    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.err) {
                console.log(data.err);
            } else {
                setStatusValues(data);
            }
        })
    }

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, [])

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1>Total orders: {orders.length}</h1>
            )
        } else {
            return (
                <h1>No orders</h1>
            )
        }
    }

    const showInput = (key, value) => {
        return (
            <td>
                {key} : <input type="text" value={value} readOnly />
            </td>
        )
    }

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value)
            .then((data) => {
                if (data.err) {
                    console.log('Status update failed');
                } else {
                    loadOrders()
                }
            })
    }

    const showStatus = (order) => {
        return (
            <>
                <div>{order.status}</div>
                <select name="status" id="status" onChange={(e) => handleStatusChange(e, order._id)}>
                    <option value={order.status}>Update Status</option>
                    {statusValues.map((status, index) => (
                        <option key={index} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </>
        )
    }

    return (
        <Layout title="Orders" description="MLanage orders">
            {showOrdersLength()}

            <MDBTable hover>
                <MDBTableHead>
                    <tr>
                        <th>Order ID</th>
                        <th>Status</th>
                        <th>Transaction ID</th>
                        <th>Amount</th>
                        <th>Ordered By</th>
                        <th>Ordered On</th>
                        <th>Address</th>
                    </tr>
                </MDBTableHead>
                {orders.map((order, orderIndex) => {
                    return (
                        <MDBTableBody key={orderIndex} style={{ borderTop: '3px solid black' }}>
                            <tr style={{ background: 'lightblue' }}>
                                <td>{order._id}</td>
                                <td>{showStatus(order)}</td>
                                <td>{order.transaction_id}</td>
                                <td>{order.amount} €</td>
                                <td>{order.user.name}</td>
                                <td>{moment(order.createdAt).fromNow()}</td>
                                <td>{order.address}</td>
                            </tr>
                            <tr>
                                <td colSpan="7" align="center">
                                    <b>Total products in the order : {order.products.length}</b>
                                </td>
                            </tr>

                            {order.products.map((product, productIdex) => {
                                return (
                                    <tr key={productIdex} style={{ background: '#eee' }}>
                                        {showInput('Product name', product.name)}
                                        {showInput('Product price', product.price)}
                                        {showInput('Product total', product.count)}
                                        {showInput('Product Id', product._id)}
                                        <td colSpan="3"></td>
                                    </tr>

                                )
                            })}

                        </MDBTableBody>
                    )
                })}
            </MDBTable>
        </Layout>
    )
}

export default Orders;