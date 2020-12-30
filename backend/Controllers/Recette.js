const Recette = require("../Models/Recette");
const base64img = require("base64-img");
module.exports.controller = (app) => {
  app.get("/bringRecettes", (req, res) => {
    Recette.find({}, (error, recette) => {
      if (error) {
        console.log(error);
      }
      res.send(recette);
      console.log(recette);
    });
  });
  app.get("/filterRecettes", async (req, res) => {
    console.log(typeof req.query.relevance);
    await Recette.aggregate(
      [
        {
          $search: {
            text: {
              query: req.query.Ingrédients,
              path: "Ingredients",
            },
          },
        },
        {
          $limit: parseInt(req.query.relevance),
        },
        { $sort: { score: { $meta: "textScore" } } },
      ],
      (error, recette) => {
        if (error) {
          console.log(error);
        }
        res.send(recette);
      }
    );
  });
  app.post("/addRecette", (req, res) => {
    const new_recette = new Recette({
      Nom: req.body.Nom,
      Ingredients: req.body.Ingrédients,
      Etapes: req.body.Etapes,
      Auteur: req.body.auteur,
      Image: req.body.Image,
      Recette_pour: req.body.Nb_personnes,
    });
    new_recette.save((error, recette) => {
      if (error) {
        console.log(error);
      }
      console.log(recette);
    });
  });
};
