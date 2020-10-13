import React from "react";
import { Route } from "react-router-dom";

export function PropsToRoute({ component: Component, ...rest }: any) {
    return (
        <Route
            {...rest}
            render={(props) => <Component {...props} movies={{ ...rest }.data} />}
        />)
}