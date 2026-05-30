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
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </Text>
        </View>

        <Text style={styles.userName}>{user?.name || "User"}</Text>

        <Text style={styles.userEmail}>
          {user?.email || "email@example.com"}
        </Text>
      </View>

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
    backgroundColor: "#f7f7f7",
    padding: 20,

    borderWidth: 3,
    borderColor: "#ff6600",
    borderRadius: 10,
    margin: 50,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ff6600",
    marginBottom: 20,
  },

  profileHeader: {
    alignItems: "center",
    marginBottom: 25,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#ff6600",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },

  avatarText: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold",
  },

  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 12,
    color: "#222",
  },

  userEmail: {
    color: "#777",
    fontSize: 15,
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",

    borderRadius: 20,
    padding: 20,

    marginBottom: 25,

    borderWidth: 2,
    borderColor: "#ff6600",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#ff6600",
    marginTop: 15,
  },

  value: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ff6600",
    marginBottom: 15,
  },

  noOrders: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
  },

  orderCard: {
    backgroundColor: "#fff",

    borderRadius: 20,
    padding: 18,

    marginBottom: 15,

    borderWidth: 2,
    borderColor: "#ff6600",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6600",
    marginBottom: 10,
  },

  itemsTitle: {
    marginTop: 12,
    fontWeight: "bold",
    color: "#ff6600",
    fontSize: 16,
    marginBottom: 6,
  },

  button: {
    backgroundColor: "#ff6600",
    padding: 16,
    borderRadius: 15,

    marginTop: 15,

    shadowColor: "#ff6600",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  logoutButton: {
    backgroundColor: "#e53935",
    padding: 16,
    borderRadius: 15,

    marginTop: 12,
    marginBottom: 35,

    shadowColor: "#e53935",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
  },
});
