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


    