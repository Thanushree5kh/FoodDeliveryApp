import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function MenuScreen() {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const menuItems = [
    {
      id: 1,
      name: "Pizza",
      price: 199,
      emoji: "🍕",
      image: require("../../assets/images/pizza.jpg"),
    },
    {
      id: 2,
      name: "Burger",
      price: 149,
      emoji: "🍔",
      image: require("../../assets/images/burger.jpg"),
    },
    {
      id: 3,
      name: "Pasta",
      price: 179,
      emoji: "🍝",
      image: require("../../assets/images/pasta.jpg"),
    },
  ];

  const toggleItem = (item: any) => {
    const exists = selectedItems.find((i) => i.id === item.id);

    if (exists) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([
        ...selectedItems,
        {
          ...item,
          quantity: 1,
        },
      ]);
    }
  };

  const handleAddToCart = () => {
    if (selectedItems.length === 0) {
      Alert.alert("Select Item", "Please select at least one item");
      return;
    }

    router.push({
      pathname: "/cart",
      params: {
        cartData: JSON.stringify(selectedItems),
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>View Our Menu</Text>

      <View style={styles.menuRow}>
        {menuItems.map((item) => {
          const selected = selectedItems.some((i) => i.id === item.id);

          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuCard, selected && styles.selectedCard]}
              onPress={() => toggleItem(item)}
            >
              <Image source={item.image} style={styles.foodImage} />

              <Text style={styles.itemName}>{item.name}</Text>

              <Text style={styles.price}>₹{item.price}</Text>

              <Text style={styles.checkbox}>{selected ? "☑" : "☐"}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.selected}>
        Selected Items: {selectedItems.length}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add To Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffefd",
    padding: 100,

    borderWidth: 7,
    borderColor: "#ff6600",
    borderRadius: 30,

    margin: 40,
  },

  title: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#111",
    fontFamily: "Snell",
    fontStyle: "italic",
  },

  menuRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },

  menuCard: {
    alignItems: "center",
    width: 250,
    marginBottom: 30,
  },

  selectedCard: {
    backgroundColor: "#fff5eb",
    borderRadius: 20,
    padding: 10,
  },

  foodImage: {
    width: 190,
    height: 190,
    borderRadius: 30,
    marginBottom: 15,
  },

  itemName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },

  price: {
    fontSize: 18,
    color: "#666",
    marginTop: 5,
    marginBottom: 10,
  },

  checkbox: {
    fontSize: 32,
    color: "#ff6600",
  },

  selected: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  button: {
    backgroundColor: "#ff6600",
    padding: 16,
    borderRadius: 12,
    marginTop: 25,
    marginBottom: 30,
    alignSelf: "center",
    width: 250,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
