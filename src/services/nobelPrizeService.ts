import axios from 'axios';
import * as querystring from 'querystring';
import { RequestData } from '../interface/IRequest';
import { NobelResponse } from '../interface/IResponse';

const apiUrl = "https://api.nobelprize.org/v1/laureate.json";



export async function fetchNobelPrizeData(params: RequestData = {}) {
  const queryParams = querystring.stringify({
    firstname: params.firstname,
    surname: params.lastname,
    category: params.category,
    year: params.year,
  });

  const urlWithParams = `${apiUrl}?${queryParams}`;
  const axiosResponse = await axios.get(urlWithParams);

  return axiosResponse.data as NobelResponse;
}
