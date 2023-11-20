String guardEndSlash(String route, [bool force = true]) {
  bool hasEndSlash = route.endsWith('/');
  if (hasEndSlash && !force) {
    route = route.substring(0, route.length - 1);
  } else if (!hasEndSlash && force) {
    route += '/';
  }

  return route;
}

class RouterNode {
  String baseRoute;
  RouterNode? prev;
  RouterNode? next;

  RouterNode(this.baseRoute);

  String get([String? path]) {
    return guardEndSlash(baseRoute) + (path ?? '');
  }
  String post() {
    return get(baseRoute);
  }
  String delete() {
    return get(baseRoute);
  }
  String patch() {
    return get(baseRoute);
  }
  String put() {
    return get(baseRoute);
  }

  @override
  String toString() {
    return baseRoute;
  }
}

class Router {
  RouterNode? head;
  RouterNode? tail;
  int size = 0;
  
  Router();

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
  }
  void pop() {
    if (tail?.prev == null) return;

    RouterNode? prevNode = tail?.prev;
    prevNode?.next = null;
    tail = prevNode;

    size--;
  }

  void travel(void Function(RouterNode?) callback) {
    RouterNode? node = head?.next;
    
    while (node != null) {
      callback(node);
      node = node.next;
    }
  }

  String get() {
    String allRoutes = '';
    
    return travel((router) => {
      allRoutes += router.toString()
    });
  }
  String post() {
    return get(baseRoute);
  }
  String delete() {
    return get(baseRoute);
  }
  String patch() {
    return get(baseRoute);
  }
  String put() {
    return get(baseRoute);
  }
}
