import 'package:flutter/material.dart';
import './orden.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Column(children: [
          Center(
            child: Text(
              "Bienvenido a CyberPizza",
              style: TextStyle(color: Colors.blue.shade800, fontSize: 34, fontWeight: FontWeight.w500 )
            )
          ),
          const Orden()
        ])
      ),
    );
  }
}
