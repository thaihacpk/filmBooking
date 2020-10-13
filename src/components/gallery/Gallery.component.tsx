import React from 'react';
// // Scss
import './Gallery.component.scss';
// Mat
import LaunchIcon from '@material-ui/icons/Launch';
//
import ReactBnbGallery from 'react-bnb-gallery';

const photos = [{
    photo: "https://source.unsplash.com/aZjw7xI3QAA/1144x763",
    caption: "Viñales, Pinar del Río, Cuba",
    subcaption: "Photo by Simon Matzinger on Unsplash",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
}, {
    photo: "https://source.unsplash.com/c77MgFOt7e0/1144x763",
    caption: "La Habana, Cuba",
    subcaption: "Photo by Gerardo Sanchez on Unsplash",
    thumbnail: "https://source.unsplash.com/c77MgFOt7e0/100x67",
}, {
    photo: "https://source.unsplash.com/QdBHnkBdu4g/1144x763",
    caption: "Woman smoking a tobacco",
    subcaption: "Photo by Hannah Cauhepe on Unsplash",
    thumbnail: "https://source.unsplash.com/QdBHnkBdu4g/100x67",
}];

export interface GalleryComponentProps {
}
export interface GalleryComponentState {
    galleryOpened: boolean;

}
export default class GalleryComponent extends React.Component<GalleryComponentProps, GalleryComponentState> {
    constructor(props: GalleryComponentProps) {
        super(props);
        this.state = { galleryOpened: false };
        this.toggleGallery = this.toggleGallery.bind(this);
    }

    toggleGallery() {
        this.setState(prevState => ({
            galleryOpened: !prevState.galleryOpened
        }));
    }

    render = () => {
        return (
            <div className="gallery-css">
                <button onClick={() => this.setState({ galleryOpened: true })}>
                    <h3>    <LaunchIcon /> Open photo gallery</h3>
                </button>
                <ReactBnbGallery
                    show={this.state.galleryOpened}
                    photos={photos}
                    showThumbnails={true}
                    onClose={this.toggleGallery}
                />
            </div>
        )
    }
}