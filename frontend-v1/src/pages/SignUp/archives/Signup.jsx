import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import logoblack from "./logo-black.png"
import { useEffect } from 'react';
import "./styles.css";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const { createUser } = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/account')
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      const response = await fetch('https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png');
      const data = await response.blob();
      setImage(URL.createObjectURL(data));
    }
    fetchImage();
  }, []);


  return (
    <div className='upper_div'>
    <div className="center_left_div">
    <div className="header_center_left">
        <img src={logoblack} width="100px" />
        <div className="header_tagline">
            <h1>Welcome!</h1>
            <p>Please enter the following details to continue.</p>
        </div>
    </div>
    <div className="signinputs">
        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="Enter your email" />
        <input type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="Enter your password" />
        <button type="button" className="btn btn-dark form-edited">Continue</button>
        <div className="or_bar">
            <hr />
            <p>OR</p>
            <hr />
        </div>
    </div>
    <div className="signinputs">
        <a className="btn btn-outline-dark form-edited font-color-white">
            {image && <img src={image} alt="Logo" className='weirdGoogleLogo'/>}
            Sign up with Google
        </a>
    </div>
    <p className="paragraph-formatting-signup">
        Already have an account? <a href="/">Sign in</a>
    </p>
</div>
</div>
);
};

export default Signup;