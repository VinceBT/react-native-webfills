// Add these lines to your <head>
// <meta name="version" content="1.0">
// <meta name="build" content="1">

export const appVersion = (document && document.querySelector && document.querySelector('meta[name=version]')) || '';
export const buildVersion = (document && document.querySelector && document.querySelector('meta[name=build]')) || '';

const VersionNumber = {
  appVersion,
  buildVersion,
};

export default VersionNumber;
