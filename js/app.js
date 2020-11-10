// const button = document.getElementById('btn')

// button.addEventListener('click', () => {
//     alert('Сайт не работат!')
// })

console.log('Request data...')

// setTimeout(() => {
//     console.log('Prepearing data...')

//     const backendData = {
//         server: 'aws',
//         port: 3000,
//         status: 'working'
//     }

//     setTimeout(() => {
//         backendData.modified = true
//         console.log('Data received ', backendData)
//     }, 2000)
// }, 2000)

const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Prepearing data...')
        
        const backendData = {
            server: 'aws',
            port: 3000,
            status: 'working'
        }
        resolve(backendData)
    }, 2000)
})

prom.then(data => {
    // console.log('Promise resolved',  data)
    return newProm = new Promise((resolve, reject) => {
        setTimeout(() => {
            data.modified = true
            resolve(data)
        }, 2000)
    })

    // newProm.then(clientData => {
    //     console.log('Data received', clientData)
    // })
}).then(clientData => {
    clientInformation.fromPromise = true
    return clientData
}).then(data => {
    console.log('Modified data', data)
}).catch(err => console.log('Error ', err))
.finally(() => {
    console.log('Finally')
})
 
const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms)
    })
}

// sleep(1000).then(() => console.log('After 1 sec...'))
// sleep(2000).then(() => console.log('After 2 sec...'))
// sleep(3000).then(() => console.log('After 3 sec...'))

Promise.race([sleep(2000), sleep(4000)]).then(() => console.log('Race promises'))

Promise.all([sleep(2000), sleep(4000)]).then(() => console.log('All promises'))
