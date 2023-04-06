import json
import time

import requests

URL = 'http://localhost:8080/med/class'

data = json.load(open("mock_data.json", "r"))

med_class_list = [item['medClass'] for item in data]

# Define the list of medicine classes to send requests for
med_class = [
    'Analgesics (pain relievers)',
    'Antacids',
    'Antihistamine',
    'Anticoagulants',
    'Antidepressants',
    'Antiemetics',
    'Antifungals',
    'Antihypertensives',
    'Anti-inflammatory drugs',
    'Antipsychotics',
    'Antiseptics',
    'Antivirals',
    'Beta blockers',
    'Bronchodilators',
    'Diuretics',
    'Hormone replacement therapy',
    'Hypnotics and sedatives',
    'Immunomodulators',
    'Laxatives',
    'Muscle relaxants',
    'Oral contraceptives',
    'Proton pump inhibitors',
    'Stimulants',
    'Topical corticosteroids',
    'Vaccines'
]

classes = set(med_class + med_class_list)
print(classes)

for med_class in classes:
    # Define the JSON body for the request
    data = {'name': med_class}

    # Send the POST request
    response = requests.post(URL, json=data, verify=False)

    # Print the response status code and content
    print(f'Response for {med_class}: {response.status_code} - {response.content}')
    # time.sleep(0.5)
