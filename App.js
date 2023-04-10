/*     7
1. Створіть анімоване вікно привітання (компоненти та їх значення на власний розсуд).
2. Створіть анімацію для слайдера з різними картинками (можна користатись кодом з останнього прикладу).  */

import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Animated, Dimensions } from 'react-native';

const Pictures = [
  { id: 1, url: require('./pizza.png') },
  { id: 2, url: require('./sushi.png') },
  { id: 3, url: require('./burger.png') },
];
const { width } = Dimensions.get('window');

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(true);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current;
  const scrollx = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const renderSlides = ({ item }) => {
    return(
      <View style = {{ width, height: 350, justifyContent: 'center', alignItems: 'center' }}>
        <Image source = { item.url } style = {{ flex: 1, flexGrow: 1 }} resizeMode="center" />
      </View>
    );
  };

  const renderPoints = () => {
    return(
      <View style = { styles.pointsContainer }>
        { Pictures.map((item, index) => (
          <View
            key = { index }
            style = {[
              styles.point,
              { backgroundColor: index === currentIndex ? 'blue' : 'grey'},
            ]}
            />
        ))}
      </View>
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 600);

    return () => clearInterval(intervalId);
  }, []);

  return(
    <View style = { styles.container }>
      <Text style = {{ height: 70 }}></Text>
      <View style = {{ flex: 0 }}>
        <Animated.FlatList
          ref = { slideRef }
          data = { Pictures }
          horizontal
          showsHorizontalScrollIndicator = { false }
          pagingEnabled
          bounces = { false }
          keyExtractor = { (item) => item.id.toString() }
          onScroll = {Animated.event([{ nativeEvent: { contentOffset: { x: scrollx } } }], {
            useNativeDriver: false,
          })}
          onViewableItemsChanged = { viewableItemsChanged }
          viewabilityConfig = { viewConfig }
          renderItem = { renderSlides }
          />
          { renderPoints() }
      </View>
      <View style = {{ flex: 1 }}>
        <Animated.Text style = { styles.title }> Вітаємо! Оберіть страву до смаку: </Animated.Text>
        <Animated.Text style = { [styles.subtitle, isBlinking && { opacity: 0 }] }> Піцца </Animated.Text>
        <Animated.Text style = { [styles.subtitle, isBlinking && { opacity: 0 }] }> Суші </Animated.Text>
        <Animated.Text style = { [styles.subtitle, isBlinking && { opacity: 0 }] }> Бургер </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9ed92',
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  point: {
    width: 15, 
    height: 15,
    borderRadius: 5,
    margin: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 10,
  },
  subtitle: {
    color: 'black',
    fontSize: 25,
    marginBottom: 10,
    padding: 10,
  }
});



/*import React from 'react';
import { StyleSheet, Image, View, Container } from 'react-native';
//import Carousel from 'react-native-snap-carousel';

const data = [
  {
    id: '1',
    image: 'https://i.imgur.com/HoLq3rk.jpg'
  },
  {
    id: '2',
    image: 'https://i.imgur.com/kGwu7Vu.jpg'
  },
  {
    id: '3',
    image: 'https://i.imgur.com/qiTkU89.jpg'
  }
];

const ImageSlider = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image style={styles.image} source={{ uri: item.image }} />
    </View>
  );

  return (
    <Container
      data={data}
      renderItem={renderItem}
      sliderWidth={300}
      itemWidth={250}
      loop
      autoplay
      autoplayInterval={3000}
    />
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 250,
    height: 250
  }
});*/


/*import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      scaleAnim: new Animated.Value(0.5)
    };
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 1,
          duration: 1000
        }
      ),
      Animated.timing(
        this.state.scaleAnim,
        {
          toValue: 1,
          duration: 1000
        }
      )
    ]).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={{
          opacity: this.state.fadeAnim,
          transform: [{ scale: this.state.scaleAnim }]
        }}>
          <Text style={styles.text}>Welcome</Text>
          <Text style={styles.text}>Thank you for using our app</Text>
        </Animated.View>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  }
});*/





