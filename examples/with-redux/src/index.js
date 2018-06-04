import React from 'react';
import ReactDOM from 'react-dom';
import {
  intlReducer,
  injectIntlHOC,
  switchLocaleAction,
  addLocaleData,
} from 'react-intl';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import vi from 'react-intl/locale-data/vi';

addLocaleData(vi);

const MESSAGES = {
  en: {
    'app.greeting': 'Hello, {name}!',
  },
  vi: {
    'app.greeting': 'Xin chao, {name}!',
  },
};

const rootReducer = combineReducers({
  intl: intlReducer,
});

const store = createStore(rootReducer, {
  intl: {
    locale: 'en',
    messages: MESSAGES.en,
  },
});

const Greeting = ({ intl, name }) => {
  return <h1>{intl.formatMessage({ id: 'app.greeting' }, { name })}</h1>;
};

const IntlInjectedGreeting = injectIntlHOC(Greeting);

const SwitchLocale = connect(
  null,
  {
    switchLocale: switchLocaleAction,
  },
)(({ switchLocale }) => (
  <select
    onChange={({ target: { value } }) =>
      switchLocale({
        locale: value,
        messages: MESSAGES[value],
      })
    }>
    <option value="en">English</option>
    <option value="vi">Vietnamese</option>
  </select>
));

ReactDOM.render(
  <Provider store={store}>
    <div>
      <SwitchLocale />
      <IntlInjectedGreeting name={'Toan'} />
    </div>
  </Provider>,
  document.getElementById('root'),
);
