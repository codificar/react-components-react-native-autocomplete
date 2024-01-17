import {NativeModules, Platform} from 'react-native';


const deviceLanguage =
Platform.OS === 'ios'
? NativeModules.SettingsManager.settings.AppleLanguages[0]
: NativeModules.I18nManager.localeIdentifier;

let strings = "";

if(deviceLanguage == 'es_PY' || deviceLanguage.includes('es')){
  strings = require('./es-PY.json');
}else if(deviceLanguage == 'en_GB' || deviceLanguage.includes('en')){
  strings = require('./en_GB.json');
}else{
  strings = require('./pt_BR.json');
}

export default strings;
