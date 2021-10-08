/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prefer-stateless-function */

import * as React from 'react';
import { TextInputProps } from 'react-native';

interface Address {
  mainText: string;
  secondaryText: string;
  placeID: string;
  latitude: number;
  longitude: number;
}

interface AutoCompleteProps extends TextInputProps {
  /**
   * function that captures the selected address by user
   * @typedef {Address} value
   * @param {string} mainText
   * @param {string} secondaryText
   * @param {string} placeID
   * @param {number} latitude
   * @param {number} longitude
   */
  getDataAutocomplete: (value: Address) => void;
  /**
   * autocomplete call timeout
   */
  delay?: number;

  /**
   * autocomplete call timeout
   */
  minLength?: number;

  /**
   * route for API request
   */
  route: string;

  /**
   * @default false
   */
  showButton?: boolean;

  /**
   * The button color of TouchableOpacity component.
   */
  buttonColor?: string;

  /**
   * The button text color of Text component.
   */
  buttonTextColor?: string;

  /**
   * @function ()=>navigation.navigate('AwesomeScreen');
   */
  onButtonPress?: any;

  /**
   * parameters to make the request in the API
   * @param {number} id | should be 'id' or 'user_id'
   * @param {string} token
   * @param {number} latitude
   * @param {longitude} longitude
   * @param {*} lang | language from settings. Exemple: 'pt-br'
   */
  params: any;

  purveyorPlaces: string;

  refreshSessionDeflateSearch: string;
}

export default class AutoComplete extends React.Component<
  AutoCompleteProps,
  any
> {}
