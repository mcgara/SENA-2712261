class Persona {
  String nombre = "";
  int edad = 0;
  String estado = "";
  
  Persona(String nombre, int edad, String est) {
    this.nombre = nombre;
    this.edad = edad;
    this.estado = est;
  }
}


void main() {
  Map<String, String> data = { "name": "Miguel" };
  print(data);
}
