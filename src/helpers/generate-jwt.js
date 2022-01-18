import jwt from "jsonwebtoken";

/* 
  Un jwt esta conformado por 
    header => algoritmo de encriptacion
    payload => informacion en formato json (data)
    verificador 
*/

const timeToExpired = "4h";

export const generateJWT = async (id = "") => {
  return new Promise((resolve, reject) => {
    //Obtengo el id del usuario
    const payload = { id };

    //sign => genera el jwt con los argumentos (datos=payload,key (.env), object(expiresIn),promise)
    jwt.sign(
      payload,
      process.env.KEYJWT,
      {
        expiresIn: timeToExpired,
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Error al generar el token (jwt).");
        } else {
          resolve(token);
        }
      }
    );
  });
};
