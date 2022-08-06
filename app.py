from flask import Flask, jsonify
from requests import session
import pymongo
import json
from bson.objectid import ObjectId
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS


app=Flask (__name__)
#######################################
try :
    mongo = pymongo.MongoClient(
    host = "localhost",
    port = 27017,
    serverSelectionTimeoutMS = 1000
    )
    db = mongo.chiraz
    occ1_db=db.sales
    mongo.server_info ( ) # trigger exception if cannot connect to db
except :
    print ( " ERROR - Cannot connect to db " )

bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)

@app.route('/dash1', methods=['GET'])
def get_dash1():
   dash1 = []
   allData=occ1_db.find()
   
   for data in allData:
        dash1.append({
            'Date': data['Date'],
            'Gain': data['Gain']
        })
   
   print(jsonify(dash1)) 
   print("test")
   return jsonify(dash1)
   
if __name__ == "__main__" :
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'

    session.__init__(app)
    app.run ( port = 80 , debug = True )