export class User {
  id: number;
  username: string;
  name: string;
  password: string;
  contact: string;
  company: Company;
  // tslint:disable-next-line:variable-name
  login_time: string;
  role: Role;
}

export class Company {
  id: number;
  name: string;
  type: Company_type;
  // tslint:disable-next-line:variable-name
  legal_person: string;
  province: string;
  city: string;
  address: string;
  phone: string;
}

// tslint:disable-next-line:class-name
export class Company_type {
  id: number;
  type: string;
}

export class Role {
  id: number;
  description: string;
}
