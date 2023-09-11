import 'package:flutter/material.dart';
import 'venezuela_food.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Column(
        children: [
          SizedBox(height: MediaQuery.paddingOf(context).top),
          const VenezuelaFood()
        ])
      )
    );
  }
}
