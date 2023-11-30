import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:async';
import './widgets/aprendiz.dart' show Aprendiz, FormAprendiz;
import './widgets/programa.dart' show Programa, FormPrograma;

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

enum ApiRoutes { aprendices, programas }
enum ApiMode { buscar, crear }

class MyApiState extends State<MyApi> {
  ApiRoutes apiRoute = ApiRoutes.aprendices;
  ApiMode mode = ApiMode.buscar;

  Map<ApiRoutes, ({
    Widget Function() buscar,
    Widget Function() crear
  })> widgetsOfApi = {
    ApiRoutes.aprendices: (
      buscar: () => const Aprendiz(),
      crear: () => FormAprendiz()
    ),
    ApiRoutes.programas: (
      buscar: () => const Programa(),
      crear: () => FormPrograma()
    )
  };

  void onPressToggleApiRoute() {
    setState(() {
      switch (apiRoute) {
        case ApiRoutes.aprendices: apiRoute = ApiRoutes.programas;
        case ApiRoutes.programas: apiRoute = ApiRoutes.aprendices;
      }
    });
  }

  void onPressToggleMode() {
    setState(() {
      switch (mode) {
        case ApiMode.buscar: mode = ApiMode.crear;
        case ApiMode.crear: mode = ApiMode.buscar;
      }
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
              'API: ${apiRoute.name.toUpperCase()}',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w500,
                color: Colors.grey.shade800
              ),
            ),
            IconButton(
              onPressed: onPressToggleApiRoute,
              icon: const Icon(Icons.circle_rounded),
              iconSize: 55,
              alignment: Alignment.center,
              color: Colors.tealAccent
            ),
            Text(
              'MODO: ${mode.name.toUpperCase()}',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w500,
                color: Colors.grey.shade800
              ),
            ),
            IconButton(
              onPressed: onPressToggleMode,
              icon: const Icon(Icons.circle_rounded),
              iconSize: 55,
              alignment: Alignment.center,
              color: Colors.green
            )
          ],
        ),
        mode == ApiMode.crear
        ? widgetsOfApi[apiRoute]!.crear()
        : Expanded(child: widgetsOfApi[apiRoute]!.buscar())
      ],
    );
  }
}
