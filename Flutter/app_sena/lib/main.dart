import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:async';
import './widgets/aprendiz.dart' show Aprendiz;
import './widgets/programa.dart' show Programa;

Future<void> main() async {
  await dotenv.load();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: const Text(
            'API de aprendices y programas',
            style: TextStyle(fontWeight: FontWeight.w600, fontSize: 27),
            textAlign: TextAlign.center,
          )
        ),
        body: const MyApi(),
      ),
    );
  }
}

class MyApi extends StatefulWidget {
  const MyApi({super.key});

  @override
  MyApiState createState() => MyApiState();
}

class MyApiState extends State<MyApi> {
  bool toggleButton = false;

  void setToggleButton() {
    setState(() {
      toggleButton = !toggleButton;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              toggleButton ? 'Aprendices' : 'Programas',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w500,
                color: Colors.grey.shade800
              ),
            ),
            IconButton(
              onPressed: setToggleButton,
              icon: const Icon(Icons.circle_rounded),
              iconSize: 55,
              alignment: Alignment.center,
              color: toggleButton ? Colors.tealAccent : Colors.amber.shade900
            )
          ],
        ),
        Expanded(child: toggleButton ? const Aprendiz() : const Programa())
      ],
    );
  }
}
