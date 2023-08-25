const localHost = "localhost";
console.log(process.env.REACT_APP_NODE_ENV);
const localHostBaseEndpoint = (process.env.REACT_APP_NODE_ENV === "uat") ? process.env.REACT_APP_NODEUATURL :(process.env.REACT_APP_NODE_ENV === "development") ? process.env.REACT_APP_NODELOCALURL : process.env.REACT_APP_NODEPRODURL;
export const assestURL = (process.env.REACT_APP_NODE_ENV === "uat") ? process.env.REACT_APP_NODEUATASSETURL :(process.env.REACT_APP_NODE_ENV === "development") ? process.env.REACT_APP_NODELOCALASSETURL : process.env.REACT_APP_NODEPRODASSETURL;
export const secretKey = process.env.REACT_APP_SECRETKEY
export const DateFormat = (process.env.REACT_APP_DATEFORMAT) ? process.env.REACT_APP_DATEFORMAT : 'MM/DD/YYYY';
export const DateTimeFormat = (process.env.REACT_APP_DATETIMEFORMAT) ? process.env.REACT_APP_DATETIMEFORMAT : 'MM/DD/YYYY hh:mm:ss A';

export const getBaseEndpointUrl = () => {
  return localHostBaseEndpoint;
};

function getHostURL(hostName) {
  if (hostName.includes(localHost)) {
    return localHostBaseEndpoint;
  }
}
