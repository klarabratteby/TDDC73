import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Trending({ lang, years, months, days }) {
  const navigation = useNavigation();

  // GraphQL query
  const GET_TRENDING_REPOS = gql`
    query GetTrendingRepos($query: String!) {
      search(query: $query, type: REPOSITORY, first: 10) {
        edges {
          node {
            ... on Repository {
              # Specify that you're querying a Repository type
              name
              owner {
                login
              }
              stargazers {
                totalCount
              }
              description
              forks {
                totalCount
              }
              createdAt
              defaultBranchRef {
                target {
                  ... on Commit {
                    history {
                      totalCount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  // Apollo Client query hook
  const { loading, error, data, refetch } = useQuery(GET_TRENDING_REPOS, {
    variables: { query: `language:${lang} sort:stars-desc` },
  });

  useEffect(() => {}, [loading, error, data, lang]);

  // Refetch query when `lang` changes
  useEffect(() => {
    if (lang) {
      refetch();
    }
  }, [lang, refetch]);

  const getFilteredData = () => {
    if (!data?.search?.edges) return [];

    // Filter by year, month, and day if any are selected
    return data.search.edges.filter((repo) => {
      const createdAt = new Date(repo.node.createdAt);
      const repoYear = createdAt.getFullYear();
      const repoMonth = createdAt.getMonth() + 1; // Months are 0-indexed
      const repoDay = createdAt.getDate();

      const yearMatch = years.length === 0 || years.includes(`${repoYear}`);
      const monthMatch = months.length === 0 || months.includes(`${repoMonth}`);
      const dayMatch = days.length === 0 || days.includes(`${repoDay}`);

      return yearMatch && monthMatch && dayMatch;
    });
  };

  // Handle loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Handle error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }
  const filteredData = getFilteredData();

  // Render each item in the list
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate("Details", { project: item });
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
        {item.node.name}
      </Text>
      <Text style={{ color: "white", fontSize: 14 }}>
        {item.node.description}
      </Text>
      <Text style={{ color: "gray", fontSize: 12 }}>
        Created At: {new Date(item.node.createdAt).toLocaleDateString()}
      </Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Ionicons name="star-outline" color="white" size={14} />
          <Text style={styles.repoDetails}>
            {item.node.stargazers.totalCount}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <AntDesign name="fork" size={14} color="white" />
          <Text style={styles.repoDetails}>{item.node.forks.totalCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        //data={data?.search?.edges || []}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.node.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#252B35",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#252B35",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  item: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 4,
    borderRadius: 5,
    backgroundColor: "black",
  },
  detailsContainer: {
    alignItems: "flex-start",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  detailRow: {
    flexDirection: "row",
    marginVertical: 3,
  },
  repoDetails: {
    color: "white",
    fontSize: 12,
    marginLeft: 4,
  },
});
