import 'package:flutter/material.dart';

class MiBilletera extends StatelessWidget {
  const MiBilletera({super.key});

  @override
  Widget build(BuildContext context) {
    MediaQueryData dataContext = MediaQuery.of(context);
    
    return const Column(
      children: [
        Text("hello world")
      ]
    );
  }
}
