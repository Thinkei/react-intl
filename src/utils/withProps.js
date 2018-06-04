import React from 'react';

export default withPropsFn => Component => props => (
  <Component {...props} {...withPropsFn(props)} />
);
