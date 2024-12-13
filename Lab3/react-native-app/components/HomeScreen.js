import { StyleSheet, Text, View, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Trending from "./Trending";
import { TOKEN_KEY } from "@env";
import DropDownPicker from "react-native-dropdown-picker";

// Initialize apollo client
const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${process.env.TOKEN_KEY}`,
  },
});

export default function HomeScreen() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "C#", value: "c#" },
    { label: "CSS", value: "css" },
    { label: "Ruby", value: "ruby" },
    { label: "PHP", value: "php" },
    { label: "Rust", value: "rust" },
    { label: "Kotlin", value: "kotlin" },
    { label: "HTML", value: "html" },
    { label: "Java", value: "java" },
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "Python", value: "python" },
  ]);

  const [openYearFilter, setOpenYearFilter] = useState(false);
  const [selectedYears, setSelectedYears] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);

  const [openMonthFilter, setOpenMonthFilter] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [monthOptions, setMonthOptions] = useState([]);

  const [openDayFilter, setOpenDayFilter] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [dayOptions, setDayOptions] = useState([]);

  // Year options from 2000 to 2024
  useState(() => {
    const years = [];
    for (let year = 2000; year <= 2024; year++) {
      years.push({ label: `${year}`, value: `${year}` });
    }
    setYearOptions(years);
  }, []);

  // Month options (1-12)
  useEffect(() => {
    const months = [];
    for (let month = 1; month <= 12; month++) {
      months.push({ label: `${month}`, value: `${month}` });
    }
    setMonthOptions(months);
  }, []);

  // Day options (1-31)
  useEffect(() => {
    const days = [];
    for (let day = 1; day <= 31; day++) {
      days.push({ label: `${day}`, value: `${day}` });
    }
    setDayOptions(days);
  }, []);

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <StatusBar />
        <View style={styles.filterWrapper}>
          {/* Main Dropdown */}
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Item"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              listMode="MODAL"
            />
          </View>

          {/* Year Filter */}
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={openYearFilter}
              value={selectedYears}
              items={yearOptions}
              setOpen={setOpenYearFilter}
              setValue={setSelectedYears}
              setItems={setYearOptions}
              multiple={true}
              placeholder="Year"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              listMode="MODAL"
            />
          </View>

          {/* Month Filter */}
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={openMonthFilter}
              value={selectedMonths}
              items={monthOptions}
              setOpen={setOpenMonthFilter}
              setValue={setSelectedMonths}
              setItems={setMonthOptions}
              multiple={true}
              placeholder="Mon"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              listMode="MODAL"
            />
          </View>

          {/* Day Filter */}
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={openDayFilter}
              value={selectedDays}
              items={dayOptions}
              setOpen={setOpenDayFilter}
              setValue={setSelectedDays}
              setItems={setDayOptions}
              multiple={true}
              placeholder="Day"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              listMode="MODAL"
            />
          </View>
        </View>

        <Trending
          lang={value}
          years={selectedYears}
          months={selectedMonths}
          days={selectedDays}
        />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#252B35",
  },
  filterWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 10,
    zIndex: 2,
  },
  dropdownWrapper: {
    flex: 1,
    marginHorizontal: 5,
    zIndex: 2,
  },
  dropdown: {
    backgroundColor: "#FFFFFF",
    borderColor: "#CCCCCC",
    color: "#000000",
  },
  dropdownContainer: {
    backgroundColor: "#FFFFFF",
    borderColor: "#CCCCCC",
  },
});
