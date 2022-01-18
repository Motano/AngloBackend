-- crear bd y listar(ver) con \l
-- para acceder a una bd = \c nombreBD
-- se crearan las tablas en orden para que las lea la terminal y asi evitar fallos

-- Se ocupará una notación C, ocupando el separador "_" --> ej: Tipo_venta

CREATE DATABASE AngloAmerican;

CREATE TABLE IF NOT EXISTS Usuario(
    id_usuario UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    nombre varchar(100) NOT NULL,
    correo varchar(100) NOT NULL,
    password varchar(200) NOT NULL,
    rol varchar(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS detenciones (
    id_detenciones UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    imprevistos integer,
    efecto_bajos integer,
    mantenimiento_prog integer,
    control_proc integer,
    estrategia_op_agua integer
);

CREATE TABLE IF NOT EXISTS planta_lb (
    id_planta_lb UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    id_detenciones UUID REFERENCES detenciones(id_detenciones),
    hrs_posibles integer,
    hrs_reales integer
);
CREATE TABLE IF NOT EXISTS planta_cf (
    id_planta_cf UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    id_detenciones UUID REFERENCES detenciones(id_detenciones),
    hrs_posibles integer,
    hrs_reales integer
);
CREATE TABLE IF NOT EXISTS chanc_prim_1 (
    id_chanc_prim_1 UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    id_detenciones UUID REFERENCES detenciones(id_detenciones),
    hrs_posibles integer,
    hrs_reales integer,
    correa_cm3 integer
);
CREATE TABLE IF NOT EXISTS chanc_prim_2 (
    id_chanc_prim_2 UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    id_detenciones UUID REFERENCES detenciones(id_detenciones),
    hrs_posibles integer,
    hrs_reales integer,
    correa_overland integer
);
CREATE TABLE IF NOT EXISTS short_termn(
    id_short_term UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    id_planta_lb UUID REFERENCES planta_lb(id_planta_lb),
    id_planta_cf UUID REFERENCES planta_cf(id_planta_cf),
    id_chanc_prim_1 UUID REFERENCES chanc_prim_1(id_chanc_prim_1),
    id_chanc_prim_2 UUID REFERENCES chanc_prim_2(id_chanc_prim_2),
    dia integer,
    dia_sem varchar(2),
    mes varchar(3),
    horas_calendario integer
);