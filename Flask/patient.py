# .\flaskenv\Scripts\Activate.ps1
import firebase_admin
from firebase_admin import credentials, db
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
patient = Flask(__name__)
CORS(patient, resources={r"/*": {"origins": "*", "methods": ["GET", "HEAD", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"]}})

cred = credentials.Certificate("key.json")

firebase_admin.initialize_app(
    cred,
    {"databaseURL": "https://data-scrubber-application-default-rtdb.firebaseio.com/"},
)
ref = db.reference('users')
def add_user(fname, lname, age, email, state, city):
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
    return ref.get()
@patient.route("/")
def introduction():
    return """
    <h1>Welcome to the Patient API!</h1>
    <p>Click <a href="/database">here</a> to view the list of patients.</p>
    """
@patient.route("/add", methods=["POST"])
@cross_origin()
def add():
    data = request.get_json()
    print(data)
    print(request)
    add_user(data["fname"], data["lname"], data["age"], data["email"], data["state"], data["city"])
    return jsonify(ref.get())

@patient.route("/delete", methods=["DELETE"])
@cross_origin()
def delete():
    # return 'hello'
    data = request.get_json()
    print(data)
    print(request)
    ref.child(data["key"]).delete()
    return jsonify(ref.get())

@patient.route("/database")
def databaseList():
    return jsonify(ref.get())

if __name__ == "__main__":
    patient.run(debug=True, port=3000)
