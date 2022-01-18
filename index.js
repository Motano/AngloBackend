import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

//Import rutas
import userRoutes from "./src/routes/usuarios.js";
import authRoutes from "./src/routes/auth.js";

//Dotenv para utilizar variables ocultas en .env
dotenv.config();

//Inicialización de express
const app = express();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Rutas
app.use("/auth", authRoutes);
app.use("/usuario", userRoutes);
//recordar agregar la validación del jwt para poder hacer las peticiones de las demas rutas

//Puerto para iniciar el servidor
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  try {
    console.log(`Port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
