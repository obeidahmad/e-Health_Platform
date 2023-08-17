from pydantic import BaseModel


class SignIn(BaseModel):
    email: str
    password: str


class NonPatientSignup(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str
    admin_token: str


class DoctorSignup(NonPatientSignup):
    time_slot: int


class BasicUserInformation(BaseModel):
    date_of_birth: str
    place_of_birth: str
    gender: str
    address: str
    civil_status: str
    phone_number: str
    nationality: str


class MedicalRecord(BaseModel):
    basic_user_info: BaseModel


class UserSignup(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str
    base_user_info: BasicUserInformation


class GetUserRequest(BaseModel):
    email: str
    token: str
