import React, { useState, useEffect, useRef } from 'react';
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
  Animated,
  Easing,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Card logos 
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
  const [activeField, setActiveField] = useState('');
  const flipAnimation = useRef(new Animated.Value(0)).current;

  // Dynamically determine card logo and format
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

  // Animation for card flipping
  useEffect(() => {
    Animated.timing(flipAnimation, {
      toValue: isCardFlipped ? 180 : 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [isCardFlipped]);

  const flipStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  // Format card number with placeholders
  const formatCardNumber = (number: string) => {
    const cleaned = number.replace(/\D+/g, '');
    if (cleaned.startsWith('34') || cleaned.startsWith('37')) {
      // Amex format: 4-6-5
      return cleaned.replace(/(\d{4})(\d{0,6})(\d{0,5})/, (match: any, p1: any, p2: any, p3: any) =>
        [p1, p2, p3].filter(Boolean).join(' ')
      );
    } else {
      // Default format: 4-4-4-4
      return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ').padEnd(19, '#');
    }
  };


  const handleCardNumberChange = (number: string) => {
    const cleaned = number.replace(/\D+/g, ''); // Remove all non-numeric characters
    let formattedNumber = '';
    
    if (cleaned.startsWith('34') || cleaned.startsWith('37')) {
      // Amex format: 4-6-5
      formattedNumber = cleaned.replace(/(\d{4})(\d{0,6})(\d{0,5})/, (match, p1, p2, p3) =>
        [p1, p2, p3].filter(Boolean).join(' ')
      );
      setCardNumber(formattedNumber);
    } else {
      // Default format: 4-4-4-4
      formattedNumber = cleaned.replace(/(\d{4})/g, '$1 ').trim();
      setCardNumber(formattedNumber);
    }
  };
  const formatCardDisplay = () => {
    const plainNumber = cardNumber.replace(/\s+/g, '');
    if (plainNumber.startsWith('34') || plainNumber.startsWith('37')) {
      // Amex format: 4-6-5
      return plainNumber
        .padEnd(15, '#') // Ensure Amex total 15 characters
        .replace(/(\d{4})(\d{0,6})(\d{0,5})/, (match, p1, p2, p3) =>
          [p1, p2, p3].filter(Boolean).join(' ')
        );
    } else {
      // Default 4-4-4-4 format
      return plainNumber
        .padEnd(16, '#') // Ensure total 16 characters
        .replace(/(\d{4})(?=\d)/g, '$1 ')
        .trim();
    }
  };

  const renderMonthPickerItems = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const month = (i + 1).toString().padStart(2, '0');
      return <Picker.Item key={month} label={month} value={month} />;
    });
  };

  const renderYearPickerItems = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Months are 0-based

    // Determine if the selected month affects year options
    const isCurrentMonthInPast = parseInt(expiryMonth, 10) < currentMonth;

    return Array.from({ length: 10 }, (_, i) => {
      const year = currentYear + i;

      // If the selected month is in the past, exclude the current year
      if (isCurrentMonthInPast && year === currentYear) {
        return null;
      }

      return <Picker.Item key={year} label={year.toString().slice(-2)} value={year.toString().slice(-2)} />;
    }).filter(Boolean); // Remove null values
  };

  // Validate expiry date
  const validateExpiryDate = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
  
    // Parse user input
    const fullExpiryYear = parseInt(`20${expiryYear}`, 10);
    const expiryMonthInt = parseInt(expiryMonth, 10);
  
    // Check if month and year are valid
    if (
      !expiryMonthInt || 
      expiryMonthInt < 1 || 
      expiryMonthInt > 12 || 
      !expiryYear || 
      expiryYear.length !== 2
    ) {
      return false; // Invalid month or year
    }
  
    // Validate against current date
    if (
      fullExpiryYear > currentYear || 
      (fullExpiryYear === currentYear && expiryMonthInt >= currentMonth)
    ) {
      return true; // Valid future date
    }
  
    return false; // Expired or invalid date
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
        <Animated.View style={[styles.card, flipStyle]}>
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
              <Text style={styles.cardNumber} accessibilityLabel={`Card number: ${formatCardDisplay()}`} accessibilityHint="Enter card number.">
                {formatCardDisplay()} 
              </Text>
              <View style={styles.cardDetails}>
                <Text style={styles.cardName} accessibilityLabel={`Cardholder name: ${cardName || 'Empty'}`} accessibilityHint="Enter cardholder name.">
                  {cardName || 'CARD HOLDER'}
                </Text>
                <Text style={styles.cardExpiry} accessibilityLabel={`Expiry date: ${expiryMonth || 'MM'}/${expiryYear || 'YY'}`} accessibilityHint="Select expiry date.">
                  {(expiryMonth || 'MM') + '/' + (expiryYear || 'YY')}
                </Text>
              </View>
            </ImageBackground>
          )}
        </Animated.View>

        {/* Form */}
        <View style={styles.form}>
          <TextInput
            style={[styles.input, activeField === 'cardNumber' && styles.activeInput]}
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={handleCardNumberChange}
            keyboardType="numeric"
            maxLength={maxCardLength}
            accessibilityLabel="Card number input"
            accessibilityHint="Input the card number."
            onFocus={() => setActiveField('cardNumber')}
            onBlur={() => setActiveField('')}
          />
          <TextInput
            style={[styles.input, activeField === 'cardName' && styles.activeInput]}
            placeholder="Card Name"
            value={cardName}
            onChangeText={(text) => setCardName(text.toUpperCase())}
            accessibilityLabel="Cardholder name input"
            accessibilityHint="Input the cardholder's name."
            onFocus={() => setActiveField('cardName')}
            onBlur={() => setActiveField('')}
          />
          <View style={styles.expiryCvvRow}>
            <View style={[styles.input, styles.expiryPicker, activeField === 'expiryMonth' && styles.activeInput]}>
              <Picker
                selectedValue={expiryMonth}
                onValueChange={(value) => {
                  setExpiryMonth(value);
                }}
                accessibilityLabel="Expiry month picker"
                accessibilityHint="Select expiry month."
                onFocus={() => setActiveField('expiryMonth')}
                onBlur={() => setActiveField('')}
              >
                <Picker.Item label="MM" value="" />
                {renderMonthPickerItems()}
              </Picker>
            </View>
            <View style={[styles.input, styles.expiryPicker, activeField === 'expiryYear' && styles.activeInput]}>
              <Picker
                selectedValue={expiryYear}
                onValueChange={(value) => {
                  setExpiryYear(value);
                }}
                accessibilityLabel="Expiry year picker"
                accessibilityHint="Select expiry year."
                onFocus={() => setActiveField('expiryYear')}
                onBlur={() => setActiveField('')}
              >
                <Picker.Item label="YY" value="" />
                {renderYearPickerItems()}
              </Picker>
            </View>
            <TextInput
              style={[styles.input, styles.cvvInput, activeField === 'cvv' && styles.activeInput]}
              placeholder="CVV"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              maxLength={3}
              onFocus={() => {
                setIsCardFlipped(true);
                setActiveField('cvv');
              }}
              onBlur={() => {
                setIsCardFlipped(false);
                setActiveField('');
              }}
              accessibilityLabel="CVV input"
              accessibilityHint="Input the card's CVV number."
            />
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              if (!validateExpiryDate()) {
                alert('Invalid expiry date.');
              } else {
                alert('Form submitted successfully.');
              }
            }}
            accessibilityLabel="Submit button"
            accessibilityHint="Submit the form."
          >
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
    transform: [{ scaleX: -1 }],
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
  activeInput: {
    borderColor: '#007AFF', 
    borderWidth: 2,
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
