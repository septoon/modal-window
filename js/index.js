let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://static9.depositphotos.com/1011549/1208/i/950/depositphotos_12089121-stock-photo-green-apple-with-leaf.jpg'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://m.dom-eda.com/uploads/images/catalog/item/dfc9a3e974/3cbf3bd41c_1000.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://yesfrukt.com/storage/source/9f93a6908db208b5cf81fd540adc1ff5/product/1/7B2zZiW3DrZjuZPK4ZnI6xlgNBE0dk78.jpg'},
]

const toHTML = fruit => `
    <div class="col" id="${fruit.id}">
        <div class="card">
            <img style="height: 200;" src="${fruit.img}" class="card-img-top" alt="${fruit.title}">
            <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
            </div>
        </div>
    </div>
`

function render() {
    const html = fruits.map(toHTML/*fruit => toHTML(fruit)*/).join('')
    document.getElementById('fruits').innerHTML = html
}

render() 

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
            priceModal.close()
        }}
    ]
})

/*
const confirmModal = $.modal({
    title: 'Вы уверены?',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Отменить', type: 'secondary', handler() {
            confirmModal.close()
        }},
        {text: 'Удалить', type: 'danger', handler() {
            confirmModal.close()
        }}
    ]
})
*/

document.addEventListener('click', event=> {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)
    
    if (btnType === 'price') {
        priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => {
            console.log('Cancel')
        })
    }
})