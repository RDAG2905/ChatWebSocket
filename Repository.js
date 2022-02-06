
class Repository{

    constructor(){
        this.primerId = 1  
        this.productos = [
            {
            title: 'Escuadra',
            price: 123.45,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
            id: 1
            },
            {
            title: 'Calculadora',
            price: 234.56,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
            id: 2
            },
            {
            title: 'Globo Terráqueo',
            price: 345.67,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
            id: 3
            }
        ] 
        
    }
   
   
    getProducts = ()=> this.productos
     

    getProductById(idProducto){
        let producto = this.productos.find(pr => pr.id == idProducto) 
        return producto   
    }

    saveProduct(producto){
        if (this.productos.length == 0){
            producto.id = primerId
         }else{
             let ids = this.productos.map(p=>p.id)            
             let maxId = Math.max(...ids)
             producto.id = maxId + 1
         }
         this.productos.push(producto) 
         return this.productos.find(x => x.id == producto.id )
    }


    editarProducto(producto,idBuscado){     
        let product = this.productos.find(p=>p.id==idBuscado)    
        
        if(product){
            product.title = producto.title
            product.price = producto.price
            product.thumbnail = producto.thumbnail
            return product
        }
        return null
       
    }


    eliminarProducto(id){
        let existe = this.productos.find( pr => pr.id == id)
        if(!existe){
            return null
        }else{
            this.productos = this.productos.filter(prd => prd.id != id)
            return existe
        }
        
    }
}

module.exports = Repository
 