import pdf2image
import pytesseract

def pdf_to_text(path):
    '''
    This function convert image to text
    '''
    img = pdf2image.convert_from_path(path)
    text=""
    #converter les images a text
    for i in range(len(img)):
        text+=pytesseract.image_to_string(img[i],lang='fra')
    return text

def clean_head(textLoi):
    #cleaning of headpages
    textLoi=textLoi.replace('BULLETIN OFFICIEL',"")
    textLoi=textLoi.replace(textLoi[:58].splitlines()[0],"")
    return textLoi.split('Loi')[1]

def Loi_num(textLoi):
    #get Number
    return textLoi[1:9]


def Title_loi(textLoi , LoiNum):
    '''
    Titre de Loi
    '''
    title_IndexEnd=textLoi.find("Chapitre")
    title_IndexStart=textLoi.find(LoiNum)
    # titleLoi=textLoi[title_IndexStart+8:title_IndexEnd]
    # titleLoi=titleLoi.strip()
    return textLoi[title_IndexStart+8:title_IndexEnd].strip()

def Articles(textLoi):
    '''
    Extract all Articles from text 
    '''
    Article=textLoi.split('Article')[1:]

    for art in range(len(Article)):

        if art==0: #clean first Articale
            Article[art]=Article[art][8:].strip()
            Article[art].strip()[:]
        else: #clean the number of Articale
            Article[art]=Article[art][3:]
        
        #clean all 'chapitre' existe
        index_chap=Article[art].find('Chapitre')
        if index_chap>0:
            Article[art]=Article[art][:index_chap]

        #clean all 'Section' existe
        index_sec=Article[art].find('Section')
        if index_sec>0:#clean all 'chapitre' existe
            Article[art]=Article[art][:index_sec]
        
        #clean page numbers
        if Article[art].strip()[-2:].isalnum():
            Article[art]=Article[art].strip()[:-2]

        
        #strip all
        Article[art] =Article[art].replace('\n\n','\n')
        Article[art]=Article[art].strip()
    
    #clean the last Article
    fin=Article[-1].find('Le texte en langue arabe')
    if fin >0 :
        Article[-1]=Article[-1][:fin]
    return Article


def Loi_to_dict(LoiNum , titleLoi,Article):
    '''
    This function  convert data to Dictionary
    '''
    data={
    "loi":f"{LoiNum}: {titleLoi}"
    }
    for art in range(len(Article)):
        data[f"Article {art+1}"]=Article[art]
    return data

def text_to_dict(testLoi):
    '''
    '''