export default function fechaActual() {
  const hora = new Date().toLocaleTimeString("es-CL");
  const fecha = new Date().toLocaleDateString("es-CL");
  // console.log("date", date);
  // const fecha = `${date.getDate()}/${
  //   date.getMonth() + 1
  // }/${date.getFullYear()}`;
  // const hora = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const fecha_actual = `${fecha} ${hora}`;
  return fecha_actual;
}
