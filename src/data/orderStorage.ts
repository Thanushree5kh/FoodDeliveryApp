import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "./storage";

export const saveOrder = async (order: any) => {
  const user = await getUser();

  if (!user) return;

  const key = `orders_${user.email}`;

  const existingOrders = await AsyncStorage.getItem(key);

  const orders = existingOrders ? JSON.parse(existingOrders) : [];

  orders.push(order);

  await AsyncStorage.setItem(key, JSON.stringify(orders));
};

export const getOrders = async () => {
  const user = await getUser();

  if (!user) return [];

  const key = `orders_${user.email}`;

  const orders = await AsyncStorage.getItem(key);

  return orders ? JSON.parse(orders) : [];
};
