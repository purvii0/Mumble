import { useContext, useEffect, useState ,Alert} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import axios from "axios";
import { UserType } from "../UserContext";

const ThreadsScreen = () => {
  const { userId } = useContext(UserType);
  const [content, setContent] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(
          `http://192.168.141.100:5001/profile/${userId}`
        );
        console.log("Response from profile API:", response.data);
        const { user } = response.data;
        setUserName(user.name);
      } catch (error) {
        console.log("Error fetching user's name:", error);
      }
    };

    if (userId) {
      fetchUserName();
    }
  }, [userId]);
  async function handlePostSubmit() {
     console.log(userId)
    const postData = {
      userId,content
    };

    if (content) {
      postData.content = content;
    }

     axios
      .post("http://192.168.141.100:3000/create-post", postData)
      .then((response) => {
        setContent("");
        console.log(content);
        console.log("Success");
      })
      .catch((error) => {
        console.log("Error creating post:", error);
      });
  };

  return (
    <SafeAreaView style={{ padding: 10, paddingTop:40 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 10,
        }}
      >
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
          }}
        />

        <Text>{userName}</Text>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <TextInput
          value={content}
          onChangeText={(text) => setContent(text)}
          placeholderTextColor={"black"}
          placeholder="Type your message..."
          multiline
        />
      </View>

      <View style={{ marginTop: 20 }} />

      <Button onPress={handlePostSubmit} title="Share Post" />
    </SafeAreaView>
  );
};

export default ThreadsScreen;

const styles = StyleSheet.create({});
