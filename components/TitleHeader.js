import React from 'react';
import { getPostHeight } from '../utils'; 
import { View, Text, StyleSheet, Dimensions, WebView} from 'react-native';

const TitleCard = props => (
    <View style={getTitleHeight(props.postBody)}>
        <Text style={{fontWeight:'bold'}}>{props.postTitle}</Text>
        <WebView
            source={{ html: props.postBody }}
            style={styles.webView}
        />
    </View>
);


const getTitleHeight = post => {
    return {
        paddingLeft: 5,
        paddingRight: 5,
        margin: 5,
        paddingTop: 5,
        width: Dimensions.get('window').width - 20,
        backgroundColor: '#f6f6ef',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        height: getPostHeight(post) + 15,
    }
}


const styles = StyleSheet.create({
    titleCard: {
        paddingLeft: 5,
        paddingRight: 5,
        margin: 5,
        paddingTop: 5,
        width: Dimensions.get('window').width - 20,
        backgroundColor: '#f6f6ef',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        height: Dimensions.get('window').height / 2,
    },
    webView: {
        width: Dimensions.get('window').width - 20,
        backgroundColor: '#f6f6ef',
    }
});

export default TitleCard;