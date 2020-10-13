import React from "react";
import { Route, Redirect } from "react-router-dom";

export function ProtectedRoute({ component: Component, authed, ...rest }: any) {
    return (
        <Route
            {...rest}
            render={(props) => authed !== ""
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}