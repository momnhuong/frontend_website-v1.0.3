import { createStore, applyMiddleware,compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducer'

const loggerMiddleware = createLogger()
const config = {
  key: 'root',
  storage: storage,
  // whitelist: ['auth'],
  timeout: 100,
}
const middlewares = [thunkMiddleware, loggerMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = [applyMiddleware(...middlewares)]

const persistedReducer = persistReducer(config, rootReducer)
export const store = createStore(persistedReducer,
  composeEnhancers(...enhancers)
)

export const persistor = persistStore(store)