/*
import React, { useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions
} from "react-native";

const images = new Array(6).fill('https://images.unsplash.com/photo-1556740749-887f6717d7e4');

const App = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          style={styles.scrollViewStyle}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }
          ])}
          scrollEventThrottle={1}
        >
          {images.map((image, imageIndex) => {
            return (
              <View
                style={{ width: windowWidth, height: 250 }}
                key={imageIndex}
              >
                <ImageBackground source={{ uri: image }} style={styles.card}>
                  <View style={styles.textContainer}>
                    <Text style={styles.infoText}>
                      {"Image - " + imageIndex}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {images.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1)
              ],
              outputRange: [8, 16, 8],
              extrapolate: "clamp"
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, { width }]}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  scrollContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
*/

/*import React, { Component } from 'react';
import {StyleSheet, AppRegistry,Text, View,Animated,Easing} from 'react-native';

export default class App extends Component {
  constructor () {
    super()
    this.spinValue = new Animated.Value(0) //оголосити spinValue як новий Animated.Value і передати в ньому 0 (нуль)
  }

  componentDidMount () {
    this.spin()
  }

  //створити метод spin і викликати його з componentDidMount
  spin() {
    this.spinValue.setValue(0) // встановити spinValue рівним 0
    Animated.timing(    // Виклик методу Animated.timing() отримує два аргументи:
      this.spinValue, // значення
      {           // і об'єкт конфігурації
        toValue: 1, // і встановивши spinValue рівним 1
        duration: 4000, // протягом 4000 мілісекунд
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }
  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <View style={styles.container}>
        <Animated.Image
          style={{
            width: 227,
            height: 200,
            transform: [{rotate: spin}] }}
          source={require('./Picsart_22-11-05_17-40-29-443.jpg')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})*/


/*import React, { Component } from 'react';
import {StyleSheet, AppRegistry,Text, View,Animated,Easing} from 'react-native';

export default class App extends Component {
    constructor() {
        super()
        this.animatedValue = new Animated.Value(0)
    }

    componentDidMount() {
        this.animate()
    } //метод animate викликається з componentDidMount
    animate() {
        this.animatedValue.setValue(0)
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }
        ).start(() => this.animate())
    }

    render() {
        const marginLeft = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 300]
        })
        const opacity = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 0]
        })
        const movingMargin = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 300, 0]
        })
        const textSize = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [18, 32, 18]
        })
        const rotateX = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '180deg', '0deg']
        })


        return (
            <View style={styles.container}>
                <Animated.View // повертає Animated.View
                    style={{
                        marginLeft,
                        height: 30,
                        width: 40,
                        backgroundColor: 'red'}} />
                <Animated.View
                    style={{
                        opacity,
                        marginTop: 10,
                        height: 30,
                        width: 40,
                        backgroundColor: 'blue'}} />
                <Animated.View
                    style={{
                        marginLeft: movingMargin,
                        marginTop: 10,
                        height: 30,
                        width: 40,
                        backgroundColor: 'orange'}} />
                <Animated.Text // returns Animated.Text
                    style={{
                        fontSize: textSize,
                        marginTop: 10,
                        color: 'green'}} >
                    Animated Text!
                </Animated.Text>
                <Animated.View
                    style={{
                        transform: [{rotateX}],
                        marginTop: 50,
                        height: 30,
                        width: 40,
                        backgroundColor: 'black'}}>
                    <Text style={{color: 'white'}}>Hello from TransformX</Text>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 150
    }
})*/


/*import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

class App extends Component {
  state = {
    opacity: new Animated.Value(0),
    scale: new Animated.Value(0.5),
  };

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 1000,
      }),
      Animated.spring(this.state.scale, {
        toValue: 1,
        friction: 1,
      }),
    ]).start();
  }

  render() {
    return (
      <Animated.View style={[styles.container, { opacity: this.state.opacity, transform: [{ scale: this.state.scale }] }]}>
        <Text style={styles.text}>Hello, world!</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;*/