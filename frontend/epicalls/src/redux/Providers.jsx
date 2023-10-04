'use client';

import { store } from './store';
import { Provider } from 'react-redux';

//este nunca exportarlo por default porque no funciona!
export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
