import * as React from 'react';
//mat 
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
//react-hook-form
import { useForm } from 'react-hook-form';
//interface
import { IntroMovie } from './../../core/interface/film/introFilm.class';
//services
import { postAddMovie } from '../../core/services/movieManager.service';

export interface AddFormDialogComponentProps {
    open: boolean;
    onClose: () => void;
    onOpenAlert: () => void;

}

export function AddFormDialogComponent(props: AddFormDialogComponentProps) {
    const { register, handleSubmit } = useForm<IntroMovie>({});

    const handleClose = () => {
        props.onClose();
    };

    const onSubmit = (data: IntroMovie) => {
        postAddMovie(data)
            .then(res => {
                props.onOpenAlert();
                window.location.reload();
            })
            .catch(err => console.log({ ...err }))
    }

    return (
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add movie</DialogTitle>
            <DialogContent>
                <TextField
                    inputRef={register}
                    autoFocus
                    margin="dense"
                    name="_id"
                    label="ID"
                    fullWidth
                />
                <TextField
                    inputRef={register}
                    margin="dense"
                    name="name"
                    label="Name"
                    fullWidth
                />
                <TextField
                    inputRef={register}
                    margin="dense"
                    name="penName"
                    label="Penname"
                    fullWidth
                />
                <TextField
                    inputRef={register}
                    margin="dense"
                    name="trailerLink"
                    label="Trailer"
                    fullWidth
                />
                <TextField
                    inputRef={register}
                    margin="dense"
                    name="image"
                    label="Image"
                    fullWidth
                />
                <TextField
                    inputRef={register}
                    margin="dense"
                    name="description"
                    label="Describe"
                    fullWidth
                />
                <TextField
                    inputRef={register}
                    margin="dense"
                    name="dateRelease"
                    label="DateRelease"
                    fullWidth
                />
                <TextField
                    inputRef={register}
                    margin="dense"
                    name="rate"
                    label="Rate"
                    fullWidth
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary">
                    Submit
          </Button>
            </DialogActions>
        </Dialog>
    );
}