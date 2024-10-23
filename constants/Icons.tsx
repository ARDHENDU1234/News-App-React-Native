import { Ionicons } from "@expo/vector-icons";

export const icon = {
  index: ({ color, focused }: { color: string; focused: boolean }) =>
    <Ionicons
      name={focused ? "home" : "home-outline"}
      size={24}
      color={color}
    />,
  discover: ({ color, focused }: { color: string; focused: boolean }) =>
    <Ionicons
      name={focused ? "compass" : "compass-outline"}
      size={25}
      color={color}
    />,
  saved: ({ color, focused }: { color: string; focused: boolean }) =>
    <Ionicons
      name={focused ? "bookmarks" : "bookmarks-outline"}
      size={22}
      color={color}
    />,
  settings: ({ color, focused }: { color: string; focused: boolean }) =>
    <Ionicons
      name={focused ? "settings" : "settings-outline"}
      size={24}
      color={color}
    />,
};
