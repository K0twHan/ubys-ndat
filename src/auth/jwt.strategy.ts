import { ExtractJwt,Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { jwtSecret } from "src/utils/constant";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromExtractors([(request) => {
            let token = null;
            if (request && request.cookies) {
              token = request.cookies['jwt'];
            }
            return token;
          }]),
          ignoreExpiration: false,
            secretOrKey : jwtSecret,
        });

    }
   
    async validate(payload : {id: number,tc: string}) {
        return payload
    }


}