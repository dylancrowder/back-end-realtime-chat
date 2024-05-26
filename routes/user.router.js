import { Router } from "express";
import User from "../services/user.services.js";

const router = Router();

router.get("/getAllUser", async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.getAllUsersExceptOne(id);
    const allUsers = {
      users: user,
      actualUserID: id,
    };

    res.status(200).json(allUsers);
  } catch (error) {
    console.error("fallo conseguir los usuarios");
  }
});

router.get("/actual-user", async (req, res) => {
  try {
    const actualUser = req.user.email;
    if (!actualUser) {
      res.status(200).json({ error: "actual user is disconnect" });
    }
    const user = await User.findOne(actualUser);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "usuario desconectado" });
  }
});

export default router;
