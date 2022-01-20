import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";

type MyButtonType = {
  style?: StyleProp<ViewStyle>;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
};
export const MyButton: React.FC<MyButtonType> = ({
  children,
  style = {},
  onPress,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [style, { opacity: pressed ? 0.6 : 1 }]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};
