import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
    Image,
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

  const getImage = (name: string) => {
    switch (name.toLowerCase()) {
      case "pizza":
        return require("../../assets/images/pizza.jpg");

      case "burger":
        return require("../../assets/images/burger.jpg");

      case "pasta":
        return require("../../assets/images/pasta.jpg");

      default:
        return require("../../assets/images/pizza.jpg");
    }
  };

  const total = useMemo(() => {
    return cartItems.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🛒 Your Cart</Text>

      {cartItems.map((item: any) => (
        <View key={item.id} style={styles.card}>
          <Image source={getImage(item.name)} style={styles.foodImage} />

          <View style={styles.infoSection}>
            <Text style={styles.itemName}>{item.name}</Text>

            <Text style={styles.subText}>Fresh & Delicious Food</Text>

            <Text style={styles.price}>₹{item.price * item.quantity}</Text>
          </View>

          <View style={styles.quantitySection}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => decreaseQuantity(item.id)}
            >
              <Text style={styles.qtyText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantity}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => increaseQuantity(item.id)}
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={styles.totalCard}>
        <Text style={styles.totalText}>Total Amount</Text>

        <Text style={styles.totalPrice}>₹{total}</Text>
      </View>

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
        <Text style={styles.buttonText}>Proceed To Checkout →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf5",
    padding: 20,

    borderWidth: 3,
    borderColor: "#ff6600",
    borderRadius: 20,
    margin: 10,
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ff6600",
    marginBottom: 30,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },

  foodImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  infoSection: {
    flex: 1,
    marginLeft: 15,
  },

  itemName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },

  subText: {
    color: "#777",
    marginTop: 4,
    marginBottom: 8,
  },

  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6600",
  },

  quantitySection: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#ff6600",
    justifyContent: "center",
    alignItems: "center",
  },

  qtyText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  quantity: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 12,
  },

  totalCard: {
    alignItems: "center",
    marginVertical: 20,
  },

  totalText: {
    fontSize: 22,
    fontWeight: "bold",
  },

  totalPrice: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#ff6600",
    marginTop: 8,
  },

  button: {
    backgroundColor: "#ff6600",
    padding: 18,
    borderRadius: 15,
    marginBottom: 30,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
