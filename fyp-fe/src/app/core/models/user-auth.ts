export interface UserAuth {
  uid: string;
  email: string;
  isVerified: boolean;
}

export interface UserInformation {
  name: string
  role?: string
  iss: string
  auth_time: number
  user_id: string
  sub: string
  email: string
  email_verified: boolean
  firebase: Firebase
  uid: string
}

export interface Firebase {
  identities: Identities
  sign_in_provider: string
}

export interface Identities {
  email: string[]
}
