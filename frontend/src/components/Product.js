import React from 'react'
import {Link} from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Product = ({product}) => {
    return (
        <Card className="my-3 p-3 rouded">
            <Link to={`/product/${product._id}`}>
               <Card.Img src={product.image} variant="top"/>

            </Link>
        </Card>
    )
}

export default Product
