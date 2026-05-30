import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { getOrders } from "../data/orderStorage";
import { getUser } from "../data/storage";

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const userData = await getUser();
    const orderData = await getOrders();

    setUser(userData);
    setOrders(orderData.reverse());
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>👤 My Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>{user?.name || "No Name Found"}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email || "No Email Found"}</Text>

        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.value}>
          {user?.phone || "No Phone Number Found"}
        </Text>

        <Text style={styles.label}>Delivery Address</Text>
        <Text style={styles.value}>{user?.address || "No Address Found"}</Text>
      </View>

      <Text style={styles.sectionTitle}>📦 Order History</Text>

      {orders.length === 0 ? (
        <Text style={styles.noOrders}>No Orders Found</Text>
      ) : (
        orders.map((order: any, index: number) => (
          <View key={order.id || index} style={styles.orderCard}>
            <Text style={styles.orderTitle}>Order #{order.id}</Text>

            <Text>💳 Payment Method: {order.paymentMethod || "N/A"}</Text>

            <Text>🆔 Transaction ID: {order.transactionId || "N/A"}</Text>

            <Text>💰 Amount: ₹{order.amount}</Text>

            <Text>📌 Status: {order.status}</Text>

            <Text>📅 Date: {order.date}</Text>

            <Text style={styles.itemsTitle}>Ordered Items</Text>

            {order.items && Array.isArray(order.items) ? (
              order.items.map((item: any, itemIndex: number) => (
                <Text key={itemIndex}>
                  {item.emoji} {item.name} x {item.quantity}
                  {"  "}
                  (₹
                  {item.price * item.quantity})
                </Text>
              ))
            ) : (
              <>
                <Text>🍴 {order.item || "Item"}</Text>

                <Text>Quantity: {order.quantity || 1}</Text>
              </>
            )}
          </View>
        ))
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/edit-profile")}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },

  label: {
    fontWeight: "bold",
    marginTop: 12,
    fontSize: 16,
  },

  value: {
    fontSize: 16,
    color: "#444",
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  noOrders: {
    fontSize: 16,
    color: "gray",
  },

  orderCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },

  orderTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },

  itemsTitle: {
    marginTop: 10,
    fontWeight: "bold",
    marginBottom: 5,
  },

  button: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },

  logoutButton: {
    backgroundColor: "#e53935",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 30,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
