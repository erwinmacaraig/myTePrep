const axios = require('axios');
const cds = require('@sap/cds'); 

module.exports = cds.service.impl(async function(){
    const { ExternalApi } = this.entities;
    console.log('Service Loaded');
    this.on('READ', ExternalApi, async(req) => {
        
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');            
            return response.data;
        } catch(error) {
            req.error(500, 'Failed to fetch external data')
        }
    })
});


// module.exports = cds.service.impl(function () {

//     console.log('Service loaded');

//     this.before('*', req => {
//         console.log('EVENT:', req.event);
//         console.log('TARGET:', req.target?.name);
//     });

//     this.on('READ', 'ExternalApi', async (req) => {

//         console.log('READ triggered');

//         const response = await axios.get(
//             'https://jsonplaceholder.typicode.com/posts'
//         );

//         console.log('Axios success');

//         return response.data;
//     });

// });