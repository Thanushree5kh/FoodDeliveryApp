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
      <Text style={styles.title}>🍽️ Menu</Text>

      {menuItems.map((item) => {
        const selected = selectedItems.some((i) => i.id === item.id);

        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.itemCard, selected && styles.selectedCard]}
            onPress={() => toggleItem(item)}
          >
            <Image source={item.image} style={styles.foodImage} />

            <View style={styles.infoContainer}>
              <Text style={styles.itemName}>
                {selected ? "☑" : "☐"} {item.emoji} {item.name}
              </Text>

              <Text style={styles.price}>₹{item.price}</Text>
            </View>
          </TouchableOpacity>
        );
      })}

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
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  itemCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 15,
    backgroundColor: "#fff",
  },

  selectedCard: {
    borderColor: "#ff6600",
    borderWidth: 2,
    backgroundColor: "#fff5eb",
  },

  foodImage: {
    width: "100%",
    height: 320,
  },

  infoContainer: {
    padding: 15,
  },

  itemName: {
    fontSize: 20,
    fontWeight: "bold",
  },

  price: {
    marginTop: 5,
    fontSize: 18,
    color: "#666",
  },

  selected: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
