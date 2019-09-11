import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/core/Home';
import Signin from './components/user/Signin';
import Signup from './components/user/Signup';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';
import Dashboard from './components/user/UserDashboard';
import AdminDashboard from './components/user/AdminDashboard';
import AddCategory from './components/admin/addCategory';
import AddProduct from './components/admin/addProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import Shop from './components/core/Shop';
import Product from './components/core/Product';
import Cart from './components/core/Cart';
import Orders from './components/admin/Orders';
import ManageProducts from './components/admin/ManageProducts';
import Profile from './components/user/Profile';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/product/:id" exact component={Product} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/category/create" exact component={AddCategory} />
                <AdminRoute path="/product/create/:userId" exact component={AddProduct} />
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                <AdminRoute path="/admin/orders" exact component={Orders} />
                <AdminRoute path="/admin/products" exact component={ManageProducts} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;