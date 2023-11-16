import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiEnv {
  static get host {
    String host = dotenv.env['API_HOST'] ?? 'localhost';
    return host;
  }
  static get port {
    int port = 8051;
    try {
      port = int.parse(dotenv.env['API_PORT'] ?? '8051');
    } catch (err) {
      // Handle error
    }
    return port;
  }
  static get url {
    Uri url;
    try {
      String blankUrl = ':: blank URL ::';
      url = Uri.parse(dotenv.env['API_URL'] ?? blankUrl);
    } catch (err) {
      url = Uri.parse('https://example.com');
    }
    url.replace(host: host, port: port);
    return url;
  }
}


