import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import auth from './Reducers/auth';
import booking from './Reducers/booking';
import finance from './Reducers/finance';

//we use redux store to store offline data, to fetch api, we use react query instead

// const isDevelopment = process.env.NODE_ENV === 'development';
const additionMiddlewares = [thunk];

// saved to cache
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  auth,
  booking,
  finance,
});

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false,
      // {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER],
      // },
    }).concat(...additionMiddlewares);

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require('redux-flipper').default;
    //   middlewares.push(createDebugger());
    // }

    return middlewares;
  },
});
//FIXME: add debugger of redux devtools

// if (isDevelopment && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
//   store = createStore(
//     persistedReducer,
//     compose(
//       applyMiddleware(...middlewares, routerMiddleware(history)),
//       (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
//     ),
//   );
// }

const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
export { persistor };
