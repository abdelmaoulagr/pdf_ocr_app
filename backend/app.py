import codecs
import json
import re
from flask import Flask, request , jsonify,session
from flask_cors import CORS , cross_origin
import pymongo
from pymongo import MongoClient
import getLoi as loi
import base64
# import getLoi as loi
import getLoi as loi
#import base64


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



# Search bar
@app.route('/search',methods=['GET', 'POST'])
def search_loi():

    
    if  request.method == 'GET':
        # Get data from DB
        # lois=loiDb.find({},{"_id":0})
        # lois=list(lois)
        lois=[
            {
            'loi': 'n° 60-18: relative à la Fondation des œuvres sociales \n des fonctionnaires de la direction générale\nde la protection civile',
                'Article 1': "Il est créé, en vertu de la présente loi, une Institution\nà but non lucratif, dotée de la personnalité morale et de\nl'autonomie financière, dénommée « Fondation des œuvres\nsociales des fonctionnaires de la Direction générale de la\nprotection civile » ; désignée ci-après par « la Fondation ».\nLe siège de la Fondation est établit à Rabat.",
                'Article 2': 'La Fondation a pour objet la création, la promotion\net la gestion des projets visant à réaliser des œuvres sociales\nau profit des fonctionnaires de la Direction générale de la\nprotection civile et des services extérieurs qui en relèvent ainsi\nqu’à leurs conjoints et leurs enfants.',
                'Article 3': "Sont adhérents et peuvent bénéficier des services de\nla Fondation, sur le même pied d'égalité, conformément aux\nconditions fixées dans son règlement intérieur :\n— tous les fonctionnaires de la Direction générale de\nla protection civile et des services extérieurs qui en\nrelèvent ainsi que leurs conjoints et leurs enfants ;\n— les fonctionnaires de la Direction générale de la\nprotection civile qui sont en position de détachement\nauprès d’administrations, d'établissements ou autres\norganismes.\nBénéficient des services de la Fondation les retraités\nde la Direction générale de la protection civile ainsi que\nleurs conjoints, leurs enfants et aussi les ayants-droit des\nfonctionnaires et agents décédés en étant en fonction au sein\nde ladite Direction et des services extérieurs qui en relèvent.",
                'Article 4': "La Fondation œuvre pour la réalisation des objectifs\nprévus à l’article 2 ci-dessus. A cet effet, elle est chargée\nconformément aux conditions fixées par son règlement\nintérieur, notamment, des missions suivantes :\n1- fournir des prestations et des services sociaux, de\nloisir et des centres d’estivage et des colonies de vacances et\norganiser des activités à caractère culturel et de loisir au profit\ndes adhérents, de leurs conjoints et de leurs enfants ;\n2- prendre les mesures nécessaires en partenariat\navec les organismes et les établissements spécialisés afin de\nfournir des services en matière de la couverture médicale et\nde l’assurance vie au profit des adhérents, de leurs conjoints\net de leurs enfants ;\n3- promouvoir ou assurer la réalisation des projets de\nlogements au profit des adhérents ;\n4- œuvrer afin de permettre aux adhérents et à\nleurs conjoints et enfants de bénéficier, à des conditions\npréférentielles, des services fournis par les établissements\npublics et privés en concluant des partenariats avec eux ;\n5- fournir d’autres services sociaux ou en faciliter l'accès\nau profit des adhérents, de leurs conjoints et de leurs enfants.",
                'Article 5': "Seule la Fondation est habilitée, après autorisation de\nl'administration de créer, gérer ou exploiter toute structure à\ncaractère social en faveur des adhérents, de leurs conjoints,\nleurs enfants et ayant droits à l’intérieur des bâtiments relevant\nde la Direction générale de la protection civile.\nLa Fondation peut déléguer la gestion desdites\nstructures aux particuliers conformément aux conditions et\nrègles définies par son règlement intérieur ainsi que par un\ncahier des charges approuvé par le conseil d'orientation et de\ncontrôle prévue à l’article 6 ci-après.",
                'Article 6': "Les organes de la Fondation sont :\n1. le conseil d'orientation et de contrôle ;\n2. le comité directeur ;\n3. les commissions régionales de suivi.\n11",
                'Article 7': "Le conseil d'orientation et de contrôle se compose, outre\nle ministre de l’intérieur en tant que président et le directeur\ngénéral de la protection civile en tant que vice-président, de :\n— un (1) membre de chacune des directions centrales de\nla direction générale de la protection civile ainsi que de\nl'école nationale de la protection civile. Chacun de ces\nmembres est désigné parmi leurs responsables ou leurs\nfonctionnaires par arrêté de l'autorité gouvernementale\nchargée de l’intérieur pour une durée de cinq ans\nrenouvelable une seule fois ;\n— trois (3) membres représentant les fonctionnaires de la\nprotection civile travaillant à la Direction générale de\nla protection civile et ses services extérieurs, désignés\npar le conseil d'orientation et de contrôle et ce, pour une\ndurée de cinq ans renouvelable une seule fois.\nLorsqu'un membre du conseil d'orientation et de\ncontrôle perd la qualité en vertu de laquelle il a été nommé, il\nest procédé à son remplacement dans un délai ne dépassant\npas un mois à compter de la date de perte de ladite qualité et\nce, conformément aux modalités de nomination du membre\nremplacé et pour la durée de son mandat restant à courir.",
                'Article 8': "Le conseil d'orientation et de contrôle est chargé de :\n— fixer une stratégie de travail de la Fondation, notamment\nles orientations générales et les options prioritaires pour\nl’accomplissement de ses missions ;\n— arrêter et évaluer périodiquement le plan d’action\nannuel et pluriannuel de la Fondation ;\n— élaborer le règlement intérieur de la Fondation et le\nsoumettre à l'approbation de l’autorité gouvernementale\nchargée de l’intérieur ;\n— fixer les conditions et les formes de passation des\nmarchés de travaux, de fournitures et de services pour\nle compte de la Fondation, conformément aux textes\nréglementaires en vigueur en la matière ;\n— approuver le budget annuel de la Fondation et les états\nde synthèse financiers de l’année budgétaire close ;\n— approuver les marchés de travaux, de fournitures et de\nservices dont le montant est supérieur à 1.000.000 de\ndirhams ;\n— approuver les conventions de coopération et de\npartenariat conclues avec les organismes publics et\nprivés ayant les mêmes objectifs ;\n— fixer le barème du montant des cotisations des adhérents\nde la Fondation dont le recouvrement est effectué par\nun prélèvement à la source par l’organisme chargé du\npaiement au profit de la Fondation ;\n— fixer les critères d'exonération des cotisations annuelles\npour les adhérents ayant un revenu limité ;\n— fixer le barème du montant des contributions qui sont à\nla charge des adhérents au titre des prestations fournies\npar la Fondation ;\n— établir un contrôle continue sur le fonctionnement de\nla Fondation et l’évaluer régulièrement ;\n— étudier et approuver le rapport annuel des activités de\nla Fondation que lui soumet le directeur du comité du\ndirecteur ;\n— prendre toutes les mesures jugées utiles pour la\npromotion et l'amélioration de la qualité des œuvres\nsociales gérées par la Fondation ;\n— statuer sur l'acceptation des dons et legs :\n— établir le statut du personnel de la Fondation.",
                'Article 9': "Le conseil d'orientation et de contrôle peut, en tant que\nde besoin, créer tout comité spécialisé qu'il juge nécessaire,\naux fins d'accomplir les missions qui lui sont imparties en\nvertu du présent article.",
                'Article 10': "Le conseil d'orientation et de contrôle se réunit sur\nconvocation de son président, en tant que de besoin et au\nmoins une fois chaque trois mois. Ses délibérations font l’objet\nde procès-verbaux signés par les membres présents.\nLe conseil délibère valablement lorsqu’au moins la\nmajorité absolue de ses membres sont présents. Si le quorum\nn’est pas atteint lors de la première réunion, le président\nappelle à une seconde réunion dans un délai ne dépassant pas\nquinze (15) jours. Dans ce cas, le conseil délibère valablement\nquel que soit le nombre des membres présents."
                },
            
            {
            'loi': 'n° 80-21: portant création du Registre National Agricole',
                'Article 1': "Il est créé un Registre national numérique dénommé\n« Registre National Agricole », dont la gestion est confiée\nà l'Administration, et dans le cadre duquel s'effectue le\ntraitement des données relatives aux exploitations agricoles,\nà travers l'inscription, la collecte, la conservation, la mise à\njour et, le cas échéant la modification desdites données.",
                'Article 2': 'Au sens de la présente loi, on entend par :\n+ Exploitant agricole : Toute personne physique ou morale\nexerçant une activité agricole dans une exploitation\nagricole et est chargée de sa gestion. Elle est dénommée\nci-après par « exploitant » ;\n+ Exploitation agricole : Toute unité de production agricole,\nvégétale ou animale ou les deux à la fois, comportant\nune ou plusieurs parcelles de terre partageant les mêmes\nmoyens de production. Cette unité peut ne pas être liée\nà aucune parcelle de terrain.',
                'Article 3': "Le traitement des données à caractère personnel\ncontenues dans le Registre National Agricole s'effectue\ndans le respect des dispositions de la loi n° 09-08 relative à\nla protection des personnes physiques à l'égard du traitement\ndes données à caractère personnel, promulguée par le dahir\nn° 1-09-15 du 22 safar 1430 (18 février 2009) et les textes pris\npour son application.",
                'Article 4': "Le Registre National Agricole a pour objet de :\n— mettre en place une base de données spécifique aux\nexploitations agricoles ;\n— attribuer un identifiant numérique pour chaque\nexploitation agricole ;\n— fournir les données nécessaires pour contribuer à\nl'élaboration des stratégies et des programmes publics\ndans le secteur agricole ;\n— fournir les données relatives aux exploitations\nagricoles pour faciliter l'accès aux programmes de\ndéveloppement agricole fournis par les administrations,\nles établissements et les entreprises publics, notamment\nceux relatifs à l’incitation à l'investissement et\nau développement des filières de production, à\nl’organisation professionnelle, ainsi qu'aux systèmes\nde gestion des risques et d'assurance agricole ;\n— contribuer au développement des programmes de\ndéveloppement agricole destinés aux exploitations\nagricoles et au renforcement et la modernisation des\ninterventions de l'Etat dans ce domaine ;\n— élaborer des indicateurs nationaux relatifs aux\nexploitations agricoles ;\n— contribuer à l'amélioration des interventions relatives au\nconseil et à l'encadrement techniques des agriculteurs ;\n— fournir les données pour faciliter le bénéfice des\nexploitants aux programmes de protection sociale\nfournis conformément aux textes législatifs et\nréglementaires en vigueur ;\n— contribuer à la simplification des procédures relatives\naux services fournis aux exploitations agricoles et à\nl'amélioration desdits services.",
                'Article 5': "Le Registre National Agricole comporte pour chaque\nexploitation agricole, selon le cas, notamment les données\nsuivantes :\n— l'identifiant numérique ;\n— l'identité de l'exploitant et son statut juridique ;\n— la géolocalisation de l'exploitation agricole et sa\nsuperficie ;\n— le statut juridique du foncier objet de l’exploitation ;\n— le nombre de parcelles de terrain et la superficie de\nchaque parcelle, le cas échéant ;\n— le type des cultures et des plantations existantes dans\nl'exploitation ;\n— le type de cheptel, son effectif et sa composition selon\nle sexe, la classe d’âge et la race ;\n— le type des autres productions animales et leurs nombres ;\n— les bâtiments, les installations, les équipements et les\nmatériels agricoles existant dans l'exploitation ;\n— le système d'irrigation utilisé.",
                'Article 6': "Outre les conditions requises pour bénéficier des\nprogrammes de développement agricole conformément\naux textes législatifs et réglementaires en vigueur, les\nadministrations publiques, les établissements et les entreprises\npublics qui gèrent lesdits programmes sont tenus d'exiger\nl'inscription préalable de toute exploitation agricole au\nRegistre National Agricole.",
                'Article 7': "L'inscription de chaque exploitation agricole au Registre\nNational Agricole s'effectue par l’exploitant ou son mandataire\nsur demande qu’il présente à l'Administration ou à travers la\nplateforme électronique créée à cet effet.\nLes modalités d'inscription au Registre National\nAgricole sont fixées par voie réglementaire.",
                'Article 8': "L'inscription au Registre National Agricole donne lieu à\nl'attribution d’un identifiant numérique à chaque exploitation\nagricole.\nSans préjudice aux dispositions de l’article 14 de la\nprésente loi, l’utilisation de l'identifiant numérique ne peut\nêtre faite que par l'exploitant ou son mandataire.",
                'Article 9': "Toute inscription au Registre National Agricole donne\nlieu à l'octroi d’un certificat d'inscription de l'exploitation\nagricole. Les modalités de son octroi sont fixées par voie\nréglementaire.",
                'Article 10': 'Le Registre National Agricole comprend les inscriptions,\nles inscriptions modificatives et les radiations. Ces opérations\nsont effectuées selon les modalités prévues à l’article 7\nci-dessus.'
            }
            
        ]
        return json.dumps(lois) 
    
    else:
        searchText=request.json['searchBar']
        
        # Get data from DB
        # result=loiDb.find({"$text": {"$search": searchText}},{'_id':0})


        # searchData=[matching_fields]
        # searchData variable just for testing your frontend
        
        # Get articles who contains searchText
        '''matching_fields = {}
        for doc in result:
            for field, value in doc.items():
                if field=='loi':matching_fields[field] = value
                if isinstance(value, str) and value.find(searchText)>0 and 'loi' not in field:
                    matching_fields[field] = value'''
        # test data 
        result=[
            {
            'loi': 'n° 60-18: relative à la Fondation des œuvres sociales \n des fonctionnaires de la direction générale\nde la protection civile',
                'Article 1': "Il est créé, en vertu de la présente loi, une Institution\nà but non lucratif, dotée de la personnalité morale et de\nl'autonomie financière, dénommée « Fondation des œuvres\nsociales des fonctionnaires de la Direction générale de la\nprotection civile » ; désignée ci-après par « la Fondation ».\nLe siège de la Fondation est établit à Rabat.",
                'Article 2': 'La Fondation a pour objet la création, la promotion\net la gestion des projets visant à réaliser des œuvres sociales\nau profit des fonctionnaires de la Direction générale de la\nprotection civile et des services extérieurs qui en relèvent ainsi\nqu’à leurs conjoints et leurs enfants.',
                'Article 3': "Sont adhérents et peuvent bénéficier des services de\nla Fondation, sur le même pied d'égalité, conformément aux\nconditions fixées dans son règlement intérieur :\n— tous les fonctionnaires de la Direction générale de\nla protection civile et des services extérieurs qui en\nrelèvent ainsi que leurs conjoints et leurs enfants ;\n— les fonctionnaires de la Direction générale de la\nprotection civile qui sont en position de détachement\nauprès d’administrations, d'établissements ou autres\norganismes.\nBénéficient des services de la Fondation les retraités\nde la Direction générale de la protection civile ainsi que\nleurs conjoints, leurs enfants et aussi les ayants-droit des\nfonctionnaires et agents décédés en étant en fonction au sein\nde ladite Direction et des services extérieurs qui en relèvent."            
                },
            
            {
            'loi': 'n° 80-21: portant création du Registre National Agricole',
                'Article 1': "Il est créé un Registre national numérique dénommé\n« Registre National Agricole », dont la gestion est confiée\nà l'Administration, et dans le cadre duquel s'effectue le\ntraitement des données relatives aux exploitations agricoles,\nà travers l'inscription, la collecte, la conservation, la mise à\njour et, le cas échéant la modification desdites données.",
                'Article 2': 'Au sens de la présente loi, on entend par :\n+ Exploitant agricole : Toute personne physique ou morale\nexerçant une activité agricole dans une exploitation\nagricole et est chargée de sa gestion. Elle est dénommée\nci-après par « exploitant » ;\n+ Exploitation agricole : Toute unité de production agricole,\nvégétale ou animale ou les deux à la fois, comportant\nune ou plusieurs parcelles de terre partageant les mêmes\nmoyens de production. Cette unité peut ne pas être liée\nà aucune parcelle de terrain.',
                'Article 3': "Le traitement des données à caractère personnel\ncontenues dans le Registre National Agricole s'effectue\ndans le respect des dispositions de la loi n° 09-08 relative à\nla protection des personnes physiques à l'égard du traitement\ndes données à caractère personnel, promulguée par le dahir\nn° 1-09-15 du 22 safar 1430 (18 février 2009) et les textes pris\npour son application.",
                'Article 4': "Le Registre National Agricole a pour objet de :\n— mettre en place une base de données spécifique aux\nexploitations agricoles ;\n— attribuer un identifiant numérique pour chaque\nexploitation agricole ;\n— fournir les données nécessaires pour contribuer à\nl'élaboration des stratégies et des programmes publics\ndans le secteur agricole ;\n— fournir les données relatives aux exploitations\nagricoles pour faciliter l'accès aux programmes de\ndéveloppement agricole fournis par les administrations,\nles établissements et les entreprises publics, notamment\nceux relatifs à l’incitation à l'investissement et\nau développement des filières de production, à\nl’organisation professionnelle, ainsi qu'aux systèmes\nde gestion des risques et d'assurance agricole ;\n— contribuer au développement des programmes de\ndéveloppement agricole destinés aux exploitations\nagricoles et au renforcement et la modernisation des\ninterventions de l'Etat dans ce domaine ;\n— élaborer des indicateurs nationaux relatifs aux\nexploitations agricoles ;\n— contribuer à l'amélioration des interventions relatives au\nconseil et à l'encadrement techniques des agriculteurs ;\n— fournir les données pour faciliter le bénéfice des\nexploitants aux programmes de protection sociale\nfournis conformément aux textes législatifs et\nréglementaires en vigueur ;\n— contribuer à la simplification des procédures relatives\naux services fournis aux exploitations agricoles et à\nl'amélioration desdits services."            
                }
            ]
        
        errorData=[{
            "loi":"not found"
        }]
        if  searchText=='error':
                response = app.response_class(
                response=json.dumps(errorData),
                status=200,
                mimetype='application/json'
                )
                return response
        else: 
            response = app.response_class(
                response=json.dumps(result),
                status=200,
                mimetype='application/json'
                )
            return response
        


        
