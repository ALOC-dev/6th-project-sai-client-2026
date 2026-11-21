import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ChatRoomScreen() {
  const { chatRoomId } = useLocalSearchParams<{
    chatRoomId: string;
  }>();

  return (
    <View>
      <Text>채팅방 ID: {chatRoomId}</Text>
    </View>
  );
}
