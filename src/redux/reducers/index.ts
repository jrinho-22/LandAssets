import authReducer from './auth';
import authLoading from './loading'

// const reducers = combineReducers({
//     auth: authReducer,
//     loading: authLoading
//   });
  
// export default reducers

export default {
    auth: authReducer,
    loading: authLoading
};