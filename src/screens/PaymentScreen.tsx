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

      <Text style={styles.subtitle}>Demo Payment Gateway</Text>

      <Text style={styles.note}>(No real transaction is performed)</Text>

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
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    fontWeight: "bold",
  },

  note: {
    textAlign: "center",
    color: "gray",
    marginBottom: 20,
  },

  option: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },

  selected: {
    borderColor: "#ff6600",
    borderWidth: 2,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },

  amount: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
  },

  codBox: {
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginTop: 15,
  },

  button: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 8,
    marginTop: 25,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
