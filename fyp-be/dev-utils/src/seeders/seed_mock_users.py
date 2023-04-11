import requests

URL = 'http://localhost:8081/dev-user/user'
users = [
    {
        "id": "7bc03b0b-b8b6-488a-9174-0b4de26cb3ec",
        "role": {
            "id": "35e1ff30-23aa-447c-93e9-a93840ab7ccc",
        }
    },
    {
        "id": "3b07993f-f0e7-410e-8eaa-c0c3344965db",
        "role": {
            "id": "7b3fe957-f026-4a10-b302-dc9041393dc4"
        },
        "timeSlot": "00:10:00"
    }
]
for user in users:
    response = requests.post(URL, json=user, verify=False)
    print(f'Response for {user["id"]}: {response.status_code} - {response.content}')
    # time.sleep(0.5)
