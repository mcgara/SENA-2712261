import 'package:flutter/material.dart';

const String descriptionFood = '''
Ipsum laboris sint nulla ipsum dolor laborum dolore.
Nostrud consequat incididunt et.
''';

final assetsImageFood = <String>[
  'burger.png',
  'ensalada.png',
  'fastfood.png',
  'hotdog.png',
  'jugo.png',
  'papas.png',
  'pizza.png',
  'torta.png'
];

class VenezuelaFood extends StatelessWidget {
  const VenezuelaFood({super.key});

  Container background(MediaQueryData context) {
    return Container(
      height: context.size.height - 250,
      color: const Color(0xFF92C47D),
      child: Image.asset('assets/images/fondo.png', scale: 1.7)
    );
  }

  Container profile() {
    return Container(
      width: 90,
      height: 90,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.white, width: 3),
        borderRadius: BorderRadius.circular(10),
        image: const DecorationImage(
          image: AssetImage('assets/images/avatar.png'), scale: 6
        )
      )
    );
  }

  Text label() {
    return const Text(
      '¿Tienes hambre?',
      style: TextStyle(fontSize: 27, fontWeight: FontWeight.w500)
    );
  }

  Positioned header(MediaQueryData context) {
    return Positioned(
      top: 45,
      width: context.size.width,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [profile(), const SizedBox(width: 20), label()],
      ),
    );
  }

  Container cardFood({ String? img, String? description }) {
    String image = 'assets/images/${img ?? 'burger.png'}';
    
    return Container(
      width: 160,
      height: 260,
      padding: const EdgeInsets.all(10),
      margin: const EdgeInsets.symmetric(horizontal: 10),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: Colors.black, width: 3),
        borderRadius: BorderRadius.circular(8)
      ),
      child: Column(
        children: [
          Image.asset(image, scale: 4),
          const SizedBox(height: 12),
          Text(description ?? descriptionFood)
        ]
      )
    );
  }

  Positioned listCardFood(MediaQueryData context) {
    List<Container> listCards = [];
    assetsImageFood.shuffle();
    for (var image in assetsImageFood) { listCards.add(cardFood(img: image)); }

    return Positioned(
      width: context.size.width,
      height: 260,
      top: context.size.height - 370,
      child: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 1.5),
        scrollDirection: Axis.horizontal,
        children: listCards,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    MediaQueryData dataContext = MediaQuery.of(context);

    return Stack(
      children: [
        SizedBox(height: dataContext.size.height - dataContext.viewPadding.top),
        background(dataContext),
        header(dataContext),
        listCardFood(dataContext),
      ],
    );
  }
}
