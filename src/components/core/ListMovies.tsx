import React, {useState, useEffect} from 'react';
import { View, Dimensions, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { getRatedMovies } from '../../utils/service/TMDBService';
import { useSharedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const ListMovies = () => {
    const [ratedImages, setRatedImages] = useState<any>([]);
    const progress = useSharedValue<number>(0);

    useEffect(() => {
        getRatedMovies()
            .then((response: any) => {
                const movies = response.map((item: any) => ({
                    posterPath: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }));
                setRatedImages(movies);
            });
    }, []);

  return (
    <View>
            <Carousel
                data={ratedImages}
                height={200}
                pagingEnabled={false}
                snapEnabled={false}
                width={width}
                style={{
                    width: width,
                }}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 1,
                    parallaxScrollingOffset: 220,
                }}
                onProgressChange={progress}
                renderItem={({ item }: any) => (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            width: '40%',
                        }}
                    >
                        <Image
                            source={{
                                uri: item.posterPath,
                            }}
                            style={styles.imagePoster}
                        />
                    </View>
                )}
            />
        </View>
  );
};

const styles = StyleSheet.create({
    imagePoster: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
});

export default ListMovies;

