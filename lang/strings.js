import {NativeModules, Platform} from 'react-native';

let strings = '';

const deviceLanguage =
	Platform.OS === 'ios'
		? NativeModules.SettingsManager.settings.AppleLanguages[0]
		: NativeModules.I18nManager.localeIdentifier;

  if(deviceLanguage === 'pt_BR'){
    strings = require('./pt_BR.json');
  } else if(deviceLanguage == 'es_PY' || 'es-PY'){
    strings = require('./es-PY.json');
  }

export default strings;
