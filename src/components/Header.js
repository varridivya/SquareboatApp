/* eslint-disable prettier/prettier */
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import location from '../icons/location.jpg';
import BottomSheet from 'react-native-simple-bottom-sheet';
import ScreenOne from '../screens/ScreenOne';
import RadioButton from '../components/RadioButton';

const Header = ({ navigation }) => {
    const [news, setNews] = useState([]);
    const locations = [
        { id: '1', name: 'India', selected: false },
        { id: '2', name: 'USA', selected: false },
        { id: '3', name: 'Sri Lanka', selected: false },
        { id: '4', name: 'london', selected: false },
        { id: '5', name: 'Nepal', selected: false },
    ];
    let selectedItems;
    const [isLiked, setIsLiked] = useState(locations);
    const locationRef = useRef(null);

    const onRadioBtnClick = (item) => {
        const updatedState = isLiked.map((isLikedItem) =>
            isLikedItem.id === item.id
                ? { ...isLikedItem, selected: true }
                : { ...isLikedItem, selected: false }

        );
        setIsLiked(updatedState);

    };

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=cc8173b7330d49569ce9e8d1ffc28b07')
            .then(response => response.json())
            .then(json => {
                setNews(json.articles);
            })
            .catch(error => {
                console.log(error);
            });

    };

    let selectedItem = isLiked.find(e => e.selected == true);
    selectedItems = selectedItem ? selectedItem.name : isLiked[0].name;

    return (
        <View style={{ flex: 1 }}>
            <BottomSheet
                ref={ref => locationRef.current = ref}
                sliderMinHeight={0}
                isOpen={false}
                wrapperStyle={{ zIndex: 1 }}
            >
                <Text style={styles.bottomSheetText}>
                    Choose your Location
                </Text>
                <ScrollView>
                    {isLiked.map((item) => (
                        <RadioButton
                            onPress={() => onRadioBtnClick(item)}
                            selected={item.selected}
                            key={item.id}
                        >
                            <Text style={{ padding: 10 }}>{item.name}</Text>
                        </RadioButton>
                    ))}

                </ScrollView>
                <TouchableOpacity style={styles.appButtonContainer} onPress={() => alert('Location has been successfully selected')}>
                    <Text style={styles.appButtonText}>Apply</Text>
                </TouchableOpacity>


            </BottomSheet>
            <View style={styles.container}>

                <Text style={styles.headingStyle}>My News</Text>
                <TouchableOpacity onPress={() => locationRef.current.togglePanel()}>
                    <Text style={styles.textStyle}>LOCATION</Text>

                    <View style={styles.locationStyle}>
                        <Image
                            source={location}
                            style={styles.imageStyle}
                        />

                        <Text style={styles.locationText}>{selectedItems}</Text>
                    </View>

                </TouchableOpacity>
            </View>
            <ScreenOne onPress={() => news.map(item => (navigation.navigate('Details', item)))} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: { justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#0C54BE', padding: 15, alignItems: 'flex-end' },
    imageStyle: { width: 15, height: 18, borderRadius: 10 },
    textStyle: { fontSize: 16, color: 'white' },
    headingStyle: { fontSize: 20, color: 'white' },
    locationStyle: { flexDirection: 'row', justifyContent: 'space-around' },
    appButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
    },
    appButtonContainer: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 8,
        marginVertical: 10,
        backgroundColor: '#0C54BE',
        marginHorizontal: '20%'
    },
    bottomSheetText: { paddingVertical: 20, fontSize: 18 },
    locationText: { color: 'white', fontSize: 16, paddingLeft: 5 },
});
export default Header;
