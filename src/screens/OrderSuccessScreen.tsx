import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OrderSuccessScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.successIcon}>🎉</Text>

      <Text style={styles.title}>Order Placed Successfully</Text>

      <Text style={styles.subtitle}>
        Your order has been confirmed and sent to the restaurant.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/tracking")}
      >
        <Text style={styles.buttonText}>Track Order 🚚</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.homeButtonText}>Back To Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  successIcon: {
    fontSize: 80,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginBottom: 15,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  homeButton: {
    borderWidth: 1,
    borderColor: "#ff6600",
    padding: 15,
    borderRadius: 10,
    width: "100%",
  },

  homeButtonText: {
    color: "#ff6600",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
