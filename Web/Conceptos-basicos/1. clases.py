class InstrumentoMusical:
  nombre: str
  origen: str
  referencia: str
  _precio: int

  def __init__(
    self,
    nombre: str,
    origen: str,
    precio: int,
    referencia: str = "",
  ) -> None:
    self.nombre = nombre.capitalize()
    self.origen = origen.capitalize()
    self._precio = abs(precio)
    self.referencia = referencia

  def afinar(self) -> None:
    print(f"El instrumento {self.nombre!r} ha sido afinado")

  def sonar(self) -> None:
    print(f"El instrumento {self.nombre!r} esta sonando")
    
  def calibrar(self) -> None:
    print(f"El instrumento {self.nombre!r} se esta calibrando")


# ------------------------------------------------------------------------------

class Vehiculo:
  modelo: str
  referencia: str
  area: float
  cilendraje: int
  nro_matricula: str
  color: str

  def __init__(
    self,
    modelo: str,
    area: float,
    cilendraje: int,
    nro_matricula: str,
    color: str,
    referencia: str = ""
  ) -> None:
    self.modelo = modelo.upper()
    self.area = abs(area)
    self.cilendraje = abs(cilendraje)
    self.nro_matricula = nro_matricula
    self.color = color
    self.referencia = referencia
  
  def arrancar(self) -> None:
    print(f"Arrancando el vehiculo modelo {self.modelo!r}")

  
  def acelerar(self) -> None:
    print(f"Acelerando el vehiculo modelo {self.modelo!r}", end=" ")
    print(f"y con un cilendraje de {self.cilendraje:.2f}")

  
  def frenar(self) -> None:
    print(f"Frenando el vehiculo modelo {self.modelo!r}")

  
  def detener(self) -> None:
    print(f"deteniendo el vehiculo {self.modelo!r}")

  
# ------------------------------------------------------------------------------

class FiguraGeometrica:
  nombre: str
  area: float
  volumen: float
  referencia: str

  def __init__(self, nombre: str) -> None:
    self.nombre = nombre.upper()
    self.area = 0
    self.volumen = 0

  def calcular_area(self, medida_lado: int | float) -> None:
    self.area = medida_lado ** 2
    print(f"El area de la figura ha sido calculada y es: {self.area!r}")

  def calcular_volumen(self, medida_lado: int | float) -> None:
    self.volumen = medida_lado ** 3
    print(f"El volumen de la figura ha sido calculada y es: {self.volumen!r}")
  

i = InstrumentoMusical("Trompeta", "Francia", 3500)
v = Vehiculo("BMW", 15.5, 125, "ACX - 255", "Blue")
f = FiguraGeometrica("Cuadrado")


    
# ------------------------------------------------------------------------------

from typing import Literal

ERR_TYPE_DATA = "La variable {var!r} no es de tipo {type!r}."

class Cita:
  numero: int
  tipo: Literal["General", "Especialista"]
  tarifa: float
  valor_final: float

  def __init__(self, numero: int, tipo: Literal[1, 2, 3, 4, 5], tarifa: float) -> None:
    self.__numero = abs(numero)
    self.__tipo = abs(tipo)
    self.__tarifa = abs(tarifa)

  @property
  def numero(self) -> int:
    return self.__numero

  @property
  def tipo(self) -> Literal["General", "Especialista"]:
    return "General" if self.__tipo >= 3 else "Especialista"

  @property
  def tarifa(self) -> float:
    return self.__tarifa

  @property
  def valor_final(self) -> float:
    porcentaje = self.tarifa * 0.5  
    total = self.tarifa
    if self.tipo == "General": total -= porcentaje
    else: total += porcentaje
    return total 


documento_cita = """
El numero de la cita es: {num}
Esta cita es de tipo: {tipo}
Su tarifa normal es: {tarifa:,.2f}
Pero por ser de tipo {tipo!r} queda con un valor final de: $ {valor:,.2f}
"""

cita = Cita(123456, 1, 1000)
kwargs = {
  "num": cita.numero,
  "tipo": cita.tipo,
  "tarifa": cita.tarifa,
  "valor": cita.valor_final
}
print(documento_cita.format(**kwargs))

