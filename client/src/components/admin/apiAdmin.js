import { API } from '../../config';

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.error(err))
}

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.error(err))
}

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.error(err))
}

export const listOrders = (uderId, token) => {
    return fetch(`${API}/order/list/${uderId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.error(err))
}

export const getStatusValues = (uderId, token) => {
    return fetch(`${API}/order/status-values/${uderId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.error(err))
}

export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, orderId })
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.error(err))
}

// CRUD ON PRODUCT

export const getProducts = () => {
    return fetch(`${API}/products?limit=100`, {
        method: "GET"
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.error(err))
}

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.error(err))
}

export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.error(err))
}

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.error(err))
}