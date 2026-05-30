import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { saveOrder } from "../data/orderStorage";

export default function PaymentScreen() {
  const { total, cartData } = useLocalSearchParams();

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const [upiId, setUpiId] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const generateTransactionId = () => {
    return "TXN" + Math.floor(Math.random() * 1000000);
  };

  const handlePayment = async () => {
    const transactionId = generateTransactionId();

    const parsedItems = cartData ? JSON.parse(cartData as string) : [];

    await saveOrder({
      id: Date.now(),

      items: parsedItems,

      amount: Number(total),

      paymentMethod: paymentMethod,

      transactionId: transactionId,

      status: "Confirmed",

      date: new Date().toLocaleString(),
    });

    Alert.alert("Payment Successful ✅", `Transaction ID: ${transactionId}`);

    router.push("/order-success");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>

      <TouchableOpacity
        style={[styles.option, paymentMethod === "UPI" && styles.selected]}
        onPress={() => setPaymentMethod("UPI")}
      >
        <Text>UPI</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, paymentMethod === "Card" && styles.selected]}
        onPress={() => setPaymentMethod("Card")}
      >
        <Text>Card</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          paymentMethod === "Cash On Delivery" && styles.selected,
        ]}
        onPress={() => setPaymentMethod("Cash On Delivery")}
      >
        <Text>Cash On Delivery</Text>
      </TouchableOpacity>

      {paymentMethod === "UPI" && (
        <>
          <TextInput
            placeholder="Enter UPI ID"
            value={upiId}
            onChangeText={setUpiId}
            style={styles.input}
          />

          <Text style={styles.amount}>Amount: ₹{total}</Text>
        </>
      )}

      {paymentMethod === "Card" && (
        <>
          <TextInput
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            style={styles.input}
          />

          <TextInput
            placeholder="Card Holder Name"
            value={cardName}
            onChangeText={setCardName}
            style={styles.input}
          />

          <TextInput
            placeholder="MM/YY"
            value={expiry}
            onChangeText={setExpiry}
            style={styles.input}
          />

          <TextInput
            placeholder="CVV"
            secureTextEntry
            value={cvv}
            onChangeText={setCvv}
            style={styles.input}
          />

          <Text style={styles.amount}>Amount: ₹{total}</Text>
        </>
      )}

      {paymentMethod === "Cash On Delivery" && (
        <View style={styles.codBox}>
          <Text>Pay ₹{total} at delivery time.</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>
          {paymentMethod === "Cash On Delivery" ? "Confirm Order" : "Pay Now"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 25,

    borderWidth: 3,
    borderColor: "#ff6600",
    borderRadius: 10,
    margin: 50,
  },

  title: {
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    color: "#c0392b",
    marginBottom: 8,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  note: {
    textAlign: "center",
    color: "#888",
    marginBottom: 25,
    fontSize: 14,
  },

  option: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,

    marginBottom: 15,

    borderWidth: 1,
    borderColor: "#eee",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },

  selected: {
    backgroundColor: "#fff4ec",
    borderColor: "#ff6600",
    borderWidth: 2,
  },

  input: {
    backgroundColor: "#fff",

    borderWidth: 1,
    borderColor: "#eee",

    padding: 15,
    borderRadius: 15,

    marginTop: 12,

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },

  amount: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ff6600",
    marginTop: 20,
  },

  codBox: {
    backgroundColor: "#fff7f0",

    borderWidth: 2,
    borderColor: "#ff6600",

    padding: 20,
    borderRadius: 15,

    marginTop: 20,
  },

  button: {
    backgroundColor: "#ff6600",

    paddingVertical: 18,

    borderRadius: 18,

    marginTop: 30,

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
