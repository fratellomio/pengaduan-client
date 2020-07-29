import {
  SET_SEMUA_PENGADUAN,
  SET_PENGADUAN,
  POST_PENGADUAN,
  LIKE_PENGADUAN,
  UNLIKE_PENGADUAN,
  DELETE_PENGADUAN,
  SET_ERRORS,
  SUBMIT_COMMENT,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_DATA,
  STOP_LOADING_UI,
} from '../types';
import axios from 'axios';

export const getSemuaPengaduan = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/pengaduan')
    .then((res) => {
      dispatch({
        type: SET_SEMUA_PENGADUAN,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SEMUA_PENGADUAN,
        payload: [],
      });
    });
};

export const getPengaduan = (pengaduanId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/pengaduan/${pengaduanId}`)
    .then((res) => {
      dispatch({
        type: SET_PENGADUAN,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const postPengaduan = (newPengaduan) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/pengaduan', newPengaduan)
    .then((res) => {
      dispatch({
        type: POST_PENGADUAN,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const likePengaduan = (pengaduanId) => (dispatch) => {
  axios
    .get(`/pengaduan/${pengaduanId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_PENGADUAN,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

export const unlikePengaduan = (pengaduanId) => (dispatch) => {
  axios
    .get(`/pengaduan/${pengaduanId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_PENGADUAN,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};
// Submit a comment
export const submitComment = (pengaduanId, commentData) => (dispatch) => {
  axios
    .post(`/pengaduan/${pengaduanId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const deletePengaduan = (pengaduanId) => (dispatch) => {
  axios
    .delete(`/pengaduan/${pengaduanId}`)
    .then(() => {
      dispatch({ type: DELETE_PENGADUAN, payload: pengaduanId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_PENGADUAN,
        payload: res.data.pengaduan,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_PENGADUAN,
        payload: null,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
