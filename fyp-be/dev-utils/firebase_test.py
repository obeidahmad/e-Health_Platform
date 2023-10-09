import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('creds.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
uid = "7bc03b0b-b8b6-488a-9174-0b4de26cb3ec"
users_ref = db.collection('users').document(uid).get()
# docs = users_ref.stream()
# query = users_ref.get_doc(uid)
# results = query.get()
print(users_ref.to_dict())
# for doc in docs:
#     print(doc.id)
#     email = doc.to_dict()['email']
#     print(email)
