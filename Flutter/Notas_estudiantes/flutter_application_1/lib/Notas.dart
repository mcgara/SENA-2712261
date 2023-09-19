import 'package:flutter/material.dart';

class notas extends StatefulWidget {
 const notas({super.key});
  @override
  State<notas> createState() => _notasState();
}

class _notasState extends State<notas> {
  TextEditingController nota1   = TextEditingController();
  TextEditingController nota2   = TextEditingController();
  TextEditingController nota3   = TextEditingController();
  TextEditingController nota4   = TextEditingController();
  double resultado=0;
  String categoria ="";
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Calcular notas")),
      body: Column(
        children: [

          TextField(
            controller: nota1, keyboardType: TextInputType.number, decoration: const InputDecoration(
              labelText: 'Digite peso(kg)'
            ),
          ),

          TextField(
            controller: nota2,keyboardType: TextInputType.number, decoration: const InputDecoration(
              labelText: 'Digite altura(mts)'
            ),
          ),
          
          TextField(
            controller: nota3, keyboardType: TextInputType.number, decoration: const InputDecoration(
              labelText: 'Digite peso(kg)'
            ),
          ),
          
          TextField(
            controller: nota4, keyboardType: TextInputType.number, decoration: const InputDecoration(
              labelText: 'Digite peso(kg)'
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
        double n1    = double.parse(nota1.text);
        double n2  = double.parse(nota2.text);
        double n3  = double.parse(nota3.text);
        double n4  = double.parse(nota4.text);
        resultado = (n1+n2+n3+n4) /4;
        if(resultado ==10){
          categoria = "Excelente";
        }else if(resultado <=9 && resultado >=7){
          categoria = "Buena";
        }else if(resultado <7 && resultado >=6){
          categoria = "Aceptable";
        }else if(resultado <6){
          categoria = "Baja";
          
        }
    });
  }
}