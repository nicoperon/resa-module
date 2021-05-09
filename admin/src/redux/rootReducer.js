import {combineReducers} from "redux";
import * as User from './reducer/user';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const rootReducer = combineReducers({
  Token:User.Token,
  User:User.userReducer,
});

const persistConfig={
  key:'root',
  storage,
  whitelist:['Token','User']
}

export default persistReducer(persistConfig,rootReducer )

export function* rootSaga() {

}
