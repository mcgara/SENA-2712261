import 'package:flutter/material.dart';

class Calculator extends StatelessWidget {
  const Calculator({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Container(
          decoration: BoxDecoration(
            color: const Color.fromRGBO(232, 245, 255, 1),
            border: Border.all(
              width: 7,
              color: const Color.fromRGBO(4, 80, 150, 1)
            ),
            borderRadius: const BorderRadius.all(Radius.circular(15))
          ),
        ),
      ),
    );
  }
}
