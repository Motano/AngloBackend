import bcryptjs from "bcryptjs";
import Pool from "../database/connection.js";
import { generateJWT } from "../helpers/generate-jwt.js";

//Funcion asincronica que valida los datos ingresados para acceder a la api
export const login = async (req, res) => {
  const { correo, password } = req.body;

  //Verifico si el correo existe en la bd
  const usuario = await Pool.query("SELECT * FROM usuario WHERE correo=$1", [
    correo,
  ]);

  //Caso de que no encuentre el correo en la bd
  if (usuario.rowCount == 0) {
    return res.status(400).json({ msg: "El correo es inválido" });
  }

  //obtengo la constraseña de la bd y la valido con la contraseña ingresada(desencriptada con compareSync)
  const passwordQuery = usuario.rows[0].password;
  const isValidPassword = bcryptjs.compareSync(password, passwordQuery);

  if (!isValidPassword) {
    return res.status(400).json({
      msg: "Error en la validación de la contraseña",
    });
  }

  //generar el jwt con el helpers generateJWT(id)
  const token = await generateJWT(usuario.rows[0].id_usuario);

  //ojo aqui se retorna todos los datos del usuario, incluida la contrase y su id
  res.status(200).json({
    usuario: usuario.rows[0],
    token,
  });
};
