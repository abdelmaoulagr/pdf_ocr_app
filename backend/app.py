import codecs
import json
from flask import Flask, request , jsonify
from flask_cors import CORS , cross_origin
import pymongo
import getLoi as loi
import base64
=======
# import getLoi as loi
=======
import getLoi as loi
>>>>>>> 9efcd2fb (dd)
#import base64
>>>>>>> 13f751d9 (i do not know what this button do)


app = Flask(__name__)
CORS(app , supports_credentials=True)



client = pymongo.MongoClient('localhost', 27017)
db = client.Lois
loiDb = db.lois

def OCR():
    #applique OCR
    text_loi=loi.clean_head(loi.pdf_to_text("/home/abdelmaoula/Documents/LP/Stage/pdf_ocr_app/file_decoded.pdf"))
    #clean data
    loi_num=loi.Loi_num(text_loi)
    titre_loi=loi.Title_loi(text_loi,loi_num)
    articles=loi.Articles(text_loi)
    return loi.Loi_to_dict(loi_num,titre_loi,articles)


@app.route('/lois',methods=['GET', 'POST'])
def get_loi():

    if  request.method == 'GET':
        # Get data from DB
        # lois=loiDb.find({},{"_id":0})
        # lois=list(lois)[0]
        get_data={
                    "loi": "n\u00b0 80-21: portant cr\u00e9ation du Registre National Agricole",
                    "Article 1": "Il est cr\u00e9\u00e9 un Registre national num\u00e9rique d\u00e9nomm\u00e9\n\u00ab Registre National Agricole \u00bb, dont la gestion est confi\u00e9e\n\u00e0 l'Administration, et dans le cadre duquel s'effectue le\ntraitement des donn\u00e9es relatives aux exploitations agricoles,\n\u00e0 travers l'inscription, la collecte, la conservation, la mise \u00e0\njour et, le cas \u00e9ch\u00e9ant la modification desdites donn\u00e9es."                    
            }
        return json.dumps([get_data]) 
    
    else:
        searchText=request.json['searchBar']
        
        # Get data from DB
        result=loiDb.find({"$text": {"$search": searchText}},{'_id':0})

        # Get articles who contains searchText
        # matching_fields = {}
        # for doc in result:
        #     for field, value in doc.items():
        #         if field=='loi':matching_fields[field] = value
        #         if isinstance(value, str) and value.find(searchText)>0 and 'loi' not in field:
        #             matching_fields[field] = value

        # searchData variable just for testing your frontend
        searchData=[{
                    "loi": "n\u00b0 60-18: relative \u00e0 la Fondation des \u0153uvres sociales \n des fonctionnaires de la direction g\u00e9n\u00e9rale\nde la protection civile",
                    "Article 1": "Il est cr\u00e9\u00e9, en vertu de la pr\u00e9sente loi, une Institution\n\u00e0 but non lucratif, dot\u00e9e de la personnalit\u00e9 morale et de\nl'autonomie financi\u00e8re, d\u00e9nomm\u00e9e \u00ab Fondation des \u0153uvres\nsociales des fonctionnaires de la Direction g\u00e9n\u00e9rale de la\nprotection civile \u00bb ; d\u00e9sign\u00e9e ci-apr\u00e8s par \u00ab la Fondation \u00bb.\nLe si\u00e8ge de la Fondation est \u00e9tablit \u00e0 Rabat.",
                    "Article 2": "La Fondation a pour objet la cr\u00e9ation, la promotion\net la gestion des projets visant \u00e0 r\u00e9aliser des \u0153uvres sociales\nau profit des fonctionnaires de la Direction g\u00e9n\u00e9rale de la\nprotection civile et des services ext\u00e9rieurs qui en rel\u00e8vent ainsi\nqu\u2019\u00e0 leurs conjoints et leurs enfants.",
                    "Article 18": "Chaque commission r\u00e9gionale de suivi est compos\u00e9e\nd\u2019un pr\u00e9sident, nomm\u00e9 par le conseil d'orientation et de\ncontr\u00f4le, de trois membres repr\u00e9sentant l'Administration\nainsi que de trois membres repr\u00e9sentant les fonctionnaires,\nd\u00e9sign\u00e9s \u00e9galement par le conseil d'orientation et de contr\u00f4le\nsur proposition du responsable r\u00e9gional de la protection civile\nconcern\u00e9."
                    }]
        if searchText=='hey':
                return jsonify({"error": 'Not Found'}), 409
        else: 
            response = app.response_class(
                response=json.dumps(searchData),
                status=200,
                mimetype='application/json'
                )
            return response
        



@app.route('/add', methods=['GET', 'POST'])
def add_data():
    """file_64_encode=request.json['File']

    # convert base64 to PDF file
    file_64_decode = base64.b64decode(file_64_encode["File"]) 
    file_result = open('file_decoded.pdf', 'wb') 
    file_result.write(file_64_decode)"""


    
    loi_data={
            
    "data":[{"loi": "n\u00b0 80-21: portant cr\u00e9ation du Registre National Agricole",
            "Article 1": "Il est cr\u00e9\u00e9 un Registre national num\u00e9rique d\u00e9nomm\u00e9\n\u00ab Registre National Agricole \u00bb, dont la gestion est confi\u00e9e\n\u00e0 l'Administration, et dans le cadre duquel s'effectue le\ntraitement des donn\u00e9es relatives aux exploitations agricoles,\n\u00e0 travers l'inscription, la collecte, la conservation, la mise \u00e0\njour et, le cas \u00e9ch\u00e9ant la modification desdites donn\u00e9es.", 
            "Article 2": "Au sens de la pr\u00e9sente loi, on entend par :\n+ Exploitant agricole : Toute personne physique ou morale\nexer\u00e7ant une activit\u00e9 agricole dans une exploitation\nagricole et est charg\u00e9e de sa gestion. Elle est d\u00e9nomm\u00e9e\nci-apr\u00e8s par \u00ab exploitant \u00bb ;\n+ Exploitation agricole : Toute unit\u00e9 de production agricole,\nv\u00e9g\u00e9tale ou animale ou les deux \u00e0 la fois, comportant\nune ou plusieurs parcelles de terre partageant les m\u00eames\nmoyens de production. Cette unit\u00e9 peut ne pas \u00eatre li\u00e9e\n\u00e0 aucune parcelle de terrain."
            }]
        }




    response = app.response_class(
        response=json.dumps(loi_data),
        status=200,
        mimetype='application/json'
    )
    return response



if __name__ == '__main__':
	app.run(debug=True)