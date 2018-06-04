import { connect } from 'react-redux';
import compose from '../utils/compose';
import withProps from '../utils/withProps';
import intlSelector from './selector';

import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';
import IntlPluralFormat from '../plural';
import memoizeIntlConstructor from 'intl-format-cache';
import * as format from '../format';
import { intlConfigPropTypes, intlFormatPropTypes, intlShape } from '../types';

const intlConfigPropNames = Object.keys(intlConfigPropTypes);
const intlFormatPropNames = Object.keys(intlFormatPropTypes);

const formatters = {
  getDateTimeFormat: memoizeIntlConstructor(Intl.DateTimeFormat),
  getNumberFormat: memoizeIntlConstructor(Intl.NumberFormat),
  getMessageFormat: memoizeIntlConstructor(IntlMessageFormat),
  getRelativeFormat: memoizeIntlConstructor(IntlRelativeFormat),
  getPluralFormat: memoizeIntlConstructor(IntlPluralFormat),
};

const state = {
  ...formatters,
  now: () => Date.now(),
};

const getBoundFormatFns = (config, state) => {
  return intlFormatPropNames.reduce((boundFormatFns, name) => {
    boundFormatFns[name] = format[name].bind(null, config, state);
    return boundFormatFns;
  }, {});
};

const injectIntlHOC = compose(
  connect(state => ({
    intl: intlSelector(state),
  })),
  withProps(({ intl: intlConfig }) => {
    const boundFormatFns = getBoundFormatFns(intlConfig, state);
    const { now, ...formatters } = state;
    return {
      intl: {
        ...intlConfig,
        ...boundFormatFns,
        formatters,
        now,
      },
    };
  }),
);

export { injectIntlHOC };
