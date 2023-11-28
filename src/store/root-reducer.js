import { combineReducers } from 'redux';

import { themeReducer } from './theme/theme-reducer';
import { countriesReducer } from './coutries/countries-reducer';

export const rootReducer = combineReducers({
    theme: themeReducer,
    countries: countriesReducer,
});
