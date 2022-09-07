import EditComponent from "./EditComponent";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Context} from '../context/ProductContext'
import { useContext } from "react";

function ProductDetail({ product }) {

    const [data,setData] = useContext(Context)
    const navigate = useNavigate();
    const navigateToEditComponent = () => {
        // the second argument is the state object that will hold the props that will be passed to the SingleRecipe component
        navigate('/editComponent', { state: product })
    }

    const deleteProduct = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/api/products/' + product._id, {
            method: 'DELETE',

        })
        const json = await response.json();
        if (!response.ok) {
            console.log('didnt work')
        }
        if (response.ok) {
            // this here to update the state and remove the deleted product from the page without the need to refresh it 
            const newData = data.filter(product => product._id !== json._id)
            setData(newData)
            console.log('product has been deleted', json)
            console.log('the new set of data', newData)
        }
    }


    return (
        <div className="card" >
            <div className="card-left">
            <label>Product</label>
            <p>{product.name}</p>
            <label>Product price</label>
            <p>&euro;{product.price}</p>
            <label>Product category</label>
            <p>{product.category}</p>
            </div>
            <div className="card-right">
                <div> <img src={`../img/${product.market}.png` || `../img/${product.market}.jpg`} alt={product.market} width='120px' height='120px'></img></div>
           
            <div className="btns"><button onClick={navigateToEditComponent}>edit</button>
            <button onClick={deleteProduct}>delete</button></div>
            
            
            </div>
           


        </div>
    );
}

export default ProductDetail;