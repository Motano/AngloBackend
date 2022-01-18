import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

console.log(isProduction ? "Entorno de producción" : "Entorno de desarrollo");

const pool = new pg.Pool({
  connectionString: isProduction ? connectionString : process.env.DATABASE_URL,
});

export default pool;
