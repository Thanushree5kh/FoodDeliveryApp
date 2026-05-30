import { router, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RestaurantScreen() {
  const { name, rating } = useLocalSearchParams();

  let restaurantImage = require("../../assets/images/snack-cafe.jpg");

  if (name === "Evening Cafe") {
    restaurantImage = require("../../assets/images/evening-cafe.jpg");
  } else if (name === "Shimoga House") {
    restaurantImage = require("../../assets/images/shimoga-house.jpg");
  }

  return (
    <View style={styles.container}>
      <View style={styles.restaurantHeroCard}>
        <View style={styles.leftSection}>
          <Text style={styles.restaurantTitle}>{name}</Text>

          <Text style={styles.infoText}>⭐ {rating} Rating</Text>

          <Text style={styles.infoText}>🕒 Open Today: 9 AM - 11 PM</Text>

          <Text style={styles.infoText}>🍽️ Pure Veg & Non-Veg Available</Text>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => router.push("/menu")}
          >
            <Text style={styles.menuButtonText}>View Menu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rightSection}>
          <Image source={restaurantImage} style={styles.heroRestaurantImage} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#ff6600",
    padding: 20,
  },

  restaurantHeroCard: {
    width: "75%",
    maxWidth: 900,

    backgroundColor: "#ffffff",
    borderRadius: 25,
    overflow: "hidden",
    borderColor: "#ff6600",
    borderWidth: 5,
    flexDirection: "row",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },

  leftSection: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
  },

  rightSection: {
    width: 280,
    overflow: "hidden",
    borderTopLeftRadius: 180,
    borderBottomLeftRadius: 50,
  },

  heroRestaurantImage: {
    width: "100%",
    height: 320,
    resizeMode: "cover",
  },

  restaurantTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 20,
  },

  infoText: {
    fontSize: 18,
    color: "#444",
    marginBottom: 12,
  },

  menuButton: {
    backgroundColor: "#ff6600",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 20,
    width: 180,
    alignItems: "center",
  },

  menuButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
