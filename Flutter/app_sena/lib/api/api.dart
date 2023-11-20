import 'package:flutter_dotenv/flutter_dotenv.dart';
import './router.dart' show Router;

class DefaultApi {
  static const host = 'localhost';
  static const port = '8041';
  static const url = 'http://$host:$port';
  static const https = false;
} 

class ApiEnv {
  static String get host {
    return dotenv.env['API_HOST'] ?? DefaultApi.host;
  }

  static int get port {
    int port = int.parse(DefaultApi.port);
    try {
      port = int.parse(dotenv.env['API_PORT'] ?? '::not port::');
    } catch (err) {
      // Handle error
    }
    return port;
  }

  static bool get https {
    return dotenv.env['API_HTTPS']?.toLowerCase() == 'true';
  }

  static Uri get url {
    Uri url = Uri.parse(DefaultApi.url);

    try {
      url = Uri.parse(dotenv.env['API_URL'] ?? '::not url::');
    } catch (err) {
      url = Uri.parse('${https ? 'https' : 'http'}://$host:$port');
    }
    
    return url;
  }
}

class ApiRoutes {
  static final aprendiz = Router('/aprendiz');
  static final programa = Router('/programa');
}
