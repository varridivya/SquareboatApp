/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    SafeAreaView,
} from 'react-native';
import { SearchBar, CheckBox } from 'react-native-elements';
import filterBlue from '../icons/filterBlue.png';
import NetInfo from '@react-native-community/netinfo';
import BottomSheet from 'react-native-simple-bottom-sheet';


export default function ScreenOne({ onPress }) {
    const [news, setNews] = useState([]);

    const panelRef = useRef(null);
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [isOffline, setOfflineStatus] = useState(false);

    const obj = [...new Map(news.map(item => [JSON.stringify(item.source.name), item])).values()];
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            setOfflineStatus(offline);
        });
        fetchData();
        return () => removeNetInfoSubscription();
    }, []);

    const fetchData = () => {
        fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=cc8173b7330d49569ce9e8d1ffc28b07')
            .then(response => response.json())
            .then(json => {
                setNews(json.articles);
                setFilteredDataSource(json.articles);
                setMasterDataSource(json.articles);
            })
            .catch(error => {
                console.log(error);
            });

    };

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.title
                    ? item.title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };



    const Button = ({ children, ...props }) => (
        <TouchableOpacity style={styles.button} {...props}>
            <Text style={styles.appButtonContainer}>{children}</Text>
        </TouchableOpacity>
    );

    const NoInternetModal = ({ show, onRetry, isRetrying }) => (
        <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Connection Error</Text>
            <Text style={styles.modalText}>
                Oops! Looks like your device is not connected to the Internet.
            </Text>
            <Button onPress={onRetry} disabled={isRetrying} style={{ color: 'white' }}>
                Try Again
            </Button>
        </View>
    );

    const onChecked = (event) => {
        setChecked({ ...checked, [event.target.name]: event.target.checked });
        console.log('checkes', checked);
    };

    return (

        <SafeAreaView style={styles.safeAreaViewStyle}>

            {isOffline ? <View style={styles.rootViewStyle}>
                <NoInternetModal
                    show={isOffline}
                    onRetry={fetchData}
                    isRetrying={false}
                />
            </View> :
                <View style={styles.container}>
                    <View>
                        <SearchBar
                            round
                            clearButtonMode="always"
                            containerStyle={styles.searchContainerStyle}
                            inputContainerStyle={styles.inputContainerStyle}
                            placeholder='Search here ...'
                            onChangeText={(text) => searchFilterFunction(text)}
                            onClear={(text) => searchFilterFunction('')}
                            value={search}
                        />
                    </View>
                    <View style={{ paddingTop: '10%' }}>
                        <Text style={styles.textStyle}>Top HeadLines</Text>
                    </View>
                    {filteredDataSource.length === 0 ? <View style={styles.notFound}><Text>No results Found</Text></View> :
                        <ScrollView>
                            {filteredDataSource.map(item => (
                                < View key={item.key} style={styles.cardStyle} >
                                    <View style={styles.viewStyle}>
                                        <View style={styles.viewStyle1}>
                                            <TouchableOpacity
                                                onPress={onPress}>
                                                <Text style={styles.item}>Source: {item.source.name}</Text>
                                                <Text numberOfLines={5} style={styles.item}>{item.title}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Image
                                            source={{ uri: item.urlToImage }}
                                            style={styles.imageStyle}
                                        />

                                    </View>
                                </View>
                            ))}

                        </ScrollView>

                    }
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => panelRef.current.togglePanel()}
                        style={styles.touchableOpacityStyle}>
                        <Image
                            source={filterBlue}
                            style={styles.floatingButtonStyle}
                        />
                    </TouchableOpacity>
                    <BottomSheet ref={ref => panelRef.current = ref} sliderMinHeight={0} isOpen={false}>
                        <Text style={styles.bottomSheet}>
                            Filter by sources
                        </Text>

                        <ScrollView>
                            {obj.map(item => (
                                <CheckBox
                                    title={item.source.name}
                                    containerStyle={styles.checkBoxStyle}
                                    checked={checked}
                                    onPress={onChecked}
                                />


                            ))}
                        </ScrollView>

                        <TouchableOpacity style={styles.appButtonContainer} onPress={() => checked ? alert('News Sourceshas been selected successfully') : alert('No filter is selected')}>
                            <Text style={styles.appButtonText}>Apply</Text>
                        </TouchableOpacity>

                    </BottomSheet>
                </View >
            }

        </SafeAreaView >

    );
}

const styles = StyleSheet.create({
    safeAreaViewStyle: { flex: 1 },
    rootViewStyle: { flex: 1 },
    container: {
        flex: 1,
    },
    item: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5,
        flexWrap: 'wrap',
    },
    cardStyle: {
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 5,
        flexShrink: 1,
        height: 200,
        padding: 20,

    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        zIndex: 1,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: '50%',
        paddingBottom: 40,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '600',
    },
    modalText: {
        fontSize: 18,
        color: '#555',
        marginTop: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
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
        marginHorizontal: '20%',
        color: 'white',

    },
    viewStyle: { flexDirection: 'row', justifyContent: 'space-between' },
    viewStyle1: { flex: 1, flexWrap: 'wrap' },
    imageStyle: { width: 120, height: 120, borderRadius: 5 },
    textStyle: { fontSize: 20, fontWeight: 'bold', marginLeft: 10, paddingBottom: 10 },
    searchContainerStyle: { backgroundColor: 'white', borderWidth: 1, borderRadius: 20, marginHorizontal: 20, height: 45, marginTop: 10 },
    inputContainerStyle: { backgroundColor: 'white', height: 30 },
    bottomSheet: { paddingVertical: 20, fontSize: 16, fontWeight: '900' },
    checkBoxStyle: {
        borderWidth: 0,
        width: 300,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 0,
    },
    notFound: { alignItems: 'center', flex: 1 },


});
