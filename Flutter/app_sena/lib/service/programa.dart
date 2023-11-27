import './api.dart' show ApiRoutes;
import 'package:http/http.dart' as http;
import 'dart:convert' show json;

typedef ApiProgramaId = int;

class ApiPrograma {
  static final router = ApiRoutes.programa;
  
  ApiProgramaId id;
  String nombre;
  int ficha;

  ApiPrograma({
    required this.id,
    required this.nombre,
    required this.ficha,
  });

  static Future<List<ApiPrograma>> get({
    int? id,
    String? nombre,
    int? ficha,
  }) async {
    var url = router.toUri();
    var query = {
      'id': id?.toString(),
      'nombre': nombre,
      'ficha': ficha?.toString()
    };
    query.removeWhere((key, value) => value == null);

    if (url == null) return [];
    url = url.replace(queryParameters: query);

    var response = await http.get(url);
    var status = response.statusCode;
    if (!(status >= 200 && status < 300)) return [];
    
    List<dynamic> list = json.decode(response.body);
    List<ApiPrograma> listPrograma = List.from(
      list.map((programa) => ApiPrograma(
        id: programa['id'],
        nombre: programa['nombre'],
        ficha: programa['ficha']
      ))
    );
    
    return listPrograma;
  }

  static Future<ApiPrograma?> getById(ApiProgramaId id) async {
    var list = await get(id: id);
    if (list.isEmpty) return null;
    return list.first;
  }
  static Future<ApiPrograma?> getByFicha(int ficha) async {
    var list = await get(ficha: ficha);
    if (list.isEmpty) return null;
    return list.first;
  }
}
