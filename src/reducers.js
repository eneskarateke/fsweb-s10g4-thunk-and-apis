import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  RESET_FAVS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: false,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      const newFav = {
        key: Date.now(),
        id: Date.now() + 1,
        activity: action.payload.activity,
      };
      const updatedFavs = [...state.favs, newFav];
      writeFavsToLocalStorage({ ...state, favs: updatedFavs });
      return {
        ...state,
        favs: updatedFavs,
      };

    case FAV_REMOVE:
      return {
        ...state,
        favs: state.favs.filter((activity) => activity.id !== action.payload),
      };

    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        current: action.payload,
        loading: false,
        error: "",
      };

    case FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_FAVS_FROM_LS:
      const storedFavs = readFavsFromLocalStorage();
      if (storedFavs) {
        return {
          ...state,
          favs: storedFavs,
        };
      } else {
        return state;
      }
    case RESET_FAVS:
      writeFavsToLocalStorage({ ...state, favs: [] });
      return {
        ...state,
        favs: [],
      };
    default:
      return state;
  }
}
