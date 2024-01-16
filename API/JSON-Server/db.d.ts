export interface Curso {
  nombre: string
  ficha: number
  tipo: string
}

export interface Instructor {
  id: number,
  nombres: {
    primero: string,
    secundo: string
  },
  apellidos: {
    primero: string,
    secundo: string
  },
  edad: number,
  email: string
}

export interface Aprendiz {
  id: number,
  nombres: { primero: string, segundo: string },
  apellidos: { primero: string, segundo: string },
  estado: string,
  correo: string
}


export interface DataBase {
  curso: Curso
  instructores: Instructor[]
  aprendices: Aprendiz[]
}

export const db: DataBase
export default db
