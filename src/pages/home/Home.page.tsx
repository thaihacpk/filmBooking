import * as React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// Protected Route
import { ProtectedRoute } from '../../auth/protected.route';
//Redux - action
import { getMoviesAction } from '../../core/redux/actions/movieManager.action';
import ComingSoonPage from './comingSoon/ComingSoon.page';
import ContactUsPage from './contactUs/ContactUs.page';
import ReviewsPage from './newReviews/Reviews.page';
import ShowTimesPage from './showTimes/ShowTimes.page';
// Components
const NavComponent = React.lazy(() => import('../../common/nav/Nav.component'));
const NewOnScreensPage = React.lazy(() => import('./newOnScreens/NewOnScreens.page'));
const MovieDetailPage = React.lazy(() => import('../movie/detail/MovieDetail.page'));
const BookSeatPage = React.lazy(() => import('../movie/seat/BookSeat.page'));
const LoginPage = React.lazy(() => import('../login/Login.page'));
const RegisterPage = React.lazy(() => import('../register/Register.page'));
const LoadingComponent = React.lazy(() => import('../../common/loading/Loading.component'));

export interface HomePageProps {
    userlogin: string;
    loading: boolean;
    doGetMovies: () => void;
}
const HomePage = (props: HomePageProps) => {
    const { userlogin, loading, doGetMovies } = props;

    React.useEffect(() => {
        doGetMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) return <LoadingComponent />
    return (
        <BrowserRouter>
            <Fragment>
                <NavComponent />
                <Switch>
                    <Route exact path="/" component={NewOnScreensPage} />
                    <Route path="/showtimes" component={ShowTimesPage} />
                    <Route path="/comingsoon" component={ComingSoonPage} />
                    <Route path="/reviews" component={ReviewsPage} />
                    <Route path="/contactus" component={ContactUsPage} />
                    <Route path="/movie-detail/:id" component={MovieDetailPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <ProtectedRoute authed={`${userlogin}`} path="/seat/:id" component={BookSeatPage} />
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
}

const mapStateToProps = (state: any) => ({
    userlogin: state.userManagerReducer.user,
    loading: state.movieManagerReducer.loading,
})
const mapDispatchToProps = (dispatch: any) => ({
    doGetMovies: () => dispatch(getMoviesAction())
})
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);