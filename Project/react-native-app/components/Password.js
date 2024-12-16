//Password component
import React, { useState, useEffect } from "react";
import { Animated } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Password({
  passwordSettings,
  onPasswordChange,
  password,
}) {
  // States
  const [barWidth, setBarWidth] = useState("0%");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [animatedWidth] = useState(new Animated.Value(0));
  const [isStrengthBarActive, setStrengthBarActive] = useState(false);

  const strengthEmojis = {
    "Too Short": "❌",
    Weak: "😟",
    Fair: "😐",
    Good: "😊",
    Strong: "💪",
  };

  // Function to calculate password strength
  const calculatePasswordStrength = (password) => {
    if (!passwordSettings) return { text: "Too Short", color: "#787777" };

    const {
      minLength,
      weakLength,
      fairLength,
      goodLength,
      hasLowerCase,
      hasUpperCase,
      hasNumber,
      hasSpecialChar,
    } = passwordSettings.criteria;

    const colors = passwordSettings.colors;

    // Conditions
    const hasLower = hasLowerCase.test(password);
    const hasUpper = hasUpperCase.test(password);
    const hasNum = hasNumber.test(password);
    const hasSpecial = hasSpecialChar.test(password);

    const isShort = password.length < minLength;
    const isWeak = password.length >= minLength && password.length < weakLength;
    const isFair =
      password.length >= weakLength && password.length < fairLength;
    const isGood =
      password.length >= fairLength && password.length < goodLength;
    const isStrong = password.length >= goodLength;

    let strengthText = "";
    let colorCode = "";

    // Strength levels
    if (isShort) {
      strengthText = "Too Short";
      colorCode = colors.tooShort;
    } else if (isWeak && hasLower && hasUpper && hasNum) {
      strengthText = "Weak";
      colorCode = colors.weak;
    } else if (isFair && hasLower && hasUpper && hasNum) {
      strengthText = "Fair";
      colorCode = colors.fair;
    } else if (isGood && hasLower && hasUpper && hasNum && hasSpecial) {
      strengthText = "Good";
      colorCode = colors.good;
    } else if (isStrong && hasLower && hasUpper && hasNum && hasSpecial) {
      strengthText = "Strong";
      colorCode = colors.strong;
    } else {
      strengthText = "Needs more complexity";
      colorCode = colors.tooShort;
    }

    return { text: strengthText, color: colorCode };
  };
  // Update strength bar based on the password input
  useEffect(() => {
    const maxPasswordLength = 20; // Used to cap the bar at 100%
    const strengthInfo = calculatePasswordStrength(password);

    const barWidthPercentage = Math.min(
      (password.length / maxPasswordLength) * 100,
      100
    );

    if (
      strengthInfo.text === "Too Short" ||
      strengthInfo.text === "Needs more complexity"
    ) {
      setBarWidth("0%");
    } else {
      setBarWidth(barWidthPercentage + "%");
    }
  }, [password]);

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: parseFloat(barWidth),
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [barWidth]);

  // Strength info for current password
  const strengthInfo = calculatePasswordStrength(password);

  return (
    <View style={styles.container}>
      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Choose a password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry={true}
          value={password}
          onFocus={() => setStrengthBarActive(true)} // Show strength bar
          onBlur={() => setStrengthBarActive(false)}
          onChangeText={(text) => onPasswordChange(text)}
          maxLength={20}
        />
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => setTooltipVisible(!tooltipVisible)}
        >
          <Icon name="info-outline" size={20} color="blue" />
        </TouchableOpacity>
      </View>

      {/* Tooltip */}
      {tooltipVisible && (
        <View style={styles.tooltip}>
          <Text style={styles.label}>Password Criterias:</Text>
          <Text>* Have more than 8 characters</Text>
          <Text>* Contain both lowercase and uppercase letters</Text>
          <Text>* Contain at least one numerical character</Text>
          {/*<Text>- Contain special characters</Text>*/}
        </View>
      )}

      {/* Strength Bar */}
      {isStrengthBarActive && password.length > 0 && (
        <View style={styles.strengthContainer}>
          <Text style={[styles.strengthText, { color: strengthInfo.color }]}>
            {strengthEmojis[strengthInfo.text]} {strengthInfo.text}
          </Text>
          <View>
            <View style={styles.maxBar} />
            <Animated.View
              style={[
                styles.strengthBar,
                { width: animatedWidth, backgroundColor: strengthInfo.color },
              ]}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginVertical: 20,
    alignSelf: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    padding: 8,
    backgroundColor: "white",
  },
  questionMark: {
    marginLeft: 5,
    fontSize: 16,
    color: "blue",
  },
  tooltip: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  strengthContainer: {
    marginTop: 10,
  },
  strengthText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  maxBar: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginTop: 5,
  },
  strengthBar: {
    height: 10,
    borderRadius: 5,
    position: "absolute",
  },
});
