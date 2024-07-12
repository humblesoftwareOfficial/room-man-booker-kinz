import * as SecureStore from "expo-secure-store";

export const AddItemToStorage = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    return false;
  }
};

export const RemoveItemToStorage = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    return false;
  }
};

export const GetItemToStorage = async (key) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    return false;
  }
};

export const removeStorageInfos = async () => {
  await RemoveItemToStorage("_company_code");
  await RemoveItemToStorage("_company_name");
  await RemoveItemToStorage("_company_description");
  await RemoveItemToStorage("_house_code");
  await RemoveItemToStorage("_house_name");
  await RemoveItemToStorage("_house_description");
  await RemoveItemToStorage("_code");
  await RemoveItemToStorage("_phone");
  await RemoveItemToStorage("_access_token");
  await RemoveItemToStorage("_firstName");
  await RemoveItemToStorage("_lastName");
  await RemoveItemToStorage("_pp");
  await RemoveItemToStorage("_ppkey");
  await RemoveItemToStorage("_address");
  await RemoveItemToStorage("_account_type");
};

export const AddToFavoritesLocal = async (code) => {
  try {
    const favorites = await GetItemToStorage("favorites");
    const newValues = favorites ? JSON.parse(favorites) : [];
    newValues.push(code);
    await AddItemToStorage("favorites", JSON.stringify(newValues));
    return newValues;
  } catch (error) {
    console.log({ error });
  }
};

export const RemoveFromFavoritesLocal = async (code) => {
  try {
    const favorites = await GetItemToStorage("favorites");
    const newValues = favorites ? JSON.parse(favorites) : [];
    const result = newValues.filter((item) => item !== code);
    await AddItemToStorage("favorites", JSON.stringify(result));
    return result;
  } catch (error) {
    console.log({ error });
  }
};
