import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import "./styles.css";
import signinimage from "./home_person_studying.png"
import logoblack from "./logo-black.png"
import { useEffect } from 'react';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/account')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
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
    <div className="upper_div">
        <div className="left_div col-5">
            <div className="center_left_div_signin">
                <div className="header_center_left">
                    <img src={logoblack} width="100px" />
                    <div className="header_tagline">
                        <h1>Welcome back</h1>
                        <p>Please enter your details.</p>
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
                        Login with Google
                    </a>
                </div>
                <p className="paragraph-formatting-signup">
                    Don't have an account? <a href="./signup">Sign Up</a>
                </p>
            </div>
        </div>
        <div className="right_div col-7">
            <div className="img_wrapper">
                <img src={signinimage} alt="sign in page image of someone studying" />
            </div>
        </div>
    </div>
  );
};

export default Signin;