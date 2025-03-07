import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Text, View, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';

import { getPopularMovies} from '../../utils/service/TMDBService';
import { useSharedValue } from 'react-native-reanimated';
import Carousel , { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import ModalDetail from '../../components/Modals/modalDetail.tsx';

const width = Dimensions.get('window').width;

const Home = () => {
    const [topImages, setTopImages] = useState<any>([]);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const ref = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    useEffect(() => {
        getPopularMovies()
            .then((response: any) => {
                const movies = response.map((item: any) => ({
                    posterPath: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }));
                setTopImages(movies);
                console.log(movies);
            });
    }, []);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };

    const openDetialModal = () => {
        setShowDetailModal(true);
    };

    const closeDetailModal = () => {
        setShowDetailModal(false);
    };

    return (
      <View>
          <View style={styles.carouselSection}>
              <Carousel
                  ref={ref}
                  width={width}
                  height={width * 1.5}
                  data={topImages}
                  autoPlay={true}
                  autoPlayInterval={5000}
                  onProgressChange={progress}
                  renderItem={({ index }) => (
                      <View
                          style={{
                              flex: 1,
                              borderWidth: 1,
                              justifyContent: 'center',
                          }}
                      >
                          <Image
                              source={{
                                  uri: topImages[index].posterPath,
                              }}
                              style={styles.image}
                          />
                      </View>
                  )}
              />
              <View style={styles.overlayContainer}>
                  <View style={styles.titleSection}>
                      <Text style={styles.textDesc}>My List</Text>
                      <Text style={styles.textDesc}>Discover</Text>
                  </View>
                  <View style={styles.buttonSection}>
                      <TouchableOpacity style={styles.buttonWishList}>
                          <Text style={styles.textWishList}>+ WishList</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={openDetialModal}
                          style={styles.buttonDetail}
                      >
                          <Text style={styles.textDetails}>Details</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
          <Pagination.Basic
              progress={progress}
              data={topImages}
              dotStyle={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50 }}
              containerStyle={{ gap: 5, marginTop: 20 }}
              onPress={onPressPagination}
          />
           <ModalDetail
               showDetailModal={showDetailModal}
               closeDetailModal={closeDetailModal}
           />
      </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
    },
    carouselSection: {
        position: 'relative',
    },
    overlayContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 5,
    },
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
    textDesc: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 20,
        color: 'white',
    },
    buttonDetail: {
        backgroundColor: '#F2C94C',
        paddingHorizontal: 50,
        paddingVertical: 20,
        borderRadius: 13,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textWishList: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    buttonWishList: {
        backgroundColor: '#333333',
        paddingHorizontal: 50,
        paddingVertical: 20,
        borderRadius: 13,
        alignItems: 'center',
    },
    textDetails: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Home;
