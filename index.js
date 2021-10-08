import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';



class AutoComplete extends Component {
  static propTypes = {
    ...TextInput.propTypes,
    params: PropTypes.object.isRequired,
    route: PropTypes.string.isRequired,
    delay: PropTypes.number,
    minLength: PropTypes.number,    
    showButton: PropTypes.bool,
    onButtonPress: PropTypes.func,
    buttonColor: PropTypes.string,
    buttonTextColor: PropTypes.string,
    getDataAutocomplete: PropTypes.func.isRequired,
    purveyorPlaces: PropTypes.string.isRequired,
    refreshSessionDeflateSearch: PropTypes.string
  }

  static defaultProps = {
    delay: 1000,
    minLength: 4,
    showButton: false,
    buttonColor: '#6eb986',
    buttonTextColor: '#ffffff',
    onButtonPress: () => Alert.alert('pressable button'),
    placeholder: "Endereço e número"
  }

  constructor(props) {
    super(props);
    this.textInput = null;

    this.onRefTextInput = this.onRefTextInput.bind(this);

    this.state = {
      address: '',
      apiCount: 0,
      addressArray: [],
      isLoading: false,
      clicker: '',
      showAddresseList: false,
      uuidv4: this.uuidv4()
    }
  }


  componentDidMount() {
    const { delay } = this.props;
    this.debounceAutocomplete = debounce(this.handleAutoComplete.bind(this), delay);
  }

  ChangeShowAddresseList(value) {
    this.setState({showAddresseList: value});
  }

  setAddressText(value) {
    this.setState({address: value});
  }


  /**
   *
   * @param {string} address
   */
  handleTextInputChange(address) {   
    if (address.trim() != this.state.address.trim() && address.trim() != ' ' && address.trim().length >= this.props.minLength) {
      this.setState({ isLoading: true });
      this.debounceAutocomplete(address);      
      this.setState({ address });
      return;
    }
    this.setState({ address });

    if (address.length === 0)
    {
      if(this.props.refreshSessionDeflateSearch == true)
        this.setState({ uuidv4: this.uuidv4() });

      this.setState({ addressArray: [] });
    }
  }

  /**
   *
   * @param {Object} item
   * @param {string} item.address
   * @param {string} item.main_text
   * @param {string} iitem.secondary_text
   * @param {string} item.place_id
   * @param {string} item.latitude
   * @param {string} item.longitude
   */
  handleClick(item) {
    const { address, main_text, secondary_text, place_id, latitude, longitude } = item;
    this.setState({ address });

    this.props.getDataAutocomplete({
      main_text,
      secondary_text,
      place_id,
      latitude,
      longitude,
      clicker: this.state.clicker,
      sessionToken: this.state.uuidv4
    });

    this.setState({ uuidv4: this.uuidv4() });
  }

  /**
   *
   * @param {string} address
   */
  handleAutoComplete(address) {
    this.setState((state) => {
      return { apiCount: state.apiCount + 1, isLoading: true };
    });

    let placesParams = {
      ...this.props.params,
      place: address,
      count_api_calls: this.state.apiCount,
    }

    if(this.props.purveyorPlaces=='google_maps')
    {
      Object.assign(
        placesParams,
        { sessionToken: this.state.uuidv4 }
      );
    }

    axios.get(this.props.route, {
      params: placesParams
    })
      .then(response => {
        const result = response.data;
        this.setState((state) => {
          return { addressArray: result.data, isLoading: false, clicker: result.clicker, showAddresseList: true };
        });
      })
      .catch(error => {
        console.log("handleAutoComplete", error);
        this.setState({ isLoading: false });
      });
  }


  onRefTextInput(textInput) {
    this.textInput = textInput;
  }

  /**
   * Proxy `focus()` to autocomplete's text input.
   */
  focus() {
    const { textInput } = this;
    textInput && textInput.focus();
  }

  /**
   * Proxy `clear()` to autocomplete's text input.
   */
  clear() {
    if(this.props.refreshSessionDeflateSearch == true)
      this.setState({ uuidv4: this.uuidv4() });

    this.setState({ addressArray: [], address: '' });
    const { textInput } = this;
    return textInput && textInput.clear();
  }

  handleButtonPress() {
    this.props.onButtonPress();
    this.clear();
  }

  uuidv4()
  {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  render() {
    const { buttonColor, buttonTextColor, showButton } = this.props;

    return (
      <>
        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            {...this.props}
            value={this.state.address}
            onChangeText={(address) => this.handleTextInputChange(address)}
            ref={this.onRefTextInput}
            autoFocus
          />
          <View style={styles.areaIcons}>
            <ActivityIndicator animating={this.state.isLoading} />
            {!this.state.isLoading ? <Icon name="close" size={20} color="#777" onPress={() => this.clear()} /> : null}
          </View>
        </View>

        {showButton && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => this.handleButtonPress()}
            style={[styles.button, { backgroundColor: buttonColor }]}
          >
            <Text style={[styles.buttonText, { color: buttonTextColor }]}>OK</Text>
          </TouchableOpacity>
        )
        }
        {this.state.showAddresseList && (
        <FlatList
          contentContainerStyle={{ paddingBottom: 15, paddingHorizontal: 20 }}
          style={{ marginTop: 10 }}
          data={this.state.addressArray}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.handleClick(item)}
              activeOpacity={0.6}
              style={styles.item}
            >
              <Text>{item.address}</Text>
            </TouchableOpacity>

          )}
          />
          )
        }
      </>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#eee',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
    borderRadius: 4,
  },
  textInput: {
    flex: 5,
    marginLeft: 5,
  },
  button: {
    height: 50,
    width: 60,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginRight: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  areaIcons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginRight: 10,
  }
});

export default AutoComplete;
