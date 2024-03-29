import * as http from 'http';
export function collectRequestData(req: http.IncomingMessage, callback: { (requestData: any): Promise<void>; (arg0: any): void; }) {
    let body = '';
  
    req.on('data', (chunk) => {
      body += chunk;
    });
  
    req.on('end', () => {
      callback(JSON.parse(body));
    });
  }

