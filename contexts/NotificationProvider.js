import { createContext, useState } from "react";

export const NotificationContext = createContext();

const NotificationContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (text) => {
    setNotifications([...notifications, text]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
