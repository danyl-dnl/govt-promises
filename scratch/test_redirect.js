const http = require('https');

const url = 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHAt3NZ7ye5fUtLDho4jG36hBGlR1d4wGNxW_W6Ve87IOcqILvosM19kxKEiaOeNLgCMx-KiOX__Bpn-qvUFyQmL7n3kXSXC04Trb6zXtzWOzmCXTXqo8lhwqNQdtZ-t8ZumR2OFVm7AkwLRk0gMIMb5HVqlg4Kh7k_ahuLixQr1TsXdO3KZ-laDf1RJMLskOxLAwdWtRv4v8Yr4ZTX6YsNzM90VVCjH2xDHNI5CfVBR0vbj72dBF0qsJwwXKy4M_k6kU4=';

http.get(url, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
}).on('error', (e) => {
  console.error(e);
});
