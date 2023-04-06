import json

import requests

URL = 'http://localhost:8080/med'

data = json.load(open("mock_data.json", "r"))

for medicin in data:
    print(medicin)

    response = requests.post(URL, json=medicin, verify=False)

    print(f'Response for {medicin["brandName"]}: {response.status_code} - {response.content}')
