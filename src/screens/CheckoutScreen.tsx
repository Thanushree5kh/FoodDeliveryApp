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
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },

  orderCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  couponButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },

  total: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },

  discount: {
    fontSize: 18,
    textAlign: "center",
    color: "green",
    marginTop: 10,
  },

  finalAmount: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ff6600",
    marginTop: 10,
  },

  deliveryBox: {
    borderWidth: 1,
    borderColor: "#ff6600",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },

  deliveryText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  deliveryTime: {
    fontSize: 20,
    color: "#ff6600",
    marginTop: 5,
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
