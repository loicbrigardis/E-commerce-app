import React from "react";
import { Redirect, Route } from "react-router-dom";

import { isAuthentificated } from './index';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthentificated()
                    ? (<Component {...props} />)
                    : (<Redirect to={{ pathname: "/signin", state: { from: props.location } }} />)
            }
        />
    );
}

export default PrivateRoute;