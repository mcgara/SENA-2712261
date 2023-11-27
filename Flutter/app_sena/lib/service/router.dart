String guardSlash(String route, { bool? end, bool? start }) {
  bool hasStartSlash = route.startsWith('/');
  if (hasStartSlash && start == false) {
    route = route.substring(1);
  } else if (!hasStartSlash && start == true) {
    route = '/$route';
  }

  bool hasEndSlash = route.endsWith('/');
  if (hasEndSlash && end == false) {
    route = route.substring(0, route.length - 1);
  } else if (!hasEndSlash && end == true) {
    route += '/';
  }

  return route;
}

abstract class AbsRouter {
  late String baseRoute;

  AbsRouter(String baseRoute) {
    this.baseRoute = guardSlash(baseRoute);
  }

  String get([String? path]) {
    return baseRoute + (path != null ? guardSlash(path, start: true) : '');
  }
  String post() {
    return baseRoute;
  }
  String delete() {
    return baseRoute;
  }
  String patch() {
    return baseRoute;
  }
  String put() {
    return baseRoute;
  }

  @override
  String toString() {
    return baseRoute;
  }

  Uri? toUri() {
    return Uri.tryParse(toString());
  }
}

class RouterNode extends AbsRouter {
  RouterNode? prev;
  RouterNode? next;

  RouterNode(String baseRoute):super(baseRoute);
}

class Router extends AbsRouter {
  RouterNode? head;
  RouterNode? tail;
  int size = 0;
  
  Router(String baseRoute):super(baseRoute);
  
  Router.fromList(List<String> baseRoutes):super('') {
    addAll(baseRoutes);
  }

  bool isEmpy() {
    return head == null;
  }
  void add(String baseRoute) {
    RouterNode router = RouterNode(baseRoute);

    head ??= router;
    tail ??= router;

    tail?.next = router;
    router.prev = tail;
    tail = tail?.next;

    size++;
    super.baseRoute += router.toString();
  }
  void addAll(List<String> baseRoutes) {
    for (String route in baseRoutes) { add(route); }
  }
  void pop() {
    if (tail?.prev == null) return;
    String value = tail.toString();

    RouterNode? prevNode = tail?.prev;
    prevNode?.next = null;
    tail = prevNode;

    size--;
    super.baseRoute = super.baseRoute.substring(0, super.baseRoute.lastIndexOf(value));
  }
  void travel(void Function(RouterNode?) callback) {
    RouterNode? node = head?.next;
    
    while (node != null) {
      callback(node);
      node = node.next;
    }
  }
}
