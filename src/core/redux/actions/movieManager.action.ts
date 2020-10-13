//Services
import { getShowTimeMovieListServices } from "./../../services/movieManager.service";
//Interface
import { IntroMovie } from "./../../interface/film/introFilm.class";
//Type
import { GET_MOVIES, GET_MOVIES_SUCCESS } from "./../types/movieManager.types";
import { GET_MOVIES_FAIL } from "./../types/movieManager.types";

const getMovies = () => ({
  type: GET_MOVIES,
});
const getMoviesSuccess = (data: IntroMovie[]) => ({
  type: GET_MOVIES_SUCCESS,
  payload: { data },
});
const getMoviesFail = (err: any) => ({
  type: GET_MOVIES_FAIL,
  payload: { err },
});

export const getMoviesAction = () => {
  return (dispatch: any) => {
    dispatch(getMovies());
    getShowTimeMovieListServices()
      .then((res: any) => {
        const newIntroMovies: IntroMovie[] = res.map(
          (item: any = {}, index: number) => {
            const newIntroMovie = new IntroMovie(
              item.maPhim,
              item.tenPhim,
              item.biDanh,
              item.trailer,
              item.hinhAnh,
              item.moTa,
              item.ngayKhoiChieu,
              item.danhGia,
              item.maNhom,
              index
            );
            return newIntroMovie;
          }
        );
        dispatch(getMoviesSuccess(newIntroMovies));
      })
      .catch((err) => dispatch(getMoviesFail(err)));
  };
};
