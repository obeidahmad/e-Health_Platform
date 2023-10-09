import smtplib
import ssl
import traceback
from email.message import EmailMessage

import psycopg2 as psycopg2
from firebase_admin import credentials, initialize_app, firestore
from rocketry import Rocketry

app = Rocketry()

email_sender = "afrah.hassan12345@gmail.com"
email_password = "dvaz gqdh xouj vpxt"

smtp_port = 465
smtp_server = "smtp.gmail.com"
smtp_context = ssl.create_default_context()

email_subject = "Appointment Reminder"
email_message = "Dear {},\n\nKind reminder, you have taken an appointment with us tomorrow at {}."

db_user = "ahmadobeid"
db_password = "ahmadobeidpass"
db_host = "localhost"
db_port = "5432"
db_database = "fyp"

cred = credentials.Certificate("./secret.json")
initialize_app(cred)
db = firestore.client()
users_ref = db.collection("patients")


@app.task("every 2 hours")
def do_things():
    try:
        connection = psycopg2.connect(user=db_user, password=db_password, host=db_host, port=db_port, database=db_database)
        cursor = connection.cursor()
        cursor.execute(
            "SELECT appt.id, appt.date, appt.user_id FROM appts.appointments as appt WHERE appt.notified = false")

        for appt_id, day, user_id in cursor.fetchall():
            print(f"Found appointment on '{day}' for user of id '{user_id}'")
            user_data = users_ref.document(user_id).get().to_dict()
            print(user_data)
            email_receiver = user_data["email"]
            email_receiver_name = user_data["first_name"] + " " + user_data["last_name"]
            print("User Info Fetched")

            with smtplib.SMTP_SSL(smtp_server, smtp_port, context=smtp_context) as server:
                server.login(email_sender, email_password)
                print("Sending Email")
                msg = EmailMessage()
                msg["Subject"] = email_subject
                msg["From"] = email_sender
                msg["To"] = email_receiver
                msg.set_content(email_message.format(email_receiver_name, f"{day.hour}:{day.minute}"))

                server.send_message(msg)
                print("Email sent")

                cursor.execute(f"UPDATE appts.appointments SET notified = true WHERE id = '{appt_id}';")
                connection.commit()
                print("Appointment marked as notified in DB")
                print()
    except (Exception, psycopg2.Error) as error:
        traceback.print_exc()
    finally:
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")
        print("Task Done")


if __name__ == "__main__":
    app.run()
