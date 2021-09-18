import "../../utils/interceptors";
import { BASE_API_URI, FETCH_OKR_API } from '../../utils/constant';

/**
 * @name fetchOkrAPI
 * @description To Fetch Okr data from server
 * @param {*} updateAt Last updated at frontend value. As of now only passed into request so we can use if needed
 * @returns Promise<Okr Data>
 */
export function fetchOkrAPI(updateAt) {
  return fetch(BASE_API_URI + FETCH_OKR_API).then(data => {
    return data && data.data ? data.data : [];
  }).catch(err => {
    return Promise.reject(err);
    //return err;
  });
}
