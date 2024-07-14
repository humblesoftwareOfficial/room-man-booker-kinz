import axios from "axios";
import { PLATFORM_APP_NAME } from "../../utils/system";

let api = axios.create({
  // baseURL: "https://room-man-booker-service.onrender.com/",
  baseURL: "http://192.168.1.8:3000",
});

api.defaults.headers["pm-app-id-store"] = PLATFORM_APP_NAME;

export const Authentication = async (payload, token = "") => {
  return await api.post(`/authentication/login`, payload);
};

export const UpdatePushTokens = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/users/pushtokens", payload);
};

export const RemovePushTokens = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/users/pushtokens/remove", payload);
};

export const GetHousesList = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/houses/list", payload);
};

export const GetRooms = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/places/list", payload);
};

export const AddHouse = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/houses", payload);
};

export const CreatePlace = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/places/new", payload);
};

export const SaveReservation = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/reservations/new", payload);
};

export const GetRoomInfos = async (code, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.get(`/places/${code}`);
};

export const GetCompanyStats = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/companies/stats", payload);
};

export const UpdateRoom = async (payload, token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/places/update", payload);
};

export const AddNewSupervisorToHouses = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/houses/manager", payload);
};

export const GetUsers = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/users/list", payload);
};

export const RemoveUserOnCompany = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/users/remove", payload);
};

export const SaveRequestReservation = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/reservations/request", payload);
};

export const GetReservationsList = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/reservations/list", payload);
};

export const GetLocationName = async (payload) => {
  const token = "pk.40d145bb01c3e4829c8963f0f7ce26b2";
  return api.post(
    `https://us1.locationiq.com/v1/reverse?key=${token}&lat=${payload.latitude}&lon=${payload.longitude}&format=json&`
  );
};

export const GetRequests = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/reservations/list", payload);
};

export const AcceptReservationRequest = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/reservations/accept-request", payload);
};

export const DeclineReservationRequest = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/reservations/decline-request", payload);
};

export const ExtendReservation = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/reservations/extend", payload);
};

export const UpdateMediasPlace = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/places/update-medias", payload);
};

export const GetCompanyStatsRecap = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/companies/stats-recap", payload);
};

const apis = {
  Authentication,
  UpdatePushTokens,
  GetHousesList,
  GetRooms,
  AddHouse,
  CreatePlace,
  SaveReservation,
  GetRoomInfos,
  GetCompanyStats,
  UpdateRoom,
  AddNewSupervisorToHouses,
  GetUsers,
  RemoveUserOnCompany,
  SaveRequestReservation,
  GetReservationsList,
  GetLocationName,
  GetRequests,
  AcceptReservationRequest,
  DeclineReservationRequest,
  ExtendReservation,
  UpdateMediasPlace,
  GetCompanyStatsRecap,
  RemovePushTokens
};
export default apis;
