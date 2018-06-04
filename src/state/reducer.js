import { SWITCH_LOCALE } from './actions';

const INITIAL_STATE = {
  locale: 'en',
  messages: {},
  formats: {},
  textComponent: 'span',

  defaultLocale: 'en',
  defaultFormats: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  if (action.type === SWITCH_LOCALE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return state;
};

export default reducer;
