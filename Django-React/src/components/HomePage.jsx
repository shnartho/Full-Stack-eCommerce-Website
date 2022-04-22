import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { domain } from "../env"
import SingleProduct from './SingleProduct'

const HomePage = () => {
    const [products, setProducts] = useState(null)
    useEffect(() => {
        const getData = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/product/`
            }).then(response => {
                console.log(response.data);
                setProducts(response.data);
            })
        }
        getData()
    }, [])
    const nextpage = async () => {
        Axios({
            method: "get",
            url: products?.next
        }).then(res => {
            setProducts(res.data)
        })
    }
    const previouspage = async () => {
        Axios({
            method: "get",
            url: products?.previous
        }).then(res => {
            setProducts(res.data)
        })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-9">
                    <div className="row">
                        {
                            products !== null &&
                            products?.results.map((item, i) => (
                                <div key={i} className="col-md-4 my-1">
                                    <SingleProduct item={item} />
                                </div>
                            ))
                        }
                        <div className="homepage_pagination">
                            <div>
                                {
                                    products?.previous !==null ? (
                                        <button onClick={previouspage} className="btn btn-danger">previous</button>
                                    ):(
                                        <button className="btn btn-danger" disabled>previous</button>
                                    ) 
                                }
                            </div>
                            <div>
                                {
                                    products?.next !==null ? (
                                        <button onClick={nextpage} className="btn btn-success" >Next</button>
                                    ):(
                                        <button className="btn btn-success" disabled>Next</button>
                                    ) 
                                }
                            </div>
                        </div>

                    </div> 

                </div>

                <div className="col-md-3 bg-dark"></div>
            </div>

        </div>
    )
}

export default HomePage