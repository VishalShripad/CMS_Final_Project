import axios from 'axios';
import {
  GET_ALL_CHANNELS,
  GET_CHANNEL,
  CHANNEL_LOADING,
  GET_GENRE,
  GET_LANGUAGE,
} from './types';
export const GetChannels =
  (pageNumber, search = '', sort = '', genre = '', language = '') =>
  (dispatch) => {
    dispatch(setChannelLoading());
    console.log("In channel action GetChannels");
    axios
      .get(
        `/api/channel?PageNumber=${pageNumber}&Search=${search}&Sort=${sort}&GenreId=${genre}&LanguageId=${language}`
      )
      .then((res) => {
        console.log("In channel action GetChannels then "+res.data);
        dispatch({
          type: GET_ALL_CHANNELS,
          payload: res,
        })
      }
      )
      .catch((err) => {
        console.log("In channel action GetChannels error");
        dispatch({
          type: GET_ALL_CHANNELS,
          payload: [],
        });
      });
  };

export const GetChannelById = (id) => (dispatch) => {
  dispatch(setChannelLoading());
  console.log("In channel action GetChannelById");
  axios
    .get(`/api/channel/${id}`)
    .then((res) => {
      console.log("In channel action GetChannelById then "+res.data);
      dispatch({
        type: GET_CHANNEL,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("In channel action GetChannelById error");
      dispatch({
        type: GET_CHANNEL,
        payload: {},
      });
    });
};

export const GetChannelGenre = () => (dispatch) => {
  dispatch(setChannelLoading());
  console.log("In channel action GetChannelGenre");
  axios
    .get('/api/channel/genres')
    .then((res) => {
      console.log("In channel action GetChannelGenre then "+res.data);
      dispatch({
        type: GET_GENRE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("In channel action GetChannelGenre error");
      dispatch({
        type: GET_GENRE,
        payload: [],
      });
    });
};

export const GetChannelLanguages = () => (dispatch) => {
  dispatch(setChannelLoading());
  console.log("In channel action GetChannelLanguages");
  axios
    .get('/api/channel/languages')
    .then((res) => {
      console.log("In channel action GetChannelLanguages then "+res.data);
      dispatch({
        type: GET_LANGUAGE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("In channel action GetChannelLanguages error");
      dispatch({
        type: GET_LANGUAGE,
        payload: [],
      });
    });
};

export const setChannelLoading = () => {
  console.log("In channel action setChannelLoading");
  return {
    type: CHANNEL_LOADING,
  };
};
