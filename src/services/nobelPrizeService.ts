import axios from 'axios';
import * as querystring from 'querystring';
import { RequestData } from '../interface/IRequest';
import { NobelResponse } from '../interface/IResponse';

const apiUrl = 'https://api.nobelprize.org/v1/laureate.json';

export async function fetchNobelPrizeData({firstname,surname,category,year}: RequestData): Promise<NobelResponse> {
  const firstNameRegex = firstname ? new RegExp(firstname.replace(/\*/g, '.*'), 'i') : undefined;
  const lastNameRegex = surname ? new RegExp(surname.replace(/\*/g, '.*'), 'i') : undefined;

  const queryParams = querystring.stringify({
    firstname,
    surname,
    category,
    year
  });

  const urlWithParams = `${apiUrl}?${queryParams}`;
  const axiosResponse = await axios.get(urlWithParams);

  const filteredLaureates = axiosResponse.data.laureates.filter((laureate: RequestData) => {
    return (
      (!firstNameRegex || (firstNameRegex as RegExp).test(laureate.firstname)) &&
      (!lastNameRegex || (lastNameRegex as RegExp).test(laureate.surname))
    );
  });


  return { laureates: filteredLaureates } as NobelResponse;
  // return { laureates: axiosResponse.data.laureates } as NobelResponse;
}
