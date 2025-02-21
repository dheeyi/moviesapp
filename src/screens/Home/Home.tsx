import React, {useEffect, useRef} from 'react';
import { Dimensions, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import { getPopularMovies} from '../../utils/service/TMDBService';
import { useSharedValue } from 'react-native-reanimated';
import Carousel , { ICarouselInstance } from 'react-native-reanimated-carousel';

const data = [...new Array(6).keys()];
const width = Dimensions.get('window').width;

const Home = () => {
    const ref = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    useEffect(() => {
        getPopularMovies()
            .then((response: any) => {
                console.log(response);
            });
    }, []);

    return (
      <View>
          <View style={styles.titleSection}>
              <Text>My List</Text>
              <Text>Discover</Text>
          </View>
          <Carousel
              ref={ref}
              width={width}
              height={width / 2}
              data={data}
              onProgressChange={progress}
              renderItem={({ index }) => (
                  <View
                      style={{
                          flex: 1,
                          borderWidth: 1,
                          justifyContent: 'center',
                      }}
                  >
                      <Text style={{ textAlign: 'center', fontSize: 30 }}>{index}</Text>
                  </View>
              )}
          />
          <View style={styles.buttonSection}>
              <TouchableOpacity style={styles.button}>
                  <Text>WishList</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                  <Text>Details</Text>
              </TouchableOpacity>
          </View>
      </View>
    );
};

const styles = StyleSheet.create({
    titleSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    buttonSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default Home;
