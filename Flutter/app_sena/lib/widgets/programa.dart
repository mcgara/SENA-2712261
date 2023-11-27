import 'package:flutter/material.dart';
import '../service/programa.dart' show ApiPrograma;

class ProgramaLoading extends StatelessWidget {
  final String? message;
  const ProgramaLoading({ super.key, this.message });

  @override
  Widget build(BuildContext context) {
    return Text(
      message ?? 'Loading programa...',
      style: const TextStyle(
        color: Colors.orange,
        fontSize: 20
      )
    );
  }
}

class ProgramaError extends StatelessWidget {
  final Object? error;
  const ProgramaError({ super.key, this.error });

  @override
  Widget build(BuildContext context) {
    return Text(
      'Error programa:\n$error',
      style: const TextStyle(
        color: Colors.red,
        fontSize: 20
      )
    );
  }
}

class ProgramaEmpty extends StatelessWidget {
  final String? message;
  const ProgramaEmpty({ super.key, this.message });

  @override
  Widget build(BuildContext context) {
    return Text(
      message ?? 'Empty programa!',
      style: const TextStyle(
        color: Colors.blue,
        fontSize: 20
      )
    );
  }
}

String getProgramaData(ApiPrograma programa) => '''
  ID: ${programa.id.toString()}
  Nombre: ${programa.nombre}
  Ficha: ${programa.ficha}
''';

class ProgramaData extends StatelessWidget {
  final ApiPrograma programa;
  const ProgramaData({ super.key, required this.programa });

  @override
  Widget build(BuildContext context) {
    return Text(getProgramaData(programa), style: const TextStyle(
      color: Colors.black87,
      fontSize: 20
    ));
  }
}

class Programa extends StatefulWidget {
  const Programa({super.key});

  @override
  ProgramaState createState() => ProgramaState();
}

class ProgramaState extends State<Programa> {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: ApiPrograma.get(),
      builder: (BuildContext context, AsyncSnapshot<List<ApiPrograma>> snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const ProgramaLoading(message: 'Cargando programas...');
        } else if (snapshot.hasError) {
          return ProgramaError(error: snapshot.error);
        } else if (snapshot.data?.isEmpty == true || snapshot.data == null) {
          return const ProgramaEmpty(message: 'No se ha encontrado ningun programa');
        } else {
          var listPrograma = snapshot.data as List<ApiPrograma>;
          List<Widget> children = [];
          
          for (var programa in listPrograma) {
            children.add(ProgramaData(programa: programa));
          }

          return ListView(children: children);
        }
      },
    );
  }
}
