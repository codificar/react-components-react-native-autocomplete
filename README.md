# react-native-autocomplete
Componente para busca de API Places.

## Install
add in package.json:
```bash
"react-native-autocomplete": "git+https://libs:ofImhksJ@git.codificar.com.br/react-components/react-native-autocomplete.git",
```

execute the command:
```bash
$ yarn
or
$ npm install 
```

## Basic Usage

```javascript
import React from 'react';
import PlacesAutoComplete from "react-native-autocomplete";

 

 <PlacesAutoComplete
    getDataAutocomplete={value => setData(value)}
    route="https://dev2.motoristaprivado.com.br/api/v3/geolocationget_address_string"
    params={{ id, token, latitude, longitude,lang }}
    //or params={{user_id, token, latitude, longitude,lang}}
  />


```

## Advanced Usage

```javascript
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container } from './styles';
import PlacesAutoComplete from "react-native-autocomplete";

 

 const SetAddressScreen: React.FC = () => {
  const navigation = useNavigation();

  const [data, setData] = useState<Data>();
  const latitude = -21.0638098;
  const longitude = -41.3657637;
  const id = 2;
  const token = '2y10bmJY8dr2P5ooRpOrZSbARefXMZujf3nvjxd5ac5tHgJwRfi6iFG';

  useEffect(() => {
    console.log('Address Data', data);
  }, [data]);

  return (
    <Container>
      <PlacesAutoComplete
        placeholder="Endereço e número"
        placeholderTextColor="gray"
        showButton
        buttonColor="red"
        buttonTextColor="white"
        delay={1500}
        onButtonPress={() => navigation.navigate('MainScreen')}
        getDataAutocomplete={value => setData(value)}
        route="https://dev2.motoristaprivado.com.br/api/v3/geolocation/get_address_string"
        params={{ id, token, latitude, longitude, lang: 'pt-br' }}
      />
    </Container>
  );
};


```

## Properties

| Prop  | Default  | Type | isRequired | Description
| :------------ |:---------------:| :---------------:|:---------------:|--
| delay | 1000 | `number` |  | miliseconds before searching. |
| showButton | false | `boolean` |  | render button. |
| buttonColor | '#6eb986' | `string` |  | the button color of TouchableOpacity component. |
| buttonTextColor | '#FFFFFF' | `string` |  | the text color of Text component. |
| onButtonPress | '#FFFFFF' | `() => Alert.alert('pressable button')` |  | if `showButton:true`, then you should be set this funcion. Exemple:<br> `()=>navigation.navigate('AwesomeScreen')`; or `()=>navigation.goBack()`; |
| route | '' | `string` | ✔️ | route for API request. |
| params | - | `object` | ✔️ | parameters to make the request in the API. |
| getDataAutocomplete | - | `function` | ✔️ | function that captures the selected address by user |
| [TextInputProps](https://reactnative.dev/docs/textinput#docsNav) | - | `function` |  |  All TextInput properties|