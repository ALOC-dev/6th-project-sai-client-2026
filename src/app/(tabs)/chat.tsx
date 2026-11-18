import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ChatTab = "chat" | "appointments";

export default function ChatScreen() {
  const [activeTab, setActiveTab] = useState<ChatTab>("chat");

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Pressable onPress={() => setActiveTab("chat")}>
          <Text style={styles.tabText}>채팅</Text>
        </Pressable>

        <Pressable onPress={() => setActiveTab("appointments")}>
          <Text style={styles.tabText}>약속</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        {activeTab === "chat" ? <Text>채팅 목록 화면</Text> : <Text>약속 목록 화면</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
    padding: 20,
  },
  tabText: {
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
