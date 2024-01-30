// interfaces.ts
interface Affiliation {
    name: string;
    city: string;
    country: string;
  }
  
 interface Prize {
    year: string;
    category: string;
    share: string;
    motivation: string;
    affiliations: Affiliation[];
  }
  
interface Laureate {
    id: string;
    firstname: string;
    surname: string;
    born: string;
    died: string;
    bornCountry: string;
    bornCountryCode: string;
    bornCity: string;
    diedCountry: string;
    diedCountryCode: string;
    diedCity: string;
    gender: string;
    prizes: Prize[];
  }
  
  export interface NobelResponse {
    laureates: Laureate[];
  }
  