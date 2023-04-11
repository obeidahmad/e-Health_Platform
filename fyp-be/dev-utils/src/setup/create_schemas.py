import psycopg2

conn = psycopg2.connect(
    host="localhost",
    database="fyp",
    user="ahmadobeid",
    password="ahmadobeidpass"
)


schemas_needed = ['appts', 'meds', 'general']

# Create a new schema
for schema_name in schemas_needed:
    cur = conn.cursor()
    cur.execute("SELECT schema_name FROM information_schema.schemata WHERE schema_name = %s", (schema_name,))
    if not cur.fetchone():
        cur.execute(f"CREATE SCHEMA {schema_name}")
        conn.commit()
        print(f"Created schema '{schema_name}'")
    else:
        print(f"Schema '{schema_name}' already exists")
    cur.close()
conn.close()
