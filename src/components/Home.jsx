import { useState, useContext } from 'react'
import ProductDetail from './ProductDetail'
import { Context } from '../context/ProductContext'


function Home() {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [market, setMarket] = useState('All')
    const [error, setError] = useState(null)
    const [data, setData] = useContext(Context)
    // const [data, setData] = useState(null)
    //const [product,setProduct] = useState(null)

    const createProduct = async (e) => {
        e.preventDefault()
        const product = { name, price, category, market }
        // console.log(product)
        const response = await fetch('http://localhost:4000/api/products', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError(null)
            setData(data => [...data, json]);
            setName(''); setPrice(0); setCategory(''); setMarket('All')
            console.log(data)
            console.log('product is added', json)
        }

    }
//<input type='text' onChange={(e) => setMarket(e.target.value)} value={market} placeholder='enter product supermarket' />

    /*
     useEffect(() => {
         fetch('http://localhost:4000/api/products')
             .then(res => res.json())
             .then(res => setData(res))
 
         //console.log(data)
 
     }, [])*/
    //console.log(data)
    return (
        <div className="home">
            <div className='product-info'>
                {data && data.map((product) => (

                    <ProductDetail key={product._id} product={product} error={error} />
                ))}

            </div>
            <form className='home-form' onSubmit={createProduct}>

                <input type='text' onChange={(e) => setName(e.target.value)} value={name} placeholder='enter product name' />

                <input type='number' onChange={(e) => setPrice(e.target.value)} value={price} placeholder='enter product price' />

                <input type='text' onChange={(e) => setCategory(e.target.value)} value={category} placeholder='enter product category' />

                <label for="markets">Choose a Market:</label>
                <select name="markets" id="markets" value={market} onChange={(e)=>setMarket(e.target.value)}>
                    <option value="Aldi">Aldi</option>
                    <option value="Rewe">Rewe</option>
                    <option value="Lidl">Lidl</option>
                    <option value="Netto">Netto</option>
                    <option value="Penny">Penny</option>
                    <option value="Kaufland">Kaufland</option>
                    <option value="Amazon">Amazon</option>
                    <option value="All">All</option>
                </select>

                <button>add</button>

            </form>
        </div>
    );
}

export default Home;