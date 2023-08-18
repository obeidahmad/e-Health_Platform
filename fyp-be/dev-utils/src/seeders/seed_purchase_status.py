import psycopg2

# Define data for seeding
data = [
    ('8c76b366-3aa1-418a-96a1-9e750ee6c947', 'reserved'),
    ('b9af10a4-1be5-4bf2-b972-2ed965527f88', 'bought'),
]

conn = psycopg2.connect(
    host="localhost",
    database="fyp",
    user="ahmadobeid",
    password="ahmadobeidpass"
)

# Insert data into the med_purchase_status table
cur = conn.cursor()
for record in data:
    cur.execute("INSERT INTO meds.med_purchase_status (id, name) VALUES (%s,%s)", record)

conn.commit()
print("Data seeded into med_purchase_status table")
cur.close()
conn.close()
