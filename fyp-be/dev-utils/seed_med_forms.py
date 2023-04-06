import json
import time
import requests

URL = 'http://localhost:8080/med/form'

data = json.load(open("mock_data.json", "r"))

possible_forms = ['tablet', 'capsule', 'solution', 'suspension', 'injectable', 'topical', 'patch', 'inhaler',
                  'suppository',
                  'cream', 'ointment', 'gel', 'liquid', 'powder', 'aerosol', 'nasal spray', 'eye drops', 'ear drops',
                  'lozenge',
                  'chewable tablet', 'dental paste', 'lotion', 'spray']

possible_forms = [form.title() for form in possible_forms]
for form in possible_forms:
    # Define the JSON body for the request
    data = {'name': form}

    response = requests.post(URL, json=data, verify=False)

    print(f'Response for {form}: {response.status_code} - {response.content}')
