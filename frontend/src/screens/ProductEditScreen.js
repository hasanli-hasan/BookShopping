import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import {listProductDetails, updateProduct} from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';


const ProductEditScreen = ({match,history}) => {
    const productId = match.params.id;

    const [name, setName] = useState(''); 
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = productUpdate

    useEffect(()=>{

            if(successUpdate){
                dispatch({type:PRODUCT_UPDATE_RESET})
                history.push('/admin/productList')
            }else{
                if(!product.name || product._id !==productId){
                    dispatch(listProductDetails(productId))
                 }else{
                     setName(product.name);
                     setPrice(product.price);
                     setCategory(product.category);
                     setImage(product.image);
                     setBrand(product.brand);
                     setDescription(product.description);
                     setCountInStock(product.countInStock);
                 }
            }        

    },[dispatch,productId, product,history,successUpdate])

    //upload
    const uploadFileHandler = async(e) =>{
       const file = e.target.files[0];
       const formData = new FormData();
       formData.append('image',file)
       setUploading(true);

       try {
         
        const config ={
           headers:{
             'Content-Type':'multipart/form-data'
           }
        }
        
        const {data} = await axios.post('/api/upload',formData, config);
        setImage(data);
        setUploading(false)
       } catch (error) {
         console.error(error);
         setUploading(false)
       }
    }

    //submit
    const submitHandler =(e) => {
      e.preventDefault()
      //Update Product
       dispatch(updateProduct({
           _id:product._id,
           name,
           price,
           brand,
           description,
           category,
           countInStock,
           image
       }))
    }

    return (
        <>
        <Link to='/admin/productList' className='btn btn-light my-3'>Go Back</Link>

        <FormContainer>
            <h1>Edit Product</h1>
             {loadingUpdate && <p>loading update...</p>}
             {errorUpdate && <p>{errorUpdate}</p>}
             {loading ? <p>loading...</p> : error? <p>{error}</p>:(

                 <Form onSubmit={submitHandler}>

                 <Form.Group controlId='name'>
                   <Form.Label>Name</Form.Label>
                   <Form.Control 
                   type='name' 
                   placeholder='Enter name' 
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
                   ></Form.Control>
                 </Form.Group>
                             
                 <Form.Group controlId='price'>
                   <Form.Label>Price</Form.Label>
                   <Form.Control 
                   type='number' 
                   placeholder='Enter price' 
                   value={price}
                   onChange={(e)=>setPrice(e.target.value)}
                   ></Form.Control>
                 </Form.Group>

                 <Form.Group controlId='image'>
                   <Form.Label>Image</Form.Label>
                   <Form.Control 
                   type='text' 
                   placeholder='Enter Image' 
                   value={image}
                   onChange={(e)=>setImage(e.target.value)}
                   ></Form.Control>
                   <Form.File 
                   id='image-file' 
                   label='Choose File' 
                   custom onChange={uploadFileHandler}></Form.File>
                    {uploading && <p>File Uploading ...</p>}
                 </Form.Group>

                 <Form.Group controlId='brand'>
                   <Form.Label>Brand</Form.Label>
                   <Form.Control 
                   type='text' 
                   placeholder='Enter Brand' 
                   value={brand}
                   onChange={(e)=>setBrand(e.target.value)}
                   ></Form.Control>
                 </Form.Group>

                 <Form.Group controlId='countInStock'>
                   <Form.Label>Count In Stock</Form.Label>
                   <Form.Control 
                   type='number' 
                   placeholder='Enter CountInStock' 
                   value={countInStock}
                   onChange={(e)=>setCountInStock(e.target.value)}
                   ></Form.Control>
                 </Form.Group>
                 
                 <Form.Group controlId='category'>
                   <Form.Label>Category</Form.Label>
                   <Form.Control 
                   type='text' 
                   placeholder='Enter Category' 
                   value={category}
                   onChange={(e)=>setCategory(e.target.value)}
                   ></Form.Control>
                 </Form.Group>

                 <Form.Group controlId='description'>
                   <Form.Label>Description</Form.Label>
                   <Form.Control 
                   type='text' 
                   placeholder='Enter Description' 
                   value={description}
                   onChange={(e)=>setDescription(e.target.value)}
                   ></Form.Control>
                 </Form.Group>
   
                 <Button type='submit' variant='success'>Update</Button>
               </Form>
             )}
         </FormContainer>
        </>
    )
}

export default ProductEditScreen
