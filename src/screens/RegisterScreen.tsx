import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { saveUser } from "../data/storage";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password || !phone || !address) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    await saveUser(name, email, password, phone, address);

    Alert.alert("Success", "Registration completed successfully");

    router.push("/");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/login-bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>🍔 Register</Text>

            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#f7f0f0"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />

            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="#fefafa"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              placeholder="Password"
              secureTextEntry
              placeholderTextColor="#f5eeee"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />

            <TextInput
              placeholder="Phone Number"
              keyboardType="phone-pad"
              placeholderTextColor="#fbf5f5"
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
            />

            <TextInput
              placeholder="Delivery Address"
              multiline
              numberOfLines={3}
              placeholderTextColor="#ebe4e4"
              style={[styles.input, styles.addressInput]}
              value={address}
              onChangeText={setAddress}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/")}>
              <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: 400,
    alignSelf: "center",

    backgroundColor: "rgba(255, 255, 255, 0)",
    backdropFilter: "blur(10px)",

    borderRadius: 15,
    padding: 25,

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0)",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#ff6600",
    textAlign: "center",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderWidth: 1,
    borderColor: "#dddddd00",
    padding: 14,
    marginBottom: 15,
    borderRadius: 10,
    color: "white",
  },

  addressInput: {
    height: 80,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 8,
    marginTop: 5,
  },

  buttonText: {
    color: "#ffffffea",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: {
    textAlign: "center",
    marginTop: 15,
    color: "#096acad7",
    fontWeight: "bold",
  },
});
