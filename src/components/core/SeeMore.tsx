import React, {useState, useEffect} from 'react';
import { View, Dimensions, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const SeeMore = ({ route } : any) => {
    const [ratedImages, setRatedImages] = useState<any>([]);
    const progress = useSharedValue<number>(0);
    const { callbackFn } = route.params;

    useEffect(() => {
        callbackFn()
            .then((response: any) => {
                const movies = response.map((item: any) => ({
                    posterPath: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }));
                setRatedImages(movies);
            });
    }, [callbackFn]);

    return (
        <View>
            <Carousel
                width={width}
                height={height / 1.2}
                data={ratedImages}
                autoPlay={true}
                autoPlayInterval={5000}
                onProgressChange={progress}
                vertical={true}
                renderItem={({ item } : any) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
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
    },
});

export default SeeMore;

