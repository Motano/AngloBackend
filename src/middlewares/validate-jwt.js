import jwt from "jsonwebtoken";
import Pool from "../database/connection.js";

export const validateJwt = async (req, res, next) => {
  //Obtengo el token del header
  const token = req.header("token");

  //Caso de que no se haya enviado el token
  if (!token) {
    return res.status(401).json({
      status: "401 (Sin autorización)",
      mensaje: "No hay token en la petición",
    });
  }

  try {
    //Verificamos que el token sea el mismo, pasandole el keyjwt. Si es correcto el token nos retornara el payload que contiene {uid,iat(creacion),exp(expiracion)}
    const { id } = jwt.verify(token, process.env.KEYJWT);

    //Al tener un verify exitoso, pasamos al request el uid. Este req seguirá pasando por los middlewares hasta llegar al controlador del usuario

    const autenticarUsuario = await Pool.query(
      "SELECT * FROM usuario WHERE id_usuario=$1",
      [id]
    );
    //Verifico si el usuario auth existe
    if (autenticarUsuario.rowCount == 0) {
      return res.status(403).json({
        status: "403 (Sin permiso)",
        mensaje: "Usuario no existe en BD",
      });
    }

    req.user = autenticarUsuario.rows[0];

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "401 (Sin autorización)",
      mensaje: "Token no valido",
    });
  }
};

export default validateJwt;
