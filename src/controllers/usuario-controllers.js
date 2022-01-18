import Pool from "../database/connection.js";
import bcryptjs from "bcryptjs";

//funcion para crear un nuevo usuario -- post
export const createUser = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  try {
    //Encriptar la contraseña
    const saltos = bcryptjs.genSaltSync();
    const passEncrypted = bcryptjs.hashSync(password, saltos);
    // console.log(passEncrypted);

    const newUsers = await Pool.query(
      "INSERT INTO usuario (nombre,correo,password,rol) VALUES ($1,$2,$3,$4)",
      [nombre, correo, passEncrypted,rol]
    );

    if (newUsers) {
      res.status(200).json({
        msg: `Usuario ${nombre} creado exitosamente`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

//funcion para obtener los datos de un usuario por medio de su id -- get
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const consulta = await Pool.query(
      "SELECT * FROM usuario WHERE id_usuario = $1",
      [id]
    );
    const { password, ...usuario } = consulta.rows[0];
    if (consulta) {
      res.status(200).json({
        usuario,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

//funcion para actualizar los datos del usuario por medio de su id -- put
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;
  try {
    const consulta = await Pool.query(
      "UPDATE usuario SET nombre=$1, correo=$2 WHERE id_usuario=$3",
      [nombre, correo, id]
    );

    if (consulta.rowCount) {
      res.status(200).json({
        msg: `El usuario ${nombre} ha sido actualizado`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

//funcion para eliminar los datos de un usuario por medio de su id -- delete
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;
  try {
    if (consulta.rowCount) {
      res.status(200).json({
        msg: `falta`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
