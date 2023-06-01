import listOfIngredients from "./FileInput"
function Test(){
    let y=[{"loi": "119-05",
              "article_1":"the whole thing",
              "article_2":"the whole thing",
              "article_3":"the whole thing",
              "article_4":"the whole thing",
              "article_5":"the whole thing",
              "article_6":"the whole thing",
              "article_7":"the whole thing"
            },
        ]
    if (listOfIngredients.length == 0)
        return y;
    else 
        return listOfIngredients[0]["data"];
}
export default Test;