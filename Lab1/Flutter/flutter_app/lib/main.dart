import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Lab 1',
      theme: ThemeData(
        appBarTheme: const AppBarTheme(
          titleTextStyle: TextStyle(
            color: Colors.white,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
          //backgroundColor: Colors.deepPurple, // Set the AppBar background color
        ),
      ),
      home: const MyHomePage(title: 'Example 1: Flutter'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
          // backgroundColor: Theme.of(context).colorScheme.inversePrimary,
          title: Text(widget.title),
          backgroundColor: const Color(0xFF418577) // Colors.green,

          ),
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        padding: const EdgeInsets.only(top: 10.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Image.asset(
              'assets/images/wheel.png',
              height: 150,
              fit: BoxFit.cover,
            ),
            const SizedBox(height: 40),
            _buildButtonRow(),
            const SizedBox(height: 30),
            _buildButtonRow(),
            const SizedBox(height: 20),
            _buildTextField(),
          ],
        ),
      ),
    );
  }
}

final ButtonStyle myButtonStyle = ElevatedButton.styleFrom(
  foregroundColor: Colors.black87,
  backgroundColor: Colors.grey[300],
  minimumSize: const Size(88, 36),
  padding: const EdgeInsets.symmetric(horizontal: 16),
  shape: const RoundedRectangleBorder(
    borderRadius: BorderRadius.all(Radius.circular(2)),
  ),
);

Widget _buildButtonRow() {
  return Row(
    mainAxisAlignment: MainAxisAlignment.center,
    children: [
      ElevatedButton(
          onPressed: () {}, style: myButtonStyle, child: const Text("BUTTON")),
      const SizedBox(width: 100),
      ElevatedButton(
          onPressed: () {}, style: myButtonStyle, child: const Text("BUTTON")),
    ],
  );
}

Widget _buildTextField() {
  return Padding(
    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
    child: Row(
      children: [
        const Text(
          'Email',
          style: TextStyle(fontSize: 12, color: Colors.black),
        ),
        const SizedBox(
          width: 70,
        ),
        SizedBox(
          width: 200,
          child: TextFormField(
            cursorColor: const Color.fromARGB(255, 203, 10, 75),
            cursorHeight: 16,
            decoration: const InputDecoration(
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(
                    color: Color.fromARGB(255, 203, 10, 75),
                    width: 1.8,
                  ),
                ),
                focusedBorder: UnderlineInputBorder(
                    borderSide: BorderSide(
                  color: Color.fromARGB(255, 203, 10, 75),
                  width: 1.8,
                ))),
          ),
        ),
      ],
    ),
  );
}
