import * as React from 'react';
// Mat
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
//react-hook-form
import { useForm } from 'react-hook-form';
// Services
import { updateMovie } from '../../core/services/movieManager.service';
//Interface
import { IntroMovie } from './../../core/interface/film/introFilm.class';

export interface UpdateFormDialogComponentProps {
    slider: IntroMovie | null;
    open: boolean;
    onClose: () => void;
    onOpenAlert: () => void;
}

export function UpdateFormDialogComponent(props: UpdateFormDialogComponentProps) {
    const { slider, onOpenAlert } = props;
    //Check status user and password when entering
    const { register, handleSubmit } = useForm<IntroMovie>({});

    const onSubmit = (data: IntroMovie) => {
        updateMovie(data)
            .then(res => {
                onOpenAlert();
                window.location.reload();
            })
            .catch(err => {
                console.log({ ...err });
            })
    }

    const handleClose = () => {
        props.onClose();
    };

    return (
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Movie</DialogTitle>
            <DialogContent>
                <TextField
                    inputRef={register}
                    autoFocus
                    margin="dense"
                    name="_id"
                    label="ID"
                    fullWidth
                    defaultValue={slider?._id}
                />
                <TextField
                    inputRef={register}
                    margin="dense"
                    name="name"
                    label="Name"
                    fullWidth
                    defaultValue={slider?.name}
                />
                <TextField
                    inputRef={register}
                    margin="dense"
                    name="penName"
                    label="Penname"
                    fullWidth
                    defaultValue={slider?.penName}
                />
                <TextField
                    inputRef={register}
                    margin="dense"
                    name="trailerLink"
                    label="Trailer"
                    fullWidth
                    defaultValue={slider?.trailerLink}
                />
                <TextField
                    inputRef={register}
                    margin="dense"
                    name="image"
                    label="Image"
                    fullWidth
                    defaultValue={slider?.image}
                />
                <TextField
                    inputRef={register}
                    margin="dense"
                    name="description"
                    label="Describe"
                    fullWidth
                    defaultValue={slider?.description}
                />
                <TextField
                    inputRef={register}
                    margin="dense"
                    name="dateRelease"
                    label="DateRelease"
                    fullWidth
                    defaultValue={slider?.dateRelease}
                />
                <TextField
                    inputRef={register}
                    margin="dense"
                    name="rate"
                    label="Rate"
                    fullWidth
                    defaultValue={slider?.rate}
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