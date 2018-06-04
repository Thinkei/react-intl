const SWITCH_LOCALE = '@@redux-intl/SWITCH_LOCALE';

const switchLocaleAction = ({ locale, messages }) => ({
  type: SWITCH_LOCALE,
  payload: {
    locale,
    messages,
  },
});

export { SWITCH_LOCALE, switchLocaleAction };
