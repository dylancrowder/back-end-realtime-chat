import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../services/user.services.js";
import bcrypt from "bcrypt";
export const initPassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email", // Cambiar de emailField a usernameField
        passReqToCallback: true,
      },
      async function (req, email, password, done) {
        try {
          const { name, lastName, thumbnail } = req.body;
          console.log(name, lastName, thumbnail, email, password);
          if (!name || !lastName || !email || !password) {
            return done(null, false, { message: "All fields are required." });
          }

          const existingUser = await User.findOne(email);
          if (existingUser) {
            return done(null, false, { message: "Email is already in use." });
          }

          const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
          const newUser = await User.createUser(
            name,
            lastName,
            email,
            hashedPassword, // Use hashed password
            thumbnail
          );

          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email", // Cambiar de emailField a usernameField
        passReqToCallback: true,
      },
      async function (req, email, password, done) {
        try {
          if (!email || !password) {
            return done(null, false, { message: "All fields are required." });
          }

          const existingUser = await User.findOne(email);
          
          if (!existingUser) {
            return done(null, false, { message: "User not found." });
          }

          const isMatch = bcrypt.compare(password, existingUser.password); // Compare passwords
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password." });
          }
          existingUser.online = true;
          await existingUser.save();
      
          return done(null, existingUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.email);
  });

  passport.deserializeUser(async function (email, done) {
    try {
      const user = await User.findOne(email);

      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
export default passport;
