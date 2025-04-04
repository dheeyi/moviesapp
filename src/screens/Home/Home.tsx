import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

import { getPopularMovies} from '../../utils/service/TMDBService';
import { useSharedValue } from 'react-native-reanimated';
import Carousel , { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import ModalDetail from '../../components/Modals/modalDetail.tsx';
import SubHeader from '../../components/core/SubHeader.tsx';
import ListMovies from '../../components/core/ListMovies.tsx';
import { getRatedMovies, getUpComingMovies } from '../../utils/service/TMDBService';
import useTMDB from "../../hooks/useTMDB";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get('window').width;

const Home = () => {
    const [topImages, setTopImages] = useState<any>([]);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const ref = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);
    const [data] = useTMDB('movie/popular');
    const navigation = useNavigation<any>();

    useEffect(() => {
        if (data && data.length) {
            const movies = data.map((item: any) => ({
                posterPath: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }));
            setTopImages(movies);
        }
    }, [data]);

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

    const redirectSeeMore = (callbackFn: any) => {
        console.log('Redirecting to see more');
        navigation.navigate('SeeMore', { callbackFn: callbackFn });
    };

    return (
      <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.carouselContainer}>
              <View style={styles.carouselSection}>
                  <Carousel
                      ref={ref}
                      width={width}
                      height={width * 1.5}
                      data={topImages.slice(0, 6)}
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
                  data={topImages.slice(0, 6)}
                  dotStyle={{ backgroundColor: '#FFFFFF', borderRadius: 50 }}
                  activeDotStyle={{ backgroundColor: '#F2C94C' }}
                  containerStyle={{ gap: 8, marginTop: 25 }}
                  onPress={onPressPagination}
              />
              <ModalDetail
                  showDetailModal={showDetailModal}
                  closeDetailModal={closeDetailModal}
              />
              <SubHeader
                  title="Rated Movies"
                  titleNav="see more"
                  handleNav={() => {
                      redirectSeeMore(getRatedMovies);
                  }}
              />
              <ListMovies callbackFn={getRatedMovies}/>
              <SubHeader
                  title="UpComing Movies"
                  titleNav="see more"
                  handleNav={() => {
                      redirectSeeMore(getUpComingMovies);
                  }}
              />
              <ListMovies callbackFn={getUpComingMovies}/>
          </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        backgroundColor: '#000000',
    },
    carouselContainer: {
        flex: 1,
        backgroundColor: '#000000',
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
