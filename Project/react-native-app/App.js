import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { React, useState } from "react";
import Carousel from "./components/Carousel";
import Password from "./components/Password";

export default function App() {
  //example data for carousel
  const data = [
    { uri: "https://via.placeholder.com/300/FF6347" },
    { uri: "https://via.placeholder.com/300/4682B4" },
    { uri: "https://via.placeholder.com/300/FFD700" },
    { uri: "https://via.placeholder.com/300/32CD32" },
    { uri: "https://via.placeholder.com/300/FF4500" },
    { uri: "https://via.placeholder.com/300/8A2BE2" },
    //{ uri: "https://via.placeholder.com/300/D2691E" },
    //{ uri: "https://via.placeholder.com/300/DC143C" },
    //{ uri: "https://via.placeholder.com/300/4B0082" },
    //{ uri: "https://via.placeholder.com/300/9932CC" },
  ];
  // password criterias
  const [password, setPassword] = useState("");

  const passwordSettings = {
    criteria: {
      minLength: 8,
      weakLength: 10,
      fairLength: 12,
      goodLength: 14,
      hasLowerCase: /[a-z]/,
      hasUpperCase: /[A-Z]/,
      hasNumber: /\d/,
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
    },
    colors: {
      tooShort: "#8C8C8C",
      weak: "#8C0000",
      fair: "#E9C930",
      good: "#5C9DC9",
      strong: "#21772E",
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our SDK App</Text>
      <Text style={styles.label}>Carousel component</Text>
      <Carousel images={data} numVisible={1} />
      <Text style={styles.label}>Password component</Text>
      <Password
        passwordSettings={passwordSettings}
        onPasswordChange={setPassword}
        password={password}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
