import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

import { getPopularMovies} from '../../utils/service/TMDBService';

const Home = () => {
    useEffect(() => {
        getPopularMovies()
            .then((data: any) => {
                console.log(data);
            });
    }, []);

    return (
      <View>
          <Text>Home component</Text>
      </View>
    );
};

export default Home;
