import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'api/api.dart' show ApiEnv, ApiRoutes;

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
          title: const Text('Hello Api')
        ),
        body: const MyApi(),
      ),
    );
  }
}

class MyApi extends StatelessWidget {
  const MyApi({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Text(ApiEnv.url.toString()),
      Text(ApiRoutes.aprendiz.getAll())
    ]);
  }
}
