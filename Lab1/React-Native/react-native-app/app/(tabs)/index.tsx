import React from "react";
import { Image, StyleSheet, View, TextInput, Button, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Example 1: React Native</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/wheel.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <Button title="BUTTON" onPress={() => {}} color="#d6d7d7" />
          <Button title="BUTTON" onPress={() => {}} color="#d6d7d7" />
        </View>
        <View style={styles.buttonRow}>
          <Button title="BUTTON" onPress={() => {}} color="#d6d7d7" />
          <Button title="BUTTON" onPress={() => {}} color="#d6d7d7" />
        </View>
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    backgroundColor: "#2f8577",
    paddingVertical: 45,
    paddingLeft: 24,
    paddingBottom: 10,
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffff",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
    width: "65%",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 16,
  },
  input: {
    width: "60%",
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: "#e91e63",
    marginLeft: 60,
  },
  inputLabel: {
    fontSize: 15,
    color: "#7f7f7e",
  },
});
