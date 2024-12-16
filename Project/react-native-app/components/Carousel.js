import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
import PropTypes from "prop-types";

const { width } = Dimensions.get("window");

const Pagination = ({ images, activeIndex }) => (
  <View style={styles.paginationContainer}>
    {images.map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          activeIndex === index ? styles.activeDot : styles.inactiveDot,
        ]}
      />
    ))}
  </View>
);

Pagination.propTypes = {
  images: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
};

const Carousel = ({
  images = [],
  numVisible = 1,
  wrapperWidth = width,
  imageHeight = 200,
}) => {
  const scrollViewRef = useRef();
  const [activeIndex, setActiveIndex] = useState(numVisible);

  const marginHorizontal = 10;
  const totalMargin = marginHorizontal * 2;
  const imageWidth = (wrapperWidth - totalMargin * numVisible) / numVisible;

  const duplicatedImages = [
    ...images.slice(-numVisible),
    ...images,
    ...images.slice(0, numVisible),
  ];

  useEffect(() => {
    if (activeIndex === 0) {
      scrollToIndex(images.length);
    } else if (activeIndex === duplicatedImages.length - numVisible) {
      scrollToIndex(numVisible);
    }
  }, [activeIndex]);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / (imageWidth + totalMargin));
    setActiveIndex(newIndex);
  };

  const scrollToIndex = (index, animated = false) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * (imageWidth + totalMargin),
        animated,
      });
    }
  };

  return (
    <View style={[styles.wrapper, { width: wrapperWidth }]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        snapToInterval={imageWidth + totalMargin}
        decelerationRate="fast"
        contentOffset={{ x: numVisible * (imageWidth + totalMargin), y: 0 }}
      >
        {duplicatedImages.map((image, index) => {
          const isActive = index === activeIndex;
          const scale = isActive ? 1 : 0.9;

          return (
            <View
              key={index}
              style={[
                styles.imageContainer,
                { width: imageWidth, marginHorizontal, transform: [{ scale }] },
              ]}
            >
              <Image
                source={image}
                style={{
                  width: imageWidth,
                  height: imageHeight,
                  borderRadius: 10,
                }}
              />
              <Text style={styles.heading}>
                Heading {(index % images.length) + 1}
              </Text>
              <Text style={styles.placeholderText}>
                Placeholder text {(index % images.length) + 1}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <Pagination images={images} activeIndex={activeIndex % images.length} />
    </View>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  numVisible: PropTypes.oneOf([1, 2, 3]),
  wrapperWidth: PropTypes.number,
  imageHeight: PropTypes.number,
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  placeholderText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 5,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#000",
    transform: [{ scale: 1.2 }],
  },
  inactiveDot: {
    backgroundColor: "#ccc",
    transform: [{ scale: 0.8 }],
  },
});

export default Carousel;
