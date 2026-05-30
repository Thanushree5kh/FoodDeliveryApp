import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function CartScreen() {
  const { cartData } = useLocalSearchParams();

  const [cartItems, setCartItems] = useState(
    cartData ? JSON.parse(cartData as string) : [],
  );

  const increaseQuantity = (id: number) => {
    setCartItems((prev: any[]) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((prev: any[]) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const total = useMemo(() => {
    return cartItems.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cart</Text>

      {cartItems.map((item: any) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.itemName}>
            {item.emoji} {item.name}
          </Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => decreaseQuantity(item.id)}
            >
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.quantity}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => increaseQuantity(item.id)}
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.price}>₹{item.price * item.quantity}</Text>
        </View>
      ))}

      <Text style={styles.total}>Total: ₹{total}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/checkout",
            params: {
              cartData: JSON.stringify(cartItems),
              total: String(total),
            },
          })
        }
      >
        <Text style={styles.buttonText}>Checkout</Text>
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
    marginBottom: 15,
  },

  itemName: {
    fontSize: 20,
    fontWeight: "bold",
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  qtyBtn: {
    backgroundColor: "#ff6600",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  qtyText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  quantity: {
    fontSize: 20,
    marginHorizontal: 20,
  },

  price: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: "bold",
  },

  total: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },

  button: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 8,
    marginTop: 25,
    marginBottom: 30,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
