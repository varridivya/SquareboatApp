/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';


const ScreenTwo = ({ route }) => {
    console.log(route);
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: route.params.urlToImage }}
                style={styles.detailImageStyle}
            />
            <Text style={styles.heading}>Source: {route.params.source.name}</Text>
            <Text style={styles.detailstext}>{route.params.description}</Text>
            <Text style={styles.detailstext}>{route.params.content}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(route.params.url)}>
                <Text style={styles.linkText}>See Full Story ></Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: { padding: 10, fontSize: 18 },
    detailstext: { padding: 10, fontSize: 18, fontWeight: '500' },
    linkText: { padding: 10, color: '#0C54BE', fontSize: 18 },
    detailImageStyle: { width: 420, height: 220, borderRadius: 5 },

});
export default ScreenTwo;
