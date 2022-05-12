import { REQUEST_STATE } from '../constants'

export const initialState = {
  fetchState:REQUEST_STATE.INITIAL,
  wordlist:[],
}

export const wordsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS'

}

export const wordsReducer = (state, action) => {
  switch (action.type) {
    case wordsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case wordsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        wordlist: action.payload.wordtype,
      };
    default:
      throw new Error();
  }
}
