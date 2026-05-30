import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { getUser } from "../data/storage";

export default function CheckoutScreen() {
  const { cartData, total } = useLocalSearchParams();

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const cartItems = cartData ? JSON.parse(cartData as string) : [];

  const expectedDelivery = Math.floor(Math.random() * 20) + 20;

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const user = await getUser();

    if (user) {
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  };

  const applyCoupon = () => {
    if (coupon === "WELCOME50") {
      setDiscount(50);
      Alert.alert("Success", "Coupon Applied Successfully");
    } else if (coupon === "SAVE100") {
      setDiscount(100);
      Alert.alert("Success", "Coupon Applied Successfully");
    } else if (coupon === "FOOD20") {
      setDiscount(20);
      Alert.alert("Success", "Coupon Applied Successfully");
    } else {
      Alert.alert("Invalid Coupon");
    }
  };

  const finalAmount = Number(total) - discount;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <Text style={styles.label}>Delivery Address</Text>

      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        multiline
      />

      <Text style={styles.label}>Phone Number</Text>

      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text style={styles.sectionTitle}>Order Summary</Text>

      {cartItems.map((item: any) => (
        <View key={item.id} style={styles.orderCard}>
          <Text>
            {item.name} x {item.quantity}
          </Text>

          <Text>₹{item.price * item.quantity}</Text>
        </View>
      ))}

      <Text style={styles.label}>Coupon Code</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Coupon Code"
        value={coupon}
        onChangeText={setCoupon}
      />

      <TouchableOpacity style={styles.couponButton} onPress={applyCoupon}>
        <Text style={styles.buttonText}>Apply Coupon</Text>
      </TouchableOpacity>

      <Text style={styles.total}>Total Amount: ₹{total}</Text>

      <Text style={styles.discount}>Discount: ₹{discount}</Text>

      <Text style={styles.finalAmount}>Final Amount: ₹{finalAmount}</Text>

      <View style={styles.deliveryBox}>
        <Text style={styles.deliveryText}>🚚 Expected Delivery Time</Text>

        <Text style={styles.deliveryTime}>
          {expectedDelivery} - {expectedDelivery + 10} mins
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/payment",
            params: {
              cartData: JSON.stringify(cartItems),
              total: String(finalAmount),
              address,
              phone,
              deliveryTime: `${expectedDelivery}-${expectedDelivery + 10} mins`,
            },
          })
        }
      >
        <Text style={styles.buttonText}>Proceed To Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 25,

    borderWidth: 3,
    borderColor: "#ff6600",
    borderRadius: 20,
    margin: 10,
  },

  title: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ff6600",
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    marginTop: 25,
    marginBottom: 15,
  },

  orderCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#fff",
    padding: 18,

    borderRadius: 18,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },

  couponButton: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 20,
  },

  total: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginTop: 15,
  },

  discount: {
    fontSize: 18,
    color: "#27ae60",
    marginTop: 10,
  },

  finalAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ff6600",
    marginTop: 10,
  },

  deliveryBox: {
    backgroundColor: "#fff7f0",

    borderWidth: 2,
    borderColor: "#ff6600",

    borderRadius: 18,
    padding: 20,

    marginTop: 25,
    marginBottom: 20,
  },

  deliveryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  deliveryTime: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff6600",
    marginTop: 8,
  },

  button: {
    backgroundColor: "#ff6600",

    paddingVertical: 18,

    borderRadius: 18,

    marginTop: 25,
    marginBottom: 40,

    shadowColor: "#ff6600",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
