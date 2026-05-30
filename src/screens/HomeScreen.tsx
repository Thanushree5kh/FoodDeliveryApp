import { router } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function HomeScreen() {
  const restaurants = [
    {
      id: 1,
      name: "Snack Cafe",
      rating: 4.5,
      time: "25 mins",
      offer: "50% OFF",
      image: require("../../assets/images/snack-cafe.jpg"),
    },
    {
      id: 2,
      name: "Evening Cafe",
      rating: 4.2,
      time: "30 mins",
      offer: "40% OFF",
      image: require("../../assets/images/evening-cafe.jpg"),
    },
    {
      id: 3,
      name: "Shimoga House",
      rating: 4.6,
      time: "20 mins",
      offer: "30% OFF",
      image: require("../../assets/images/shimoga-house.jpg"),
    },
  ];
  const categories = [
    {
      name: "Pizza",
      image: require("../../assets/images/pizza1.png"),
    },
    {
      name: "Burger",
      image: require("../../assets/images/burger1.png"),
    },
    {
      name: "Snacks",
      image: require("../../assets/images/snack1.png"),
    },
    {
      name: "Drinks",
      image: require("../../assets/images/drink1.png"),
    },
    {
      name: "Dessert",
      image: require("../../assets/images/dessert1.png"),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>RESTAURANT</Text>
          <Text style={styles.location}>📍 Shimoga, Karnataka</Text>
        </View>

        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Text style={styles.profile}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput
        placeholder="Search food, restaurants..."
        placeholderTextColor="#131313"
        style={styles.search}
      />
      <View style={styles.heroBanner}>
        <View style={{ flex: 1 }}>
          <Text style={styles.heroTitle}>
            Conquer Hunger,{"\n"}Rule Flavor!
          </Text>

          <Text style={styles.heroSubtitle}>
            Discover delicious meals from your favorite restaurants.
          </Text>

          <TouchableOpacity style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Order Now</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require("../../assets/images/banner-food.png")}
          style={styles.heroImage}
        />
      </View>

      {/* Offer Banner */}
      <View style={styles.offerBanner}>
        <Text style={styles.offerTitle}>🔥 Flat 50% OFF</Text>

        <Text style={styles.offerSubTitle}>
          On your first order • Use WELCOME50
        </Text>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      >
        {categories.map((item, index) => (
          <View key={index} style={styles.categoryContainer}>
            <View style={styles.categoryCircle}>
              <Image source={item.image} style={styles.categoryImage} />
            </View>

            <Text style={styles.categoryLabel}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Restaurants */}
      <Text style={styles.sectionTitle}>Popular Restaurants</Text>

      {restaurants.map((restaurant) => (
        <TouchableOpacity
          key={restaurant.id}
          style={styles.restaurantCard}
          onPress={() =>
            router.push({
              pathname: "/restaurant",
              params: {
                name: restaurant.name,
                rating: String(restaurant.rating),
              },
            })
          }
        >
          <View>
            <Image source={restaurant.image} style={styles.restaurantImage} />

            <View style={styles.offerBadge}>
              <Text style={styles.offerBadgeText}>{restaurant.offer}</Text>
            </View>
          </View>

          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>

            <Text style={styles.rating}>
              ⭐ {restaurant.rating} • 🚴 {restaurant.time}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f6f6",

    paddingHorizontal: 20,
    paddingTop: 10,

    borderWidth: 4,
    borderColor: "#ff6600",

    borderRadius: 15,
    margin: 10,
  },

  categoryContainer: {
    alignItems: "center",
    marginRight: 18,
  },

  categoryCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fef9f5",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },

  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  categoryLabel: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },

  welcome: {
    color: "#0e0d0d",
    fontSize: 35,
    fontWeight: "bold",
    fontStyle: "italic",
  },

  location: {
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
  },

  profile: {
    fontSize: 35,
    fontStyle: "italic",
  },

  search: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ff6600",
    fontStyle: "italic",
    color: "#0e0e0e",
    shadowColor: "#ff6600",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  heroBanner: {
    backgroundColor: "#000000",
    borderRadius: 25,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    minHeight: 220,
  },

  heroTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
  },

  heroSubtitle: {
    color: "#fff",
    marginTop: 10,
    fontSize: 14,
    fontStyle: "italic",
  },

  heroButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 15,
  },

  heroButtonText: {
    color: "#ff5a5f",
    fontWeight: "bold",
    fontStyle: "italic",
  },

  heroImage: {
    width: 420,
    height: 420,
    resizeMode: "cover",
  },

  offerBanner: {
    backgroundColor: "#ff6600",
    borderRadius: 25,
    padding: 25,
    marginBottom: 25,
    elevation: 8,
  },

  offerTitle: {
    color: "#100f0f",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
  },

  offerSubTitle: {
    color: "#0f0f0f",
    marginTop: 5,
    fontSize: 15,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 15,
  },

  categoryCard: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 15,
    marginRight: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  categoryText: {
    fontWeight: "600",
  },

  restaurantCard: {
    backgroundColor: "#fafaf1",
    borderRadius: 1,
    overflow: "hidden",
    marginBottom: 15,
    borderColor: "#f7f7f7",
    color: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 4,
  },

  offerBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#fb1919",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  offerBadgeText: {
    color: "#0f0f0f",
    fontWeight: "bold",
    fontSize: 12,
  },

  restaurantInfo: {
    padding: 15,
  },

  restaurantName: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  restaurantImage: {
    width: "35%",
    height: 280,
  },

  rating: {
    marginTop: 8,
    color: "#0a0a0a",
    fontSize: 15,
    fontStyle: "italic",
  },
});
