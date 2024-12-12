import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Card logos (replace these with your assets)
import visaLogo from '../assets/images/visa.png';
import amexLogo from '../assets/images/amex.png';
import mastercardLogo from '../assets/images/mastercard.png';
import discoverLogo from '../assets/images/discover.png';
import troyLogo from '../assets/images/troy.png';
import chipImage from '../assets/images/chip.png';

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [cardLogo, setCardLogo] = useState(visaLogo);
  const [maxCardLength, setMaxCardLength] = useState(16);

  const getCardLogo = (number: string) => {
    const plainNumber = number.replace(/\s+/g, ''); 
    if (plainNumber.startsWith('4')) return visaLogo;
    if (plainNumber.startsWith('34') || plainNumber.startsWith('37')) return amexLogo;
    if (plainNumber.startsWith('5')) return mastercardLogo;
    if (plainNumber.startsWith('6')) return discoverLogo;
    if (plainNumber.startsWith('9792')) return troyLogo;
    return visaLogo;
  };

  useEffect(() => {
    const plainNumber = cardNumber.replace(/\s+/g, '');
    setCardLogo(getCardLogo(plainNumber));

    if (plainNumber.startsWith('34') || plainNumber.startsWith('37')) {
      setMaxCardLength(17);
    } else {
      setMaxCardLength(19);
    }
  }, [cardNumber]);

  const formatCardNumber = (number: string) => {
    const cleaned = number.replace(/\D+/g, '');
    if (cleaned.startsWith('34') || cleaned.startsWith('37')) {
      // Amex format: 4-6-5
      return cleaned.replace(/(\d{4})(\d{0,6})(\d{0,5})/, (match: any, p1: any, p2: any, p3: any) =>
        [p1, p2, p3].filter(Boolean).join(' ')
      );
    } else {
      // Default format: 4-4-4-4
      return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    }
  };

  const handleCardNumberChange = (number: any) => {
    const formattedNumber = formatCardNumber(number);
    setCardNumber(formattedNumber);
  };

  const renderMonthPickerItems = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const month = (i + 1).toString().padStart(2, '0');
      return <Picker.Item key={month} label={month} value={month} />;
    });
  };

  const renderYearPickerItems = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => {
      const year = (currentYear + i).toString().slice(-2);
      return <Picker.Item key={year} label={year} value={year} />;
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Credit Card */}
        <View style={styles.card}>
          {isCardFlipped ? (
            <ImageBackground
              source={require('../assets/images/6.jpeg')}
              style={styles.cardBackground}
            >
              <View style={styles.cardBack}>
                <View style={styles.cvvContainer}>
                  <Text style={styles.cvvLabel}>CVV</Text>
                  <Text style={styles.cvvText}>{cvv || '***'}</Text>
                </View>
              </View>
            </ImageBackground>
          ) : (
            <ImageBackground
              source={require('../assets/images/6.jpeg')}
              style={styles.cardBackground}
            >
              <Image source={chipImage} style={styles.chip} />
              <Image source={cardLogo} style={styles.cardLogo} />
              <Text style={styles.cardNumber}>
                {cardNumber || '#### #### #### ####'}
              </Text>
              <View style={styles.cardDetails}>
                <Text style={styles.cardName}>{cardName || 'CARD HOLDER'}</Text>
                <Text style={styles.cardExpiry}>
                  {(expiryMonth || 'MM') + '/' + (expiryYear || 'YY')}
                </Text>
              </View>
            </ImageBackground>
          )}
        </View>

        {/* Form */}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={handleCardNumberChange}
            keyboardType="numeric"
            maxLength={maxCardLength}
          />
          <TextInput
            style={styles.input}
            placeholder="Card Name"
            value={cardName}
            onChangeText={(text) => setCardName(text.toUpperCase())}
          />
          <View style={styles.expiryCvvRow}>
            <View style={[styles.input, styles.expiryPicker]}>
              <Picker
                selectedValue={expiryMonth}
                onValueChange={(value) => {
                  setExpiryMonth(value);
                }}
              >
                <Picker.Item label="MM" value="" />
                {renderMonthPickerItems()}
              </Picker>
              {expiryMonth && (
                <Text style={styles.expiryInputText}>{expiryMonth}</Text>
              )}
            </View>
            <View style={[styles.input, styles.expiryPicker]}>
              <Picker
                selectedValue={expiryYear}
                onValueChange={(value) => {
                  setExpiryYear(value);
                }}
              >
                <Picker.Item label="YY" value="" />
                {renderYearPickerItems()}
              </Picker>
              {expiryYear && (
                <Text style={styles.expiryInputText}>{expiryYear}</Text>
              )}
            </View>
            <TextInput
              style={[styles.input, styles.cvvInput]}
              placeholder="CVV"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              maxLength={3}
              onFocus={() => setIsCardFlipped(true)}
              onBlur={() => setIsCardFlipped(false)}
            />
          </View>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#D3D3D3', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '90%',
    maxWidth: 350,
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: -50, // Slight overlap with the form
    zIndex: 1, // Ensures the card appears above the form
  },
  cardBackground: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  chip: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
  },
  cardLogo: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 2,
    marginBottom: 20,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardName: {
    color: '#fff',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  cardExpiry: {
    color: '#fff',
    fontSize: 14,
  },
  cardBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cvvContainer: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cvvLabel: {
    fontSize: 12,
    color: '#555',
  },
  cvvText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    paddingTop: 80, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    zIndex: 0,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
  },
  expiryCvvRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expiryPicker: {
    flex: 1,
    marginHorizontal: 5,
    height: 50,
    justifyContent: 'center',
  },
  cvvInput: {
    width: '35%',
  },
  submitButton: {
    backgroundColor: '#0056ff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  expiryInputText: {
    position: 'absolute',
    top: 15,
    left: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default CreditCardForm;
