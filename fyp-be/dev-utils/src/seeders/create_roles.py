import psycopg2
from psycopg2.extras import register_uuid

conn = psycopg2.connect(
    host="localhost",
    database="fyp",
    user="ahmadobeid",
    password="ahmadobeidpass"
)
register_uuid()
roles = [
    {
        "id": "7b3fe957-f026-4a10-b302-dc9041393dc4",
        "name": "Doctor"
    },
    {
        "id": "35e1ff30-23aa-447c-93e9-a93840ab7ccc",
        "name": "Patient"
    },
    {
        "id": "0fa1f17e-8060-4232-9dec-d81fbc822c91",
        "name": "Nurse"
    },
    {
        "id": "3640f8bd-1204-41c8-9deb-5cde156ff174",
        "name": "Admin"
    }
]

for role in roles:
    with conn.cursor() as cursor:
        existing = f"SELECT COUNT(*) FROM general.roles WHERE name = '{role['name']}'"
        cursor.execute(existing)
        count = cursor.fetchone()[0]
        if count == 0:
            print(f"Creating role")
            insert = "INSERT INTO general.roles (id, name) VALUES (%s, %s)"
            cursor.execute(insert, (role['id'], role['name']))
            conn.commit()
            print(role)
        else:
            print(f"Role {role['name']} already exists")

conn.close()
