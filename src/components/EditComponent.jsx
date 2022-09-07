import {useState} from 'react'
import {useLocation} from 'react-router-dom'

function EditComponent() {
    const location = useLocation()
    const product = location.state
    console.log(product)
    console.log(product.name)
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);                  
    const [category, setCategory] =  useState(product.category);        
    const [market, setMarket] = useState(product.market) ;               
   // const[change,setChange] = useState(product)

    const editFunction = async (e) => {
       e.preventDefault();
       const updatedProduct = {name,price,category,market}
      
      // const updatedField = change
      if(updatedProduct!==product){
        const response = await fetch('http://localhost:4000/api/products/' + product._id, {
            method:'PATCH',
            body: JSON.stringify(updatedProduct),
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
        })
            const json = await response.json();
            if (!response.ok) {
                console.log('didnt work')
            }
            if (response.ok) {
              
                console.log('product has been updated', json)
            }
        }
    }
    return (

        <form className='edit-form' onSubmit={editFunction}>
            <h3>Click on the column that you want to Update </h3>
            <input type='text' onChange={(e) => setName(e.target.value)} value={name}/>

            <input type='number' onChange={(e) => setPrice(e.target.value)} value={price} />

            <input type='text' onChange={(e) => setCategory(e.target.value)} value={category} />

            <input type='text' onChange={(e) => setMarket(e.target.value)} value={market}/>

            <button>Update Product</button>

        </form>

    );
}

export default EditComponent;