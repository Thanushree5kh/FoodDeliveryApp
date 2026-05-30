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
        <Text style={styles.mapTitle}>Live Route</Text>

        <View style={styles.routeContainer}>
          <View style={styles.pointRow}>
            <View style={styles.pointOrange} />
            <Text style={styles.route}>Restaurant</Text>
          </View>

          <View style={styles.verticalLine} />

          <View style={styles.pointRow}>
            <View style={styles.pointOrange} />
            <Text style={styles.route}>Delivery Partner</Text>
          </View>

          <View style={styles.verticalLine} />

          <View style={styles.pointRow}>
            <View style={styles.pointGreen} />
            <Text style={styles.route}>Your Location</Text>
          </View>
        </View>
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
    backgroundColor: "#ffffff",

    borderWidth: 3,
    borderColor: "#ff6600",
    margin: 300,
    borderRadius: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ff6600",
    marginBottom: 25,
  },

  routeContainer: {
    width: "100%",
    marginTop: 10,
  },

  pointRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  pointOrange: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#ff6600",
    marginRight: 12,
  },

  pointGreen: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#128e09",
    marginRight: 12,
  },

  verticalLine: {
    width: 3,
    height: 40,
    backgroundColor: "#ff6600",
    marginLeft: 7,
    marginVertical: 5,
  },
  mapContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    padding: 25,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ff6600",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  mapTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#000",
  },

  route: {
    fontSize: 18,
    color: "#000",
    fontWeight: "600",
  },

  line: {
    fontSize: 24,
    color: "#ff6600",
    marginVertical: 5,
  },

  etaBox: {
    backgroundColor: "#ffffff",

    borderRadius: 20,
    padding: 18,
    marginBottom: 20,

    borderWidth: 2,
    borderColor: "#ff6600",
  },

  etaText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6600",
  },

  timeline: {
    backgroundColor: "#ffffff",

    borderRadius: 20,
    padding: 20,

    borderWidth: 2,
    borderColor: "#ff6600",
  },

  stageRow: {
    marginBottom: 15,
  },

  stageText: {
    fontSize: 20,
    color: "#000000",
  },

  activeStage: {
    color: "#128e09",
    fontWeight: "bold",
    fontSize: 22,
    backgroundColor: "#e8f8e8",
    padding: 8,
    borderRadius: 10,
  },

  riderCard: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    padding: 20,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#ff6600",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  riderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#000",
  },

  riderText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#000",
  },
  restaurantCard: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    padding: 20,
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: "#ff6600",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  restaurantTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#000",
  },
});
