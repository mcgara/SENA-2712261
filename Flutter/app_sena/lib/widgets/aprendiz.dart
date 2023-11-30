import 'package:flutter/material.dart';
import '../service/aprendiz.dart' show ApiAprendiz;

class AprendizLoading extends StatelessWidget {
  final String? message;
  const AprendizLoading({ super.key, this.message });

  @override
  Widget build(BuildContext context) {
    return Text(
      message ?? 'Loading aprendiz...',
      style: const TextStyle(
        color: Colors.orange,
        fontSize: 20
      )
    );
  }
}

class AprendizError extends StatelessWidget {
  final Object? error;
  const AprendizError({ super.key, this.error });

  @override
  Widget build(BuildContext context) {
    return Text(
      'Error aprendiz:\n$error',
      style: const TextStyle(
        color: Colors.red,
        fontSize: 20
      )
    );
  }
}

class AprendizEmpty extends StatelessWidget {
  final String? message;
  const AprendizEmpty({ super.key, this.message });

  @override
  Widget build(BuildContext context) {
    return Text(
      message ?? 'No hay Aprendices!',
      style: const TextStyle(
        color: Colors.blue,
        fontSize: 20
      )
    );
  }
}

String getAprendizData(ApiAprendiz aprendiz) => '''
  ID: ${aprendiz.id.toString()}
  Nombres: ${aprendiz.nombres}
  Apellidos: ${aprendiz.apellidos}
  Correo: ${aprendiz.correo}
  Genero: ${aprendiz.genero}
  ID Programa: ${aprendiz.idPrograma}
''';

class AprendizData extends StatelessWidget {
  final ApiAprendiz aprendiz;
  const AprendizData({ super.key, required this.aprendiz });

  @override
  Widget build(BuildContext context) {
    return Text(getAprendizData(aprendiz), style: const TextStyle(
      color: Colors.black87,
      fontSize: 20
    ));
  }
}

class Aprendiz extends StatefulWidget {
  const Aprendiz({super.key});

  @override
  AprendizState createState() => AprendizState();
}

class AprendizState extends State<Aprendiz> {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: ApiAprendiz.get(),
      builder: (BuildContext context, AsyncSnapshot<List<ApiAprendiz>> snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const AprendizLoading(message: 'Cargando aprendices...');
        } else if (snapshot.hasError) {
          return AprendizError(error: snapshot.error);
        } else if (snapshot.data?.isEmpty == true || snapshot.data == null) {
          return const AprendizEmpty(message: 'No se ha encontrado ningun aprendiz');
        } else {
          var listAprendiz = snapshot.data as List<ApiAprendiz>;
          List<Widget> children = [];
          
          for (var aprendiz in listAprendiz) {
            children.add(AprendizData(aprendiz: aprendiz));
          }

          return ListView(children: children);
        }
      },
    );
  }
}

class FormAprendiz extends StatefulWidget {
  final TextEditingController nombre = TextEditingController();
  final TextEditingController ficha = TextEditingController();
  final TextEditingController nombres = TextEditingController();
  final TextEditingController apellidos = TextEditingController();
  final TextEditingController correo = TextEditingController();
  final TextEditingController genero = TextEditingController();
  final TextEditingController idPrograma = TextEditingController();

  FormAprendiz({super.key});

  @override
  FormAprendizState createState() => FormAprendizState();
}

class FormAprendizState extends State<FormAprendiz> {
  void notification(String message) {
    TextButton btnAceptar = TextButton(
      child: const Text('Aceptar'),
      onPressed: () => Navigator.pop(context)
    );

    AlertDialog alert = AlertDialog(
      title: const Text('Notification'),
      content: Text(message),
      actions: [btnAceptar],
    );

    showDialog(
      context: context,
      builder: (BuildContext context) => alert
    );
  }
  
  void onCreateProgram(Map<String, dynamic> response) {
    notification(response['message'].toString());
  }
  
  void submitCreateProgram() {
    setState(() {
      (() async {
        int? idPrograma = int.tryParse(widget.idPrograma.text); 
        if (idPrograma == null) {
          notification('error el campo id programa debe ser un numero');
          return;
        }

        final response = await ApiAprendiz.create(
          nombres: widget.nombres.text,
          apellidos: widget.apellidos.text,
          correo: widget.correo.text,
          genero: widget.genero.text,
          idPrograma: idPrograma,
        );
        onCreateProgram(response);
      })();
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        TextField(
          controller: widget.nombres,
          decoration: const InputDecoration(hintText: 'Digite los Nombres del Aprendiz')
        ),
        TextField(
          controller: widget.apellidos,
          decoration: const InputDecoration(hintText: 'Digite los Apellidos del Aprendiz'),
        ),
        TextField(
          controller: widget.correo,
          decoration: const InputDecoration(hintText: 'Digite el Correo del Aprendiz')
        ),
        TextField(
          controller: widget.genero,
          decoration: const InputDecoration(hintText: 'Digite el Genero del Aprendiz'),
        ),
        TextField(
          controller: widget.idPrograma,
          decoration: const InputDecoration(hintText: 'Digite el ID del Programa del Aprendiz'),
          keyboardType: TextInputType.number
        ),
        ElevatedButton(onPressed: submitCreateProgram, child: const Text('Aceptar'))
      ],
    );
  }
}
