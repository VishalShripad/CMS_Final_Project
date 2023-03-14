import {
  GET_CHANNEL,
  GET_ALL_CHANNELS,
  CHANNEL_LOADING,
  GET_GENRE,
  GET_LANGUAGE,
} from '../actions/types';

export default function (
  state = {
    channels: [],
    channel: {},
    pagination: '',
    genres: [],
    languages: [],
  },
  action
) {
  console.log("In channel reducer");
  switch (action.type) {
    case GET_ALL_CHANNELS:
      console.log("In channel reducer GET_ALL_CHANNELS");
      return {
        ...state,
        channels: action.payload.data,
        pagination: action.payload.headers.get('pagination'),
        loading: false,
      };
    case GET_CHANNEL:
      console.log("In channel reducer GET_CHANNEL");
      return {
        ...state,
        channel: action.payload,
        loading: false,
      };
    case CHANNEL_LOADING:
      console.log("In channel reducer CHANNEL_LOADING");
      return {
        ...state,
        loading: true,
        channels: [],
        channel: {},
      };
    case GET_GENRE:
      console.log("In channel reducer GET_GENRE");
      return {
        ...state,
        genres: action.payload,
        loading: false,
      };
    case GET_LANGUAGE:
      console.log("In channel reducer GET_LANGUAGE");
      return {
        ...state,
        languages: action.payload,
        loading: false,
      };
    default:
      console.log("In channel reducer default state");
      return state;
  }
}
