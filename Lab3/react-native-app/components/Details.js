import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function Details({ route }) {
  const navigation = useNavigation();
  const { project } = route.params;
  const date = new Date(project.node.createdAt);
  const formatDate = date.toLocaleDateString();
  return (
    <View style={styles.container}>
      <View style={styles.topDetails}>
        <View>
          <Text style={[styles.textStyle, { fontSize: 24 }]}>
            {project.node.name}
          </Text>
          <Text style={styles.textStyle}>{project.node.owner.login}</Text>
        </View>
        <View>
          <Text style={[styles.textStyle, { opacity: 0.6 }]}>{formatDate}</Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.textStyle}>{project.node.description}</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.detailGroup}>
          <Ionicons name="star-outline" size={24} color="white" />
          <Text style={styles.textStyle}>
            {project.node.stargazers.totalCount}
          </Text>
        </View>
        <View style={styles.detailGroup}>
          <Ionicons name="git-commit-outline" size={24} color="white" />
          <Text style={styles.textStyle}>
            {project.node.defaultBranchRef.target.history.totalCount}
          </Text>
        </View>
        <View style={styles.detailGroup}>
          <AntDesign name="fork" size={24} color="white" />
          <Text style={styles.textStyle}>{project.node.forks.totalCount}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#252B35",
  },
  topDetails: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  textStyle: {
    color: "white",
    fontSize: 14,
  },
  description: {
    marginTop: 15,
  },
  details: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-evenly",
  },
});
