# .\flaskenv\Scripts\Activate.ps1
import firebase_admin
from firebase_admin import credentials, db
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

patient = Flask(__name__)
CORS(patient)

cred = credentials.Certificate("key.json")

firebase_admin.initialize_app(
    cred,
    {"databaseURL": "https://data-scrubber-application-default-rtdb.firebaseio.com/"},
)
def add_user(fname, lname, age, email, state, city):
    ref = db.reference('users')
    ref.push(
        {
            "fname": fname,
            "lname": lname,
            "age": age,
            "email": email,
            "state": state,
            "city": city,
        },
    )
def get_users():
    ref = db.reference('users')
    return ref.get()

def create_array():
    array=[]
    ref = db.reference('users')
    for key in ref.get():
        array.append(ref.get()[key])
    print(array)

create_array()
# add_user("John", "Doe", 30, "john.doe@example.com", "NY", "New York")

@patient.route("/")
def introduction():
    return """
    <h1>Welcome to the Patient API!</h1>
    <p>Click <a href="/patients">here</a> to view the list of patients.</p>
    """

@patient.route("/database")
def databaseList():
    return jsonify(get_users())

@patient.route("/patients")
def patientsList():
    patients = [
        {
            "fname": "John",
            "lname": "Doe",
            "age": 30,
            "email": "john@example.com",
            "state": "NY",
            "city": "New York",
        },
        {
            "fname": "Jane",
            "lname": "Smith",
            "age": 45,
            "email": "jane@example.com",
            "state": "CA",
            "city": "Los Angeles",
        },
        {
            "fname": "Michael",
            "lname": "Johnson",
            "age": 55,
            "email": "michael@example.com",
            "state": "TX",
            "city": "Houston",
        },
        {
            "fname": "Emily",
            "lname": "Brown",
            "age": 28,
            "email": "emily@example.com",
            "state": "FL",
            "city": "Miami",
        },
    ]
    return jsonify(members=patients)


if __name__ == "__main__":
    patient.run(debug=True, port=3000)
