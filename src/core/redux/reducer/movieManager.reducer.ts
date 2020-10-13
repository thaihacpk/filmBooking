import {
  GET_MOVIES,
  GET_MOVIES_FAIL,
  GET_MOVIES_SUCCESS,
} from "./../types/movieManager.types";

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

const movieManagerReducer = (state = initialState, action: any = {}) => {
  switch (action.type) {
    case GET_MOVIES: {
      return {
        movies: [],
        loading: true,
        error: null,
      };
    }
    case GET_MOVIES_SUCCESS: {
      return {
        movies: action.payload.data,
        loading: false,
        error: null,
      };
    }
    case GET_MOVIES_FAIL: {
      return {
        movies: [],
        loading: false,
        error: action.payload.error,
      };
    }

    default:
      return state;
  }
};
export default movieManagerReducer;
