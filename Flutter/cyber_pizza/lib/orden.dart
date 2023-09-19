import 'package:flutter/material.dart';

class Orden extends StatefulWidget {
  const Orden({super.key});

  @override
  State<Orden> createState() { return _OrdenState(); }
}

class _OrdenState extends State<Orden> {
  _OrdenState();

  @override
  Widget build(BuildContext context) {
    TextEditingController nombre = TextEditingController();
    TextEditingController direccion = TextEditingController();
    TextEditingController catidadPiezas = TextEditingController();
    
    return Form(
      child: Column(
        children: [
          const Text(
            "Ingresa tu orden",
            style: TextStyle(color: Colors.red, fontSize: 22)
          ),
          Row(
            children: [
              const Text("Tu nombre:", style: TextStyle(fontSize: 18)),
              SizedBox(
                width: 100,
                child: TextFormField(
                  controller: nombre
                ),
              )
            ],
          ),

          // Row(children: [
          //   const Text("Tu Direccion:", style: TextStyle(fontSize: 18)),
          //   TextField(
          //     controller: direccion
          //   )
          // ]),
          // Row(children: [
          //   const Text("Numero de piezas:", style: TextStyle(fontSize: 18)),
          //   TextField(
          //     controller: catidadPiezas,
          //     keyboardType: TextInputType.number
          //   )
          // ]),
        ],
      ),
    );
  }
}
