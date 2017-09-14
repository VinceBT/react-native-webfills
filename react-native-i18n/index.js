// @flow

const I18nJs = require('i18n-js');

I18nJs.locale = navigator.languages ? navigator.languages[0] : 'en';
export const getLanguages = async () => navigator.languages;
export default I18nJs;