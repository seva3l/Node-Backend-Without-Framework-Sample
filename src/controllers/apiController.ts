import * as http from 'http';
import { collectRequestData } from '../utils';
import { fetchNobelPrizeData } from '../services';
import { RequestData } from '../interface/IRequest';


export async function handleApiRequest(
  req: http.IncomingMessage,
  res: { writeHead: (status: number, headers: { 'Content-Type': string }) => void; end: (data: string) => void }
) {
  collectRequestData(req, async (requestData: RequestData) => {
    try {
      const { firstname, lastname, category, year } = requestData;

      // Validation
      if (
        (firstname && typeof firstname !== 'string') ||
        (lastname && typeof lastname !== 'string') ||
        (category && typeof category !== 'string') ||
        (year && (typeof year !== 'number' || !(/^\d{4}$/.test(year.toString()))))
      ) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad Request. Invalid parameter types.' }));
        return;
      }
      const payload ={
        firstname,
        lastname,
        category,
        year
      }

      const data = await fetchNobelPrizeData(payload);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } catch (error: any) {
      console.error('Error processing request:', error.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
  });
}
