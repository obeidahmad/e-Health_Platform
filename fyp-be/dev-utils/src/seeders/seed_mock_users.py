import requests

URL = 'http://localhost:8081/dev-user/user'
users = [
    {
        "id": "SqyEGWSSOsQS0FcQ7jIYbEgZfBp2",
        "role": {
            "id": "35e1ff30-23aa-447c-93e9-a93840ab7ccc",
        }
    },
    {
        "id": "dIZ5aWwtShRmAB5ach9yB7XMYmL2",
        "role": {
            "id": "7b3fe957-f026-4a10-b302-dc9041393dc4"
        },
        "timeSlot": "00:15:00"
    }
]
for user in users:
    response = requests.post(URL, json=user, verify=False)
    print(f'Response for {user["id"]}: {response.status_code} - {response.content}')
    # time.sleep(0.5)