# User File
@app.route('/userFile', methods=['GET', 'POST'])
def ocr_file():
    '''file_64_encode=request.json['File']

    # convert base64 to registerPDF file
    file_64_decode = base64.b64decode(file_64_encode["File"]) 
    file_result = open('file_decoded.pdf', 'wb') 
    file_result.write(file_64_decode)

    file_data=loi.pdf_to_text("/home/abdelmaoula/Documents/LP/Stage/pdf_ocr_app/file_decoded.pdf")
    file_text=loi.text_to_dict(file_data)'''
    file_text={
            
    "data":{
        "title": "Text ",
        "text": "Au sens"}
        }

    response = app.response_class(
        response=json.dumps(file_text),
        status=200,
        mimetype='application/json'
    )
    return response

# Ajouter Loi
@app.route('/addLoi', methods=['GET', 'POST'])
def ocr_loi():
    '''file_64_encode=request.json['File']

    # convert base64 to registerPDF file
    file_64_decode = base64.b64decode(file_64_encode["File"]) 
    file_result = open('file_decoded.pdf', 'wb') 
    file_result.write(file_64_decode)'''


    # loi_data=OCR()

    loi_data={
    "data":[{"loi": "n\u00b0 80-21: portant cr\u00e9ation du Registre National Agricole",
            "Article 1": "Il est cr\u00e9\u00e9 un Registre national num\u00e9rique d\u00e9nomm\u00e9\n\u00ab Registre National Agricole \u00bb, dont la gestion est confi\u00e9e\n\u00e0 l'Administration, et dans le cadre duquel s'effectue le\ntraitement des donn\u00e9es relatives aux exploitations agricoles,\n\u00e0 travers l'inscription, la collecte, la conservation, la mise \u00e0\njour et, le cas \u00e9ch\u00e9ant la modification desdites donn\u00e9es.", 
            "Article 2": "Au sens de la pr\u00e9sente loi, on entend par :\n+ Exploitant agricole : Toute personne physique ou morale\nexer\u00e7ant une activit\u00e9 agricole dans une exploitation\nagricole et est charg\u00e9e de sa gestion. Elle est d\u00e9nomm\u00e9e\nci-apr\u00e8s par \u00ab exploitant \u00bb ;\n+ Exploitation agricole : Toute unit\u00e9 de production agricole,\nv\u00e9g\u00e9tale ou animale ou les deux \u00e0 la fois, comportant\nune ou plusieurs parcelles de terre partageant les m\u00eames\nmoyens de production. Cette unit\u00e9 peut ne pas \u00eatre li\u00e9e\n\u00e0 aucune parcelle de terrain."
            },
            # {

            # }
            ]
        }




    response = app.response_class(
        response=json.dumps(loi_data),
        status=200,
        mimetype='application/json'
    )
    return response

# Admin collection
adminDb = db.admin
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
    # return jsonify('From Flask',user_data)

    
    # session["user_id"] = new_user.id

    # return jsonify({
    #     "id": new_user.id,
    #     "email": new_user.email
    # })

#login backend
@app.route("/login", methods=["POST"])
def login_user():
    login = request.json["login"]
    password = request.json["pass"]

    # Check if the username and password match in the database
    user = adminDb.find_one({'username': username, 'password': password})


    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    # if not user.passward:
    #     return jsonify({"error": "Unauthorized"}), 401
    
    # session["user_id"] = user['_id']

    return jsonify(user)
    # {
    #     "id": user.id,
    #     "email": user.email
    # }
if __name__ == '__main__':
	app.run(debug=True)