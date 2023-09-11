import 'package:flutter/material.dart';
import './mi_billetera.dart';

void main() {
  runApp(const MyApp());
}

// class MiBilletera extends StatelessWidget {
//   const MiBilletera({super.key});

//   Container createCard({
//     Widget header = const Text(""),
//     Widget body = const Text(""),
//     Widget footer = const Text(""),
//     double? width,
//     double? height,
//     Decoration? decoration,
//     EdgeInsets? padding,
//     MainAxisAlignment mainAxisAlignment = MainAxisAlignment.center,
//     CrossAxisAlignment crossAxisAlignment = CrossAxisAlignment.start
//   }) {
//     return Container(
//       padding: padding,
//       decoration: decoration,
//       width: width,
//       height: height,
//       child: Column(
//         crossAxisAlignment: crossAxisAlignment,
//         mainAxisAlignment: mainAxisAlignment,
//         children: [header, body, footer]
//       ),
//     );
//   }

//   Container cardBilletera(BuildContext context) {
//     return createCard(
//       header: const Center(
//         child: Text(
//           "Mi Billetera",
//           style: TextStyle(
//             color: Colors.white,
//             fontSize: 40,
//             fontWeight: FontWeight.bold
//           )
//         )
//       ),
//       footer: const Padding(
//         padding: EdgeInsets.symmetric(vertical: 5),
//         child: Text(
//           "Total\n\$ 7000",
//           style: TextStyle(
//             color: Colors.white, fontSize: 26,
//             height: 1.4
//           )
//         ),
//       ),
//       width: MediaQuery.of(context).size.width - 10,
//       decoration: const BoxDecoration(
//         color: Color.fromRGBO(53, 37, 124, 1),
//         borderRadius: BorderRadius.all(Radius.circular(20))
//       ),
//       padding: const EdgeInsets.all(30)
//     );
//   }

//   Container cardCredict(BuildContext context) {
//     return createCard(
//       header: const Text(
//         "Viso\nCard Credit",
//         style: TextStyle(
//           color: Colors.white, fontSize: 28,
//           fontWeight: FontWeight.bold
//         )
//       ),
//       body: const Padding(
//         padding: EdgeInsets.symmetric(vertical: 10),
//         child: Text(
//           "**** **** **** 4878",
//           style: TextStyle(
//             color: Colors.white, fontSize: 24
//           )
//         ),
//       ),
//       footer: const Text(
//         "Jose Rodelo",
//         style: TextStyle(
//           color: Colors.white, fontSize: 24
//         )
//       ),
//       width: MediaQuery.of(context).size.width - 110,
//       decoration: const BoxDecoration(
//         color: Color.fromRGBO(193, 135, 159, 1),
//         borderRadius: BorderRadius.all(Radius.circular(20))
//       ),
//       padding: const EdgeInsets.all(30)
//     );
//   }

//   Container createRecentMoveBox({
//     List<Widget> children = const <Widget>[],
//     double? width,
//     double? height,
//     EdgeInsetsGeometry? padding,
//     EdgeInsetsGeometry? margin, 
//     Decoration? decoration,
//     MainAxisAlignment mainAxisAlignment = MainAxisAlignment.center,
//     CrossAxisAlignment crossAxisAlignment = CrossAxisAlignment.center
//   }) {
//     return Container(
//       padding: padding,
//       width: width,
//       height: height,
//       margin: margin,
//       decoration: decoration,
//       child: Row(
//         mainAxisAlignment: mainAxisAlignment,
//         crossAxisAlignment: crossAxisAlignment,
//         children: children,
//       ),
//     );
//   }

//   Container recentMoveBox({
//     Widget description = const Text(""),
//     Widget price = const Text("\$"),
//   }) {
//     return createRecentMoveBox(
//       children: [description, price],
//       height: 30,
//       width: 30,
//       decoration: const BoxDecoration(
//         color: Color.fromRGBO(215, 172, 183, 1),
//       )
//     );
//   }

//   Container recentMoves(BuildContext context) {
//     return Container(
//       color: Colors.red,
//       width: MediaQuery.of(context).size.width - 50,
//       height: 230,
//       child: ListView(
//         children: [
//           recentMoveBox(
//             description: const Text("Bazar donde Sonya"),
//             price: const Text("\$ 10")
//           ),
//           recentMoveBox(
//             description: const Text("Pizzeria"),
//             price: const Text("\$ 33")
//           )
//         ],
//       ),
//     );
//   }

//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       home: Scaffold(
//         body: Stack(
//           alignment: Alignment.topCenter,
//           children: [
//             Positioned(
//               top: 0,
//               child: Center(child: cardBilletera(context))
//             ),
//             Positioned(
//               top: 175,
//               child: cardCredict(context)
//             ),
//             Positioned(
//               top: 400,
//               child: recentMoves(context)
//             )
//           ],
//         ),
//       )
//     );
//   }
// }

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
      body: Column(
        children: [
          SizedBox(height: MediaQuery.paddingOf(context).top),
          const MiBilletera()
        ]
      ))
    );
  }
}

// Bazar donde Sonya
// Pizzeria