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
import addProduct from './components/admin/addProduct';
import Shop from './components/core/Shop';
import Product from './components/core/Product';
import Cart from './components/core/Cart';

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
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/category/create" exact component={AddCategory} />
                <AdminRoute path="/product/create" exact component={addProduct} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;