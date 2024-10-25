// // config/passportSetup.js
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require("../models/User"); // Adjust the path if needed

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:8000/api/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         let user = await User.findOne({ googleId: profile.id });
//         if (!user) {
//           user = await new User({
//             googleId: profile.id,
//             email: profile.emails[0].value,
//             name: profile.displayName,
//           }).save();
//         }
//         done(null, user);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );
// passport.serializeUser((user, done) => {
//   console.log("Serializing user:", user);
//   done(null, user._id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id); // Await the Promise returned by findById
//     done(null, user); // Pass user to the done function
//   } catch (err) {
//     done(err, null); // Pass the error if any
//   }
// });
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const newUser = new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
      });
      await newUser.save();
      done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Await the Promise returned by findById
    done(null, user); // Pass user to the done function
  } catch (err) {
    done(err, null); // Pass the error if any
  }
});
