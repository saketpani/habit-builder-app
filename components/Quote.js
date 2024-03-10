// I wrote this code

import { Text, View, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import appjson from '../env.json';

// A quote component to display a random inspirational quote. The  API url and API key is stored in env.json
// If the online API gives error, then a default offline quote is displayed.
const Quote = () => {

    const [quote, setQuote] = useState();

    // getQuote api call declaration
    const getQuote = async () => {

       const url = appjson.quoteUrl;
       //const url = "";
       fetch(url, {
            headers: {              
              'X-API-KEY': appjson.apikey,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then((result) => setQuote(result[0].quote + " - " +result[0].author))
            .catch((error) => console.log(error));                                
    };
    
    // get the quote on load
    useEffect(() => { getQuote(); }, []);

    if (quote == undefined) {
        return (
            <View style={styles.container}>
                <Text style={styles.quote}>
                    {'"Happiness is a habit—cultivate it." - Elbert Hubbard'}
                </Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.quote}>
                    "{quote}" 
                </Text>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        padding: 2,
        backgroundColor: '#96DED1',        
        marginTop: 2,
        margin: 10,
        borderRadius: 5
    },
    quote: {
        textAlign: 'center',
        padding: 2,
        marginVertical: 2,
        marginBottom: 2,                
        fontWeight: 600,
        color: "#4682B4"
    },
});

export default Quote;

// end of code I wrote