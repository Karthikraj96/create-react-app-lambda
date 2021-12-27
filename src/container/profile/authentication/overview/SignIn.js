import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Form, Input, Button,Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {signin} from '../../../../api/api'
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { AuthWrapper } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import { alerSwal } from "../../../swal/alertSwal";
import Cookies from 'js-cookie';
const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });
  useEffect(()=>{
    Cookies.remove('firstLoad');
  },[])
  const [username , setUsername]=useState('');
  const [password, setPassword]=useState('');


  const handleUserInputChange=(event)=> {
    console.log(username)
    setUsername(event.target.value);
   
}

const handlePasswordInputChange=(event)=> {
  setPassword(event.target.value);
}

  const handleSubmit = () => {
    let values ={
      username:username,
      password:password
    }
    Cookies.remove('auth_token');
    signin(values).then(res =>{
      if(res){
        Cookies.remove('firstLoad');
        Cookies.set("auth_token",res.data.token)
        dispatch(login());
        history.push('/admin');
        alerSwal("success","Authorizated user")
      }
    }).catch(e =>{
      alerSwal("error", "Oops...", "Wrong Username and password", 0);
    })
  //  if(username=="name@example.com" && password=="123456"){

  // //   <Alert
  // //   message="Success Tips"
  // //   description="Detailed description and advice about successful copywriting."
  // //   type="success"
  // //   showIcon
  // // />
     
  //    dispatch(login());
  //     history.push('/admin');
  //     alerSwal("success","Authorizated user")
  //  }else{
    
  //   alerSwal("error", "Oops...", "Wrong Username and password", 0);
   
  //  }
  };

  const onChange = checked => {
    setState({ ...state, checked });
  };

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Don&rsquo;t have an account? <NavLink to="/register">Sign up now</NavLink>
      </p>
      <div className="auth-contents">
        <Form preserve={false} name="login" form={form} onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">
            Sign in to <span className="color-secondary">Admin</span>
          </Heading>
          <Form.Item
            name="username"
            rules={[{ message: 'Please input your username or Email!', required: true }]}
            // initialValue="name@example.com"
            label="Username or Email Address"
          >
            <Input onChange={ handleUserInputChange } />
          </Form.Item>
          <Form.Item name="password" 
          // initialValue="123456" 
          rules={[{ message: 'Please input your Password!', required: true }]}
          label="Password">
            <Input.Password placeholder="Password" onChange={ handlePasswordInputChange } />
          </Form.Item>
          <div className="auth-form-action">
            <Checkbox onChange={onChange}>Keep me logged in</Checkbox>
            <NavLink className="forgot-pass-link" to="/forgotPassword">
              Forgot password?
            </NavLink>
          </div>
          <Form.Item>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large">
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
          </Form.Item>
          <p className="form-divider">
            <span>Or</span>
          </p>
          <ul className="social-login">
            <li>
              <Link className="google-signup" to="#">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign in with Google</span>
              </Link>
            </li>
            <li>
              <Link className="facebook-sign" to="#">
                <FacebookOutlined />
              </Link>
            </li>
            <li>
              <Link className="twitter-sign" to="#">
                <TwitterOutlined />
              </Link>
            </li>
          </ul>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
