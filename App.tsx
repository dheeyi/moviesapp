import React from 'react';
import {
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Home from './src/screens/Home/Home.tsx';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={backgroundStyle}>
        <View>
            <Home />
        </View>
    </View>
  );
}

export default App;
