import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { getOrders } from "../data/orderStorage";

export default function HomeScreen() {
  const [orders, setOrders] = useState<any[]>([]);

  const restaurants = [
    {
      id: 1,
      name: "Snack Cafe",
      rating: 4.5,
      image: require("../../assets/images/snack-cafe.jpg"),
    },
    {
      id: 2,
      name: "Evening Cafe",
      rating: 4.2,
      image: require("../../assets/images/evening-cafe.jpg"),
    },
    {
      id: 3,
      name: "Shimoga House",
      rating: 4.6,
      image: require("../../assets/images/shimoga-house.jpg"),
    },
  ];

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🍔 Food Delivery App</Text>

        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Text style={styles.profile}>👤</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Search restaurants or food..."
        style={styles.search}
      />

      <Text style={styles.sectionTitle}>Popular Restaurants</Text>

      {restaurants.map((restaurant) => (
        <TouchableOpacity
          key={restaurant.id}
          style={styles.restaurantCard}
          onPress={() =>
            router.push({
              pathname: "/restaurant",
              params: {
                name: restaurant.name,
                rating: String(restaurant.rating),
              },
            })
          }
        >
          <Image source={restaurant.image} style={styles.restaurantImage} />

          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>

            <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Recent Orders</Text>

      {orders.length === 0 ? (
        <Text>No Orders Yet</Text>
      ) : (
        orders
          .slice()
          .reverse()
          .map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <Text style={{ fontWeight: "bold" }}>{order.restaurant}</Text>

              <Text>₹{order.amount}</Text>
            </View>
          ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },

  logo: {
    fontSize: 24,
    fontWeight: "bold",
  },

  profile: {
    fontSize: 30,
  },

  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 15,
  },

  restaurantCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 15,
    backgroundColor: "#fff",
  },

  restaurantImage: {
    width: "100%",
    height: 320,
  },

  restaurantInfo: {
    padding: 12,
  },

  restaurantName: {
    fontSize: 20,
    fontWeight: "bold",
  },

  rating: {
    marginTop: 5,
    color: "#666",
    fontSize: 16,
  },

  orderCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
});
