export interface Company {
  id: number;
  user_id: string;
  name: string;
  identification_number: string;
  country: string;
  city: string;
  address: string;
  zip: string;
}

export interface CompanyData {
  company: {
    name: string;
    identification_number: string;
    country: string;
    city: string;
    address: string;
    zip: string;
  };
}
