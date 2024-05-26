import { Router } from "express";
import passport from "passport";
import User from "../services/user.services.js"; // Asegúrate de que User esté correctamente exportado e importado
const route = Router();

route.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/" }),
  function (req, res) {
    res.json({ response: "connexion susses" });
  }
);

route.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/123",
  })
);

route.get("/logout", async (req, res, next) => {
  req.logout(async (err) => {

    if (err) {
      return next(err);
    }
    try {
      if (req.user) {
        console.log(req.user.email);
        const user = await User.findOne(req.user.email); // Encuentra el usuario por su ID
        if (user) {
          user.online = false; // O la propiedad correspondiente
          await user.save();
        }
      }
      res.redirect("/"); // Redirige después de cerrar sesión
    } catch (error) {
      console.log("error");
    }
  });
});

export default route;
