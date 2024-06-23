import React, { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../redux/actions/authActions';
import { Navigate, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!auth.isAuthenticated) {
      return <Navigate to="/login" />;
    }
  }, [])
  const { name, email, password } = formData;

  const dispatch = useDispatch();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(signUp(formData));
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={name} onChange={onChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={onChange} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" value={password} onChange={onChange} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
