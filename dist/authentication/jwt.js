"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * création du token JWT
 */
function generateToken(user) {
    // Les informations que l'on souhaite enregistrer dans le token
    const payload = {
        lastname: user.lastname,
        firstname: user.firstname,
        userId: user.id,
        // Les accès à l'API que l'on souhaite ouvrir à ce partenaire
        accessTypes: [user.permission.role]
    };
    // Lecture du fichier private.key permettant de crypter le JWT
    const privateKey = fs.readFileSync(path.join(__dirname, './../../private.key'));
    const signInOptions = {
        // RS256 utilises une paire de clé public/privée key.
        algorithm: 'RS256',
        // Durée de validité du token
        expiresIn: '10h'
    };
    // generation du token JWT
    // Note: la passphrase devrait être dans le .env
    return (0, jsonwebtoken_1.sign)(payload, { key: privateKey, passphrase: process.env.KEY_PASSWORD }, signInOptions);
}
exports.generateToken = generateToken;
/**
  * Vérifie que le token JWT est valide
  *
  * @param token Le token JWT à valider
  * @return Promise<TokenPayload> Une promesse contenant les éléments utiles (le payload) contenu dans le token
*/
function validateToken(token) {
    const publicKey = fs.readFileSync(path.join(__dirname, './../../public.key'));
    return new Promise(function (resolve, reject) {
        (0, jsonwebtoken_1.verify)(token, publicKey, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        });
    });
}
exports.validateToken = validateToken;
