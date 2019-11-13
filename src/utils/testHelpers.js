import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

export const findByTestAttr = (component, attr) => {
  return component.find(`[data-test='${attr}']`);
};

export const mockStore = (
  initialState = {
    locale: {
    },
  },
) => {
  const mocConfigureStore = configureStore([thunk]);

  const store = mocConfigureStore(initialState);

  return store;
};
