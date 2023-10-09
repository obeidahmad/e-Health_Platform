export interface Patient {
  uid: string;
  first_name: string;
  last_name: string;
  civil_status: string;
  gender: string;
  nationality: string;
  phone_number: string;
  place_of_birth: string;
}

export interface Staff {
  uid: string;
  first_name: string;
  last_name: string;
  role: "nurse" | "doctor";
  time_slot?: number;
}
