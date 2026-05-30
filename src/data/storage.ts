import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUser = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  address: string,
) => {
  const user = {
    name,
    email,
    password,
    phone,
    address,
  };

  await AsyncStorage.setItem("user", JSON.stringify(user));
};

export const getUser = async () => {
  const user = await AsyncStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};
