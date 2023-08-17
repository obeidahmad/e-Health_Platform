import firebase_admin
from fastapi import FastAPI, HTTPException
from firebase_admin import credentials, auth, firestore
from firebase_admin.auth import EmailAlreadyExistsError, UserNotFoundError, InvalidIdTokenError
from starlette.middleware.cors import CORSMiddleware

from models import UserSignup, NonPatientSignup, DoctorSignup

app = FastAPI()

cred = credentials.Certificate("secret.json")
firebase_app = firebase_admin.initialize_app(cred)
firestore_db = firestore.client()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/signup_patient")
async def signup(user_credentials: UserSignup):
    try:
        user = auth.create_user(email=user_credentials.email,
                                email_verified=False,
                                password=user_credentials.password,
                                display_name=f"{user_credentials.first_name} + {user_credentials.last_name}")
        records = user_credentials.base_user_info.dict()
        records['timestamp'] = firestore.firestore.SERVER_TIMESTAMP
        document_id = user.uid
        ref = firestore_db.collection("patients").document(document_id)
        ref.set(records)
    except EmailAlreadyExistsError as e:
        raise HTTPException(status_code=400, detail="This user already exists!")
    else:
        custom_claims = {'role': 'patient'}
        auth.set_custom_user_claims(user.uid, custom_claims)
        # custom_token = auth.create_custom_token(user.uid, custom_claims)
        return auth.get_user_by_email(user_credentials.email)


@app.post("/add_admin")
async def signup():
    try:
        user = auth.create_user(email="test.admin@gmail.com",
                                email_verified=True,
                                password="hello_admin",
                                display_name="Jane Admin")
    except EmailAlreadyExistsError as e:
        raise HTTPException(status_code=400, detail="This user already exists!")
    else:
        custom_claims = {'role': 'admin'}
        auth.set_custom_user_claims(user.uid, custom_claims)
        custom_token = auth.create_custom_token(user.uid, custom_claims)
        return {"token": custom_token}


@app.post("/signup_nurse")
async def signup(user_credentials: NonPatientSignup):
    try:
        admin = auth.verify_id_token(user_credentials.admin_token)
        if admin.get('role', None) != 'admin':
            raise HTTPException(status_code=403, detail="Only admin can perform operation.")

        user = auth.create_user(email=user_credentials.email,
                                email_verified=True,
                                password=user_credentials.password,
                                display_name=f"{user_credentials.first_name} + {user_credentials.last_name}")
    except EmailAlreadyExistsError as e:
        raise HTTPException(status_code=400, detail="This user already exists!")
    except InvalidIdTokenError:
        raise HTTPException(status_code=400, detail="Bad token")
    else:
        custom_claims = {'role': 'patient'}
        auth.set_custom_user_claims(user.uid, custom_claims)
        custom_token = auth.create_custom_token(user.uid, custom_claims)
        return {"token": custom_token}


@app.post("/signup_doctor")
async def signup(user_credentials: DoctorSignup):
    try:
        admin = auth.verify_id_token(user_credentials.admin_token)
        if admin.get('role', None) != 'admin':
            raise HTTPException(status_code=403, detail="Only admin can perform operation.")

        user = auth.create_user(email=user_credentials.email,
                                email_verified=True,
                                password=user_credentials.password,
                                display_name=f"{user_credentials.first_name} + {user_credentials.last_name}")
    except EmailAlreadyExistsError as e:
        raise HTTPException(status_code=400, detail="This user already exists!")
    except InvalidIdTokenError:
        raise HTTPException(status_code=400, detail="Bad token")
    else:
        custom_claims = {'role': 'patient', 'time_slot': user_credentials.time_slot}
        auth.set_custom_user_claims(user.uid, custom_claims)
        custom_token = auth.create_custom_token(user.uid, custom_claims)
        return {"token": custom_token}


# @app.post()

@app.get('/validate_token')
async def get_user(token: str):
    try:
        return auth.verify_id_token(token)

    except UserNotFoundError as e:
        raise HTTPException(status_code=404, detail="This user does not exist")
    except InvalidIdTokenError as e:
        print(e)
        raise HTTPException(status_code=400, detail="Bad token")
