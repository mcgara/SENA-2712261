import 'package:flutter/material.dart';

double imcForm({
  required double 
})

class Imc extends StatefulWidget {
  const Imc({super.key});

  @override
  State<Imc> createState() => _ImcState();
}

class _ImcState extends State<Imc> {
  final TextEditingController _weight = TextEditingController();  
  final TextEditingController _stature = TextEditingController();  

  List<TextField> textFields() {
    return [
      TextField(
        controller: _weight,
        keyboardType: TextInputType.number,
        decoration: const InputDecoration(
          labelText: 'Digite el weight (Kg)'
        ),
      ),
      TextField(
        controller: _stature,
        keyboardType: TextInputType.number,
        decoration: const InputDecoration(
          labelText: 'Digite la stature (Mts)'
        ),
      )
    ];
  }



  @override
  Widget build(BuildContext context) {
    return 
  }
}
