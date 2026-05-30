import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function TrackingScreen() {
  const stages = [
    "Order Confirmed",
    "Preparing Food",
    "Packed",
    "Out For Delivery",
    "Delivered",
  ];

  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (index: number) => {
    const icons = ["✅", "👨‍🍳", "📦", "🛵", "🎉"];
    return icons[index];
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📍 Live Order Tracking</Text>
      {/* Fake Map */}
      <View style={styles.mapContainer}>
        <Text style={styles.mapTitle}>🗺️ Delivery Route</Text>

        <Text style={styles.route}>🍽️ Restaurant</Text>
        <Text style={styles.line}>⬇️</Text>

        <Text style={styles.route}>🛵 Delivery Partner</Text>
        <Text style={styles.line}>⬇️</Text>

        <Text style={styles.route}>🏠 Your Location</Text>
      </View>

      {/* ETA */}
      <View style={styles.etaBox}>
        <Text style={styles.etaText}>
          ⏱ Estimated Arrival: {20 - statusIndex * 4} mins
        </Text>
      </View>

      {/* Status Timeline */}
      <View style={styles.timeline}>
        {stages.map((stage, index) => (
          <View key={index} style={styles.stageRow}>
            <Text
              style={[
                styles.stageText,
                index <= statusIndex && styles.activeStage,
              ]}
            >
              {getIcon(index)} {stage}
            </Text>
          </View>
        ))}
      </View>

      {/* Rider Info */}
      <View style={styles.riderCard}>
        <Text style={styles.riderTitle}>👨 Delivery Partner</Text>

        <Text style={styles.riderText}>Name: Rahul Kumar</Text>

        <Text style={styles.riderText}>Phone: 9876543210</Text>

        <Text style={styles.riderText}>Vehicle: KA09 AB1234</Text>
      </View>

      {/* Restaurant Info */}
      <View style={styles.restaurantCard}>
        <Text style={styles.restaurantTitle}>🍴 Restaurant Details</Text>

        <Text>Restaurant: Snack Cafe</Text>

        <Text>Order Status: {stages[statusIndex]}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#ffffff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  mapContainer: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    alignItems: "center",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0)",
  },

  mapTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  route: {
    fontSize: 16,
  },

  line: {
    fontSize: 24,
    color: "#ff6600",
  },

  etaBox: {
    backgroundColor: "rgba(255,102,0,0.15)",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,

    borderWidth: 1,
    borderColor: "#ff6600",
  },

  etaText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6600",
  },

  timeline: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 20,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },

  stageRow: {
    marginBottom: 15,
  },

  stageText: {
    fontSize: 20,
    color: "#ffffff99",
  },

  activeStage: {
    color: "#128e09",
    fontWeight: "bold",
    fontSize: 22,
  },
  riderCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },

  riderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  riderText: {
    fontSize: 16,
    marginBottom: 5,
  },

  restaurantCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    marginBottom: 30,

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0)",
  },

  restaurantTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
