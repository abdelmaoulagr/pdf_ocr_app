import json
import os
from bson import ObjectId
from flask import Flask, request , jsonify,session
from flask_session import Session
from flask_cors import CORS , cross_origin
import pymongo
import getLoi as loi
import base64

app = Flask(__name__)
CORS(app , supports_credentials=True)


#My Data Base is 'Lois'
#And the collection is 'lois'
client = pymongo.MongoClient('localhost', 27017)
db = client.Lois
loiDb = db.lois

#path of ocr file in OS 
full_path = os.path.join(os.path.dirname(__file__), "ocr_file/file_decoded.pdf")
#OCR function
def OCR():

    #apply OCR
    text_loi=loi.clean_head(loi.pdf_to_text(full_path))

    #clean data
    loi_num=loi.Loi_num(text_loi)
    titre_loi=loi.Title_loi(text_loi,loi_num)
    articles=loi.Articles(text_loi)
    return loi.Loi_to_dict(loi_num,titre_loi,articles)



# Search bar
@app.route('/search',methods=['GET', 'POST'])
def search_loi():

    
    if  request.method == 'GET':

        # Get data from DB
        lois=loiDb.find({},{"_id":0})
        lois=list(lois)
        return json.dumps(lois) 
    
    else:

        searchText=request.json['searchBar']
        
        # Get data from DB
        result=loiDb.find({},{'_id':0})
                
        # Get articles who contains searchText
        searchData=[]
        for doc in result:
            matching_fields = {}
            for field, value in doc.items():
                if field=='loi':matching_fields[field] = value
                if isinstance(value, str) and searchText in value and 'loi' not in field:
                    matching_fields[field] = value
            if len(matching_fields)==1: continue
            searchData.append(matching_fields)
        #SearchData array contain the search result
        #The Law doesn't exist
        errorData=[{
            "loi":"pas trouvé"
        }]
        # if searchData array is empty, send erroData
        if  len(searchData)==0:
                response = app.response_class(
                response=json.dumps(errorData),
                status=200,
                mimetype='application/json'
                )
                return response
        #if not send the searchData array
        else: 
            response = app.response_class(
                response=json.dumps(searchData),
                status=200,
                mimetype='application/json'
                )
            return response
        


        
# User File
@app.route('/userFile', methods=['GET', 'POST'])
def ocr_file():
    file_64_encode=request.json['File']

    # convert base64 to registerPDF file
    file_64_decode = base64.b64decode(file_64_encode["File"]) 
    file_result = open(full_path, 'wb') 
    file_result.write(file_64_decode)

    file_data=loi.pdf_to_text(full_path)
    file_text={
            
    "data":
        {
        "title": "Le Contenu De Votre Fichier ",
        "text": file_data
        }
        }

    response = app.response_class(
        response=json.dumps(file_text),
        status=200,
        mimetype='application/json'
    )
    return response

# Ajouter Loi /Add law
@app.route('/addLoi', methods=['GET', 'POST'])
def ocr_loi():
    file_64_encode=request.json['File']

    # convert base64 to register PDF file
    file_64_decode = base64.b64decode(file_64_encode["File"]) 
    file_result = open(full_path, 'wb') 
    file_result.write(file_64_decode)
    loi_data=OCR() #get law and their articles

    response = app.response_class(
        response=json.dumps(loi_data),
        status=200,
        mimetype='application/json'
    )
    return response

# Change the DB Collection
# Admin collection 
adminDb = db.admin

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = adminDb.find_one({'_id': ObjectId(user_id)})
    return jsonify({
        "firstName": user['firstName'],
        "email": user['email']
    }) 


#Register Admin
@app.route('/register',methods=['POST'])
def register_user():
    user_data = request.get_json()

    # Check if the user already exists
    if adminDb.find_one({'login': user_data['login']}):
        return jsonify({'message': 'Username already exists'})

    # Insert the user data into the collection
    adminDb.insert_one(user_data)

    return jsonify({'message': 'User registered successfully'})

#login backend
@app.route("/login", methods=["POST"])
def login_user():
    login = request.json["login"]
    password = request.json["pass"]

    # Check if the username and password match in the database
    user = adminDb.find_one({'login': login, 'pass': password})


    if user is None:
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = str(user['_id'])
    return jsonify({
        "firstName": user['firstName'],
        "email": user['email']
    })

#logout
@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    print("logout")
    return "200"


if __name__ == '__main__':
    # Quick test configuration. Please use proper Flask configuration options
    # in production settings, and use a separate file or environment variables
    # to manage the secret key!
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    app.run(debug=True)
    # sess.init_app(app)