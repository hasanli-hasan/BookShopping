import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import {getUserDetails} from '../actions/userActions';
import FormContainer from '../components/FormContainer'

const UserEditScreen = ({match,history}) => {
    const userId = match.params.id;

    const [name, setName] = useState(''); 
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails
    console.log(user)
    useEffect(()=>{

       if(!user.name || user._id !==userId){
          dispatch(getUserDetails(userId))
       }else{
           setName(user.name);
           setEmail(user.email);
           setIsAdmin(user.isAdmin);
       }

    },[user])

    const submitHandler =(e) => {
      e.preventDefault()

      
    }

    return (
        <>
        <Link to='/admin/userList' className='btn btn-light my-3'>Go Back</Link>

        <FormContainer>
            <h1>Edit User</h1>
             {loading ? <p>loading...</p> : error? <p>{error}</p>:(
                 <Form onSubmit={submitHandler}>
                 <Form.Group controlId='name'>
                   <Form.Label>Username</Form.Label>
                   <Form.Control 
                   type='name' 
                   placeholder='Enter name' 
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
                   ></Form.Control>
                 </Form.Group>
                             
                 <Form.Group controlId='email'>
                   <Form.Label>Email Address</Form.Label>
                   <Form.Control 
                   type='email' 
                   placeholder='Enter email' 
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
                   ></Form.Control>
                 </Form.Group>
   
                 <Form.Group controlId='isadmin'>

                   <Form.Check 
                   type='checkbox' 
                   label='is Admin' 
                   checked={isAdmin}
                   onChange={(e)=>setIsAdmin(e.target.checked)}
                   ></Form.Check>
                 </Form.Group>
   
                 <Button type='submit' variant='success'>Update</Button>
               </Form>
             )}
         </FormContainer>
        </>
    )
}

export default UserEditScreen
