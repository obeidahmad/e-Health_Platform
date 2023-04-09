import json

import requests

URL = 'http://localhost:8080/med'

data = json.load(open("mock_data.json", "r"))

for medicine in data:
    print(medicine)

    response = requests.post(URL, json=medicine, verify=False)

    print(f'Response for {medicine["brandName"]}: {response.status_code} - {response.content}')
