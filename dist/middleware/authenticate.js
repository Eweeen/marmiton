"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const jwt_1 = require("../authentication/jwt");
const http_status_1 = __importDefault(require("http-status"));
/**
  * middleware to check whether user has access to a specific endpoint
  *
  * @param allowedAccessTypes list of allowed access types of a specific endpoint
*/
const authorize = (allowedAccessTypes) => async (req, res, next) => {
    try {
        let jwt = req.headers.authorization;
        // verify request has token
        if (!jwt) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({ message: 'Invalid token ' });
        }
        // remove Bearer if using Bearer Authorization mechanism
        if (jwt.toLowerCase().startsWith('bearer')) {
            jwt = jwt.slice('bearer'.length).trim();
        }
        console.log('avant validate', jwt);
        // verify token hasn't expired yet and is valid
        const decodedToken = await (0, jwt_1.validateToken)(jwt);
        /* const decodedToken = {
          name: 'partenaire1',
          userId: 123,
          // Les accès à l'API que l'on souhaite ouvrir à ce partenaire
          accessTypes: [
            'getRecipeList',
            'updateRecipe',
            'addRecipe'
          ]
        };*/
        console.log('apres valideToken', jwt);
        const hasAccessToEndpoint = allowedAccessTypes.some((at) => decodedToken.accessTypes.some((uat) => uat === at));
        if (!hasAccessToEndpoint) {
            return res.status(401).json({ message: 'No enough privileges to access endpoint' });
        }
        next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Expired token' });
            return;
        }
        res.status(http_status_1.default.UNAUTHORIZED).json({ message: 'Failed to authenticate user' });
    }
};
exports.authorize = authorize;
