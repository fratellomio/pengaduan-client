import {
  SET_SEMUA_PENGADUAN,
  LIKE_PENGADUAN,
  UNLIKE_PENGADUAN,
  LOADING_DATA,
  DELETE_PENGADUAN,
  POST_PENGADUAN,
  SET_PENGADUAN,
  SUBMIT_COMMENT,
} from '../types';

const initialState = {
  semuaPengaduan: [],
  pengaduan: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SEMUA_PENGADUAN:
      return {
        ...state,
        semuaPengaduan: action.payload,
        loading: false,
      };
    case SET_PENGADUAN:
      return {
        ...state,
        pengaduan: action.payload,
      };
    case LIKE_PENGADUAN:
    case UNLIKE_PENGADUAN:
      var index = state.semuaPengaduan.findIndex(
        (pengaduan) => pengaduan.pengaduanId === action.payload.pengaduanId
      );
      state.semuaPengaduan[index] = action.payload;
      if (state.pengaduan.pengaduanId === action.payload.pengaduanId) {
        state.pengaduan = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_PENGADUAN:
      index = state.semuaPengaduan.findIndex(
        (pengaduan) => pengaduan.pengaduanId === action.payload
      );
      state.semuaPengaduan.splice(index, 1);
      return {
        ...state,
      };
    case POST_PENGADUAN:
      return {
        ...state,
        semuaPengaduan: [action.payload, ...state.semuaPengaduan],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        pengaduan: {
          ...state.pengaduan,
          comments: [action.payload, ...state.pengaduan.comments],
        },
      };
    default:
      return state;
  }
}
