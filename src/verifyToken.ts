import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

export default async (bearerToken: string) => {
  const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  });

  function getJwksClientKey(header: { kid?: string | null | undefined; }, callback: (arg0: null, arg1: any) => void) {
    client.getSigningKey(header.kid, function (error, key) {
      if (error) {
        throw new Error(error.message)
      }
      const signingKey = key.getPublicKey() || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }

  return new Promise((resolve, reject) => {
    jwt.verify(
      bearerToken,
      getJwksClientKey,
      {
        audience: process.env.AUTH0_AUDIENCE,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ["RS256"],
      },
      function (err, decoded) {
        if (err) reject(err);
        resolve(decoded);
      }
    );
  });
};