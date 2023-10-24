import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../models';
import envConfig from '../config/env.config';

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envConfig.secret
    },
    async function (jwt_payload: JwtPayload, done) {
      try {
        const { sub } = jwt_payload;
        const user = await User.findByPk(sub);

        return done(user, true);
      } catch (e) {
        return done(e, false);
      }
    }
  )
);
