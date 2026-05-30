import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { getUser } from "../data/storage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const user = await getUser();

    if (!user) {
      Alert.alert("No Account Found", "Please register before logging in.");
      return;
    }

    if (email.trim() === user.email && password.trim() === user.password) {
      router.push("/home");
    } else {
      Alert.alert("Error", "Invalid Email or Password");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/login-bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>🍔 Food Delivery App</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#fbf7f7ed"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#fdfbfbef"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.link}>Don't have an account? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(247, 247, 247, 0.04)",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    width: 400,
    alignSelf: "center",

    backgroundColor: "rgba(255, 255, 255, 0)",
    backdropFilter: "blur(10px)",

    borderRadius: 15,
    padding: 25,

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.01)",

    shadowColor: "#fbf4f40f",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#ff6600",
  },

  input: {
    backgroundColor: "#ffffff13",
    borderWidth: 1,
    borderColor: "#dddddd08",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    color: "white",
  },

  button: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 8,
  },

  buttonText: {
    color: "#ffffffe9",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: {
    textAlign: "center",
    marginTop: 15,
    color: "#0066cc",
    fontWeight: "bold",
  },
});
