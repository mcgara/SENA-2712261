import 'package:flutter/material.dart';

class sueldo extends StatefulWidget {
  const sueldo({super.key});

  @override
  State<sueldo> createState() => _sueldoState();
}

class _sueldoState extends State<sueldo> {
  TextEditingController nombreEmpleado   = TextEditingController();
  TextEditingController horasTrabajada = TextEditingController();
  TextEditingController valorHora= TextEditingController();
  
  double resultado=0;
  String categoria ="";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("calcular sueldo")),
      body: Column(
        children: [

          TextField(
            controller: nombreEmpleado, keyboardType: TextInputType.number, decoration: const InputDecoration(
              labelText: 'nombre del empleado'
            ),
          ),

          TextField(
            controller: horasTrabajada, keyboardType: TextInputType.number, decoration: const InputDecoration(
              labelText: 'horas trabajadas'
            ),
          ),

          TextField(
            controller: valorHora, keyboardType: TextInputType.number, decoration: const InputDecoration(
              labelText: 'valor de la hora '
            ),
          ),


        ElevatedButton(onPressed: (){
             calcular();
          }, child: const Text("Calcular")),
          Text("$resultado  $categoria")

        ],
      )
    );
  }
  void calcular(){
    setState(() {
        double hT  = double.parse(horasTrabajada.text);
        double vH  = double.parse(valorHora.text);
   
        resultado = hT*vH ;


        
        
    });
  }
}
  