import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {domain} from "../env"
import SingleProduct from './SingleProduct'

const ProductsDetails = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    useEffect(()=>{
        const getData = async() =>{
            await Axios({
                method:"get",
                url:`${domain}/api/product/${id}/`
            }).then(response=>{
                console.log(response.data);
                setProduct(response.data);
            })
        }
        getData()
    },[])
  return (
    <div className="container">
        {
            product !== null && (
                <div className="row">
                  
                    <img src={product?.image} className="centerimg"/>
                  
                    <div className="col-md-7">
                        <h1>{product?.title}</h1>
                        <h2>Price: <del>{product?.marcket_price}$</del> {product?.selling_price}$</h2>

                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-info">Add to Cart</button>
                    </div>
                    <p>{product?.description}</p>
                </div>
            )
        }
    </div>
  )
}

export default ProductsDetails

