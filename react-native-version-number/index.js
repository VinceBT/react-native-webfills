// Add these lines to your <head>
// <meta name="version" content="1.0">
// <meta name="build" content="1">

const versionTag = (document && document.querySelector && document.querySelector('meta[name=version]')) || null;
const buildTag = (document && document.querySelector && document.querySelector('meta[name=build]')) || null;

console.log(versionTag, buildTag)

export const appVersion = (versionTag && versionTag.getAttribute('content')) || '';
export const buildVersion = (buildTag && buildTag.getAttribute('content')) || '';

const VersionNumber = {
  appVersion,
  buildVersion,
};

export default VersionNumber;
