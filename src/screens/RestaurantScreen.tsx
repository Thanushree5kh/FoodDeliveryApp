import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RestaurantScreen() {
  const { name, rating } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>

      <Text style={styles.info}>⭐ {rating} Rating</Text>

      <Text style={styles.info}>🕒 Open Today: 9 AM - 11 PM</Text>

      <Text style={styles.info}>🍽️ Pure Veg & Non-Veg Available</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/menu")}
      >
        <Text style={styles.buttonText}>View Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
  },

  info: {
    fontSize: 18,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#ff6600",
    padding: 15,
    marginTop: 25,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
