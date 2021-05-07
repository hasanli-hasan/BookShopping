import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import{Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';


const ProductScreen = ({match}) => {
     
    const [product, setProduct] =useState([]);

    useEffect(()=>{

     const fetchProducts = async () =>{
         const {data} = await axios.get(`/api/products/${match.params.id}`)
          setProduct(data);
          console.log('salam')
     };

     fetchProducts();

    },[match])

    return (
        <>
          <Link className="btn btn-dark my-3" to='/'>
              Go Back
          </Link>
          <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} style={{width:"220px"}}/>
              </Col>
              <Col md={3}>
                 <ListGroup>
                     <ListGroup.Item>
                     <h1>{product.name}</h1>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         Price: {product.price}
                     </ListGroup.Item>
                     <ListGroup.Item>
                         Price: {product.description}
                     </ListGroup.Item>
                 </ListGroup>
                  </Col>
                  <Col md={3}>
                     <Card>
                         <ListGroup>
                             <ListGroup.Item>
                                 <Row>
                                     <Col>
                                     Price:
                                     </Col>
                                     <Col>
                                     <strong>{product.price}</strong>
                                     </Col>
                                 </Row>
                             </ListGroup.Item>

                             <ListGroup.Item>
                                 <Row>
                                     <Col>
                                     Status:
                                     </Col>
                                     <Col>
                                     {product.countInStock>0 ? 'In stock' :'Tukendi'}
                                     </Col>
                                 </Row>
                             </ListGroup.Item>

                             <ListGroup.Item>
                                 <Button className="btn-block" type='button'
                                  disabled ={product.countInStock === 0}
                                 >
                                     Add To Cart
                                 </Button>
                             </ListGroup.Item>

                         </ListGroup>
                     </Card>
                  </Col>
          </Row>
        </>
    )
}

export default ProductScreen
