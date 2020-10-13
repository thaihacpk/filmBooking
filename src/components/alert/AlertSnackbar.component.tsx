import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export interface AlertSnackbarComponentProps {
    open: boolean;
    onClose: () => void;
}

export function AlertSnackbarComponent(props: AlertSnackbarComponentProps) {

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        props.onClose();
    };
    return (
        <div>

            <Snackbar open={props.open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Success !
                </Alert>
            </Snackbar>
        </div>

    )
}