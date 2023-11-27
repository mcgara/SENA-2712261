import './api.dart' show ApiRoutes;
import 'package:http/http.dart' as http;
import 'dart:convert' show json;

typedef ApiAprendizId = int;

class ApiAprendiz {
  static final router = ApiRoutes.aprendiz;
  
  ApiAprendizId id;
  String nombres;
  String? apellidos;
  String correo;
  String genero;
  int idPrograma;

  ApiAprendiz({
    required this.id,
    required this.nombres,
    this.apellidos,
    required this.correo,
    required this.genero,
    required this.idPrograma,
  });

  static Future<List<ApiAprendiz>> get({
    ApiAprendizId? id,
    String? nombres,
    String? apellidos,
    String? correo,
    String? genero,
    int? idPrograma,
  }) async {
    var url = router.toUri();
    var query = {
      'id': id?.toString(),
      'nombres': nombres,
      'apellidos': apellidos,
      'correo': correo,
      'genero': genero,
      'id_programa': idPrograma?.toString()
    };
    query.removeWhere((key, value) => value == null);

    if (url == null) return [];
    url = url.replace(queryParameters: query);

    var response = await http.get(url);
    var status = response.statusCode;
    if (!(status >= 200 && status < 300)) return [];
    
    List<dynamic> list = json.decode(response.body);
    List<ApiAprendiz> listAprendiz = List.from(
      list.map((aprendiz) => ApiAprendiz(
        id: aprendiz['id'],
        nombres: aprendiz['nombres'],
        apellidos: aprendiz['apellidos'],
        genero: aprendiz['genero'],
        correo: aprendiz['correo'],
        idPrograma: aprendiz['id_programa']
      ))
    );
    
    return listAprendiz;
  }

  static Future<ApiAprendiz?> getById(int id) async {
    var list = await get(id: id);
    if (list.isEmpty) return null;
    return list.first;
  }
  static Future<List<ApiAprendiz>> getByIdPrograma(int programa) async {
    return await get(idPrograma: programa);
  }
}
