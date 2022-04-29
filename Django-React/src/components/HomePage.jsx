import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { domain } from "../env"
import { Link } from 'react-router-dom'
import SingleProduct from './SingleProduct'

const HomePage = () => {
    const [products, setProducts] = useState(null)
    const [category, setCategory] = useState(null)
    useEffect(() => {
        const getData = async() => {
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
    useEffect(()=>{
        const getcategories = async() => {
            await Axios({
                method:"get",
                url:`${domain}/api/category/`
            }).then(response =>{
                console.log(response.data);
                setCategory(response.data);
            })

        }
        getcategories()
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
                                        <button onClick={nextpage} className="btn btn-success">Next</button>
                                    ):(
                                        <button className="btn btn-success" disabled>Next</button>
                                    ) 
                                }
                            </div>
                        </div>

                    </div> 

                </div>

                <div className="col-md-3">
                    <h1>All Categories</h1>
                    {
                        category !== null && 
                        category?.map((category, i)=>(
                            <div className="my-2" key={i}>
                                <Link to={`/category/${category?.id}`} className="btn btn-success">{category?.title}</Link>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default HomePage