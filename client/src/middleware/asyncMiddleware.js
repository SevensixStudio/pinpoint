import axios from "axios";
import { ASYNC_REQUEST } from "../actions/types";
import { accessDenied, onRequestError, requestStart, requestEnd } from "../actions/index";


const asyncMiddleware = ({ dispatch }) => next => action => {
    next(action);

    if (action.type !== ASYNC_REQUEST) return;

    const {
        url,
        method,
        data,
        onSuccess,
        onSuccessSecondAction,
        onSuccessThirdAction,
        label
    } = action.payload;

    const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

    if (label) {
        dispatch(requestStart(label));
    }


  axios
    .request({
      url,
      method,
      [dataOrParams]: data
    })
    .then(({ data }) => {
      dispatch(onSuccess(data));
      if (onSuccessSecondAction !== undefined) {
        dispatch(onSuccessSecondAction(data));
      }
      if (onSuccessThirdAction !== undefined) {
        dispatch(onSuccessThirdAction(data));
      }
    })
    .catch(error => {
      const err = (error.response ? error.response.data.error : error);
      console.log(err);
      dispatch(onRequestError(label, err));

      if (error.response && error.response.status === 403) {
        dispatch(accessDenied(window.location.pathname));
      }
    })
   .finally(() => {
      if (label) {
        dispatch(requestEnd(label));
      }
   });
};

export default asyncMiddleware;