import { Platform } from 'react-native'

 // Production
let baseURL = 'https://e-shopping1.herokuapp.com/api/v1/';

// Development
// let baseURL = '';
// {Platform.OS == 'android'
// ? baseURL = 'http://10.0.2.2:3000/api/v1/'
// : baseURL = 'http://localhost:3000/api/v1/'
// }

export default baseURL;