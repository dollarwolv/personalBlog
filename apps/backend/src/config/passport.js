import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import prisma from "../db/prisma.js";

export function configurePassport() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // "Authorization: Bearer <token>"
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        // payload is what you signed at login
        const user = await prisma.user.findUnique({
          where: {
            id: payload.sub,
          },
        });
        if (!user) return done(null, false);
        return done(null, { id: user.id, username: user.username });
      } catch (err) {
        return done(err, false);
      }
    })
  );
  return passport;
}

export const requireJwt = passport.authenticate("jwt", { session: false });
