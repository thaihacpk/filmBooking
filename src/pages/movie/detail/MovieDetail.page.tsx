import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Fragment } from 'react';
// Scss
import './MovieDetail.page.scss'
// Mat
// import { Icon } from '@material-ui/core';    
// Interface
import { DetailMovie } from '../../../core/interface/film/detailFilm.class';
// Moment
import moment from 'moment';
// Component
// import FooterComponent from '../../../common/footer/Footer.component';
import { TrailerDialogComponent } from '../../../components/trailerDialog/TrailerDialog.component';
import GalleryComponent from './../../../components/gallery/Gallery.component';
// Services
import { getMovieDetail } from '../../../core/services/movieManager.service';

export interface MovieDetailPageProps {
    match: any,
}
export interface MovieDetailPageState {
    property: DetailMovie | null;
    openTrailer: boolean;
    urlTrailer: string;
}

export default class MovieDetailPage extends React.Component<MovieDetailPageProps, MovieDetailPageState> {
    constructor(props: MovieDetailPageProps) {
        super(props);

        this.state = {
            property: null,
            openTrailer: false,
            urlTrailer: '',
        }
    }


    componentDidMount = () => {
        this.doGetMovieDetail();
    }

    doGetMovieDetail = () => {
        getMovieDetail(this.props.match.params.id)
            .then(result => {
                console.log("result.data", result.data);
                const { heThongRapChieu, maPhim, tenPhim, biDanh, trailer, hinhAnh, moTa, maNhom, ngayKhoiChieu, danhGia } = result.data;
                const detailMovie: DetailMovie = new DetailMovie(
                    heThongRapChieu, maPhim, tenPhim, biDanh, trailer, hinhAnh, moTa, maNhom, ngayKhoiChieu, danhGia, 0
                )
                this.setState({ property: detailMovie })
            })
            .catch(err => {
                console.log({ ...err });
            })
    }

    handleCloseTrailer = () => {
        this.setState({ openTrailer: false, urlTrailer: '' });
    };

    renderTheaters = () => {
        const { property } = this.state;
        return (
            property !== null &&
            <Fragment>
                {
                    property.systemCinema?.map((heThongRap: any, index: number) => {
                        return (
                            property.groupID === "GP14" &&
                            <div key={index}>
                                <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }} >
                                    <img src={heThongRap.logo} style={{ width: 30, height: 30, margin: '0 10px' }} alt="" />
                                    {heThongRap.tenHeThongRap}
                                </div>
                                <div className="movie-detail__showtimes">
                                    {heThongRap.cumRapChieu?.map((cumRap: any, index: number) => {
                                        return <Fragment key={index}>
                                            {cumRap.lichChieuPhim?.slice(0, 6).map((lichChieu: any, index: number) => {
                                                return (
                                                    <NavLink key={lichChieu.maLichChieu} exact to={`/seat/${lichChieu.maLichChieu}`}>{
                                                        moment(lichChieu.ngayChieuGioChieu).format('HH:mm')
                                                    }</NavLink>
                                                )
                                            })}
                                        </Fragment>
                                    })}
                                </div>
                            </div>
                        );
                    })
                }
            </Fragment>
        )
    }

    render() {
        const { property, openTrailer, urlTrailer } = this.state;
        return (
            property !== null &&
            <Fragment>
                <div className="movie-detail">
                    <img src={property.image} alt="" />
                    <div className="overlay"></div>

                    <div className="movie-detail__content">
                        {/* <div className="movie-detail__trailer-btn" onClick={() => {
                            this.setState({ openTrailer: true, urlTrailer: property.trailerLink });
                        }}>
                            <div><Icon fontSize="large">play_arrow</Icon></div>
                        </div> */}
                        <div className="movie-detail__title">
                            <h4>{property.types.join(' / ')}</h4>
                            <h1 style={{ color: 'var(--color-yellow)' }}>{property.name}</h1>
                        </div>
                        <div className="movie-detail__theaters">
                            {this.renderTheaters()}
                        </div>
                        <div className="movie-detail__intro">
                            <div>
                                <img src={property.image} alt="" />
                                <div>
                                    <GalleryComponent />
                                </div>
                            </div>
                            <div>
                                <ul style={{ borderRight: '1px solid white' }}>
                                    <li>
                                        <h3>Year</h3>
                                        <p>2017</p>
                                    </li>
                                    <li>
                                        <h3>Country</h3>
                                        <p>USA</p>
                                    </li>
                                    <li>
                                        <h3>Language</h3>
                                        <p>Original (without subtitles)</p>
                                    </li>
                                    <li>
                                        <h3>Starring</h3>
                                        <p >Gal gadot, Robin Wright, Chris Pine, Connie Nielsen, David Thewlis, Elena Anaya, Lucy Davis</p>
                                    </li>
                                    <li>
                                        <h3>Directed by</h3>
                                        <p>Patty Jenkins</p>
                                    </li>
                                    <li>
                                        <h3>Written by</h3>
                                        <p>Allan Heinberg, William Moulton Marston, Zack Snyder</p>
                                    </li>
                                    <li>
                                        <h3>Release dates</h3>
                                        <p>{property.dateRelease}</p>
                                    </li>
                                    <li>
                                        <h3>Running time</h3>
                                        <p>141 minites</p>
                                    </li>
                                    <li>
                                        <h3>Age limit</h3>
                                        <p>12+</p>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <h3 style={{ paddingBottom: '8px' }}>Synopsis</h3>
                                        <p>{property.description}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <TrailerDialogComponent open={openTrailer} trailerUrl={urlTrailer} onClose={this.handleCloseTrailer}></TrailerDialogComponent>
            </Fragment>
        )
    }

}