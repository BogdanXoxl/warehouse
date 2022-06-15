import { toast } from "react-hot-toast";

export const openSNotification = () => {
  toast.success("Операция прошла успешно!");
};
export const openWNotification = (msg?: string) => {
  toast.error(msg ?? "Что-то пошло не так..");
};
