import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getOrders } from "../data/orderStorage";

export default function OrderHistoryScreen() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await getOrders();
    setOrders(data.reverse());
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📦 Order History</Text>

      {orders.length === 0 ? (
        <Text style={styles.empty}>No Orders Found</Text>
      ) : (
        orders.map((order) => (
          <View key={order.id} style={styles.card}>
            <Text style={styles.heading}>🧾 Order #{order.id}</Text>

            <View style={styles.divider} />

            <Text style={styles.section}>🍴 Ordered Items</Text>

            {order.items ? (
              JSON.parse(order.items).map((item: any, index: number) => (
                <Text key={index} style={styles.item}>
                  • {item.name} x {item.quantity} (₹
                  {item.price * item.quantity})
                </Text>
              ))
            ) : (
              <Text>No Items Found</Text>
            )}

            <View style={styles.divider} />

            <Text style={styles.section}>💳 Payment Details</Text>

            <Text>Payment Method: {order.paymentMethod}</Text>

            <Text>Transaction ID: {order.transactionId}</Text>

            <Text>Amount Paid: ₹{order.amount}</Text>

            <Text>Payment Status: {order.status}</Text>

            <View style={styles.divider} />

            <Text>📅 Ordered On: {order.date}</Text>
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

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
  },

  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },

  section: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  item: {
    marginBottom: 5,
  },

  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
});
