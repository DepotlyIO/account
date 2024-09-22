export interface Company {
  id: number;
  name: string;
  user_id: string;
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
