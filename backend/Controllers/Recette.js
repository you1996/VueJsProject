const Recette = require("../Models/Recette");
const base64img = require("base64-img");
module.exports.controller = (app) => {
  //////Get all recettes from the DB
  app.get("/bringRecettes", (req, res) => {
    Recette.find({}, (error, recette) => {
      if (error) {
        console.log(error);
      }
      res.send(recette);
    });
  });
  ////////

  ///////Filter recettes using the query from input user
  //////The user input is an Array of strings( Ingrédients)
  app.get("/filterRecettes", async (req, res) => {
    var queryFromuser = req.query.Ingrédients; ///The query(Array full of ingrédients)
    ////rebuild another array to prepare the strings(Ingrédients) for the search
    ///using regular expressions(e.g == ^ouef.* ==> the search returns also ouefs)
    var quer = [];
    queryFromuser.forEach((element) => {
      element = element + ".*";
      "^".concat(element);
      quer.push(element);
    });
    ////
    /////Aggregation to perform a traitement to many documents
    await Recette.aggregate(
      [
        {
          $searchBeta: {
            search: {
              query: quer,
              path: "Ingredients", //the targeted Document field in the database
            },
            highlight: { path: "Ingredients" }, //return the field as it is no change and highlight it
          },
        },
        {
          //return all the document fields
          $project: {
            titre: 1,
            Ingredients: 1,
            Nom: 1,
            Etapes: 1,
            Image: 1,
            Recette_pour: 1,
            Auteur: 1,
            score: { $meta: "searchScore" }, //score is handled by indexes in mongodb we just using them
            highlight: { $meta: "searchHighlights" },
          },
        },
        { $match: { score: { $gt: 0.5 } } }, //return only the documents that match with a score greater then 0,5

        { $limit: parseInt(req.query.relevance, 10) }, //the query.relevance is a user input to adjust the number of documents that he like to render on screen
      ],
      (error, recette) => {
        if (error) {
          console.log(error);
        }
        res.send(recette);
      }
    );
  });
  ////////
  ///////

  //////add a recette
  app.post("/addRecette", (req, res) => {
    const new_recette = new Recette({
      Nom: req.body.Nom,
      Ingredients: req.body.Ingrédients,
      Etapes: req.body.Etapes,
      Auteur: req.body.Auteur,
      Image: req.body.Image,
      Recette_pour: req.body.Nb_personnes,
    });
    new_recette.save((error, recette) => {
      if (error) {
        console.log(error);
      }
    });
  });
  ////////
};
