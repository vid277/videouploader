import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserAuth } from "../../../context/AuthContext";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

import useForm from "./useForm";
import validate from "./LoginFormValidationRules";
import logoblack from "../../../images/logo-black.png";

import "./index.css";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [validated, setValidated] = useState(false);
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password).catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setSignUpError("Email is already in use").then(console.log(errors));
        } else if (error.code === "auth/weak-password") {
          setSignUpError("Weak password").then(console.log(errors));
        } else {
          setSignUpError("Something is wrong here").then(console.log(errors));
        }
      });
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        navigate("/home");
        // ...
      })
      .catch((error) => {
        if (error.code === "auth/network-request-failed") {
          setSignUpError("Network request failed. Try again later.");
        } else if (error.code === "auth/popup-closed-by-user") {
          setSignUpError("Popup closed by user");
        } else if (
          error.code === "auth/account-exists-with-different-credential"
        ) {
          setSignUpError("Please sign in with Google.").then(
            console.log(errors)
          );
        } else {
          setSignUpError(
            "An unexpected error occured! Please try again later."
          );
        }
      });
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );

  const handleMultiplePasswordChange = (e) => {
    handleChange(e);
    setPassword(e.target.value);
  };

  const handleMultipleEmailChange = (e) => {
    handleChange(e);
    setEmail(e.target.value);
  };

  const handleMultipleSubmit = (e) => {
    handleSubmit(e);
    if (validated) {
      handleAuthSubmit(e);
    }
  };

  function login() {
    setValidated(true);
  }

  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      const response = await fetch(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
      );
      const data = await response.blob();
      setImage(URL.createObjectURL(data));
    }
    fetchImage();
  }, []);

  return (
    <div className="upper_div">
      <div className="center_left_div">
        <div className="header_center_left">
          <img src={logoblack} width="100px" />
          <div className="header_tagline">
            <h1>Welcome!</h1>
            <p>Please enter the following details to continue.</p>
          </div>
        </div>
        <form onSubmit={handleMultipleSubmit} noValidate>
          <div className="signinputs">
            <div className="field">
              <input
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="Enter your email"
                autoComplete="off"
                className={`form-control input ${errors.email && "is-danger"}`}
                type="email"
                name="email"
                onChange={handleMultipleEmailChange}
                value={values.email || ""}
                required
              />
              {errors.email && <p className="help is-danger">{errors.email}</p>}
            </div>
            <div className="field">
              <input
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="Enter your password"
                className={`form-control input ${
                  errors.password && "is-danger"
                }`}
                type="password"
                name="password"
                onChange={handleMultiplePasswordChange}
                value={values.password || ""}
                required
              />
              {errors.password && (
                <p className="help is-danger">{errors.password}</p>
              )}
            </div>
            {true && <p className="help is-danger">{signUpError}</p>}
            <button type="submit" className="btn btn-dark form-edited">
              Continue
            </button>
            <div className="or_bar">
              <hr />
              <p>OR</p>
              <hr />
            </div>
          </div>
        </form>
        <div className="signinputs">
          <a
            className="btn btn-outline-dark form-edited font-color-white"
            onClick={signInWithGoogle}
          >
            {image && (
              <img src={image} alt="Logo" className="weirdGoogleLogo" />
            )}
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

export default Form;
