import React from 'react';
import { View, Text, StyleSheet, Dimensions, WebView} from 'react-native';

const TitleCard = props => (
    <View style={styles.titleCard}>
        <Text style={{fontWeight:'bold'}}>{props.postTitle}</Text>
        <WebView
            source={{ html: props.postBody }}
            style={styles.webView}
        />
    </View>
);

const styles = StyleSheet.create({
    titleCard: {
        paddingLeft: 5,
        paddingRight: 5,
        margin: 5,
        paddingTop: 5,
        width: Dimensions.get('window').width - 5,
        backgroundColor: '#ff6600',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        height: Dimensions.get('window').height / 2,
    },
    webView: {
        width: Dimensions.get('window').width,
        backgroundColor: '#ff6600',
    }
});

export default TitleCard;