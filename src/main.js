const express = require('express');
const handlebars = require('express-handlebars')
const Apiproductos = require('../api/container');
const productosApi = new Apiproductos();


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");


app.post('/productos',(req,res)=>{
    const producto = req.body //no se entiende el funcionamiento por completo.
    productosApi.save(producto)
    res.redirect('/')
});
app.get('/productos',(req,res)=>{
    const prod = productosApi.getAll()

    res.render("vistas",{
        productos: prod,
        hayProductos: prod.length
    });
});

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto: ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

