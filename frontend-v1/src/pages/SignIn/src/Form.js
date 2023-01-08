import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";

import "./index.css";

import signinimage from "./home_person_studying.png";
import logoblack from "../../../images/logo-black.png";

import { useEffect } from "react";
import useState from "react-usestateref";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password).catch((error) => {
        if (error.code === "auth/wrong-password") {
          setErrors("Incorrect Password").then(console.log(errors));
        } else if (error.code === "auth/user-not-found") {
          setErrors("Email not found").then(console.log(errors));
        } else if (
          error.code === "auth/account-exists-with-different-credential"
        ) {
          setErrors("Please sign in with Google.").then(console.log(errors));
        } else {
          setErrors("Incorrect Email or Password").then(console.log(errors));
        }
      });
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...

        navigate("/home");
      })
      .catch((error) => {
        if (error.code === "auth/network-request-failed") {
          setErrors("Network request failed. Try again later.");
        } else if (error.code === "auth/popup-closed-by-user") {
          setErrors("Popup closed by user");
        } else {
          setErrors("An unexpected error occured! Please try again later.");
        }
      });
  };
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
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {true && <p className="help is-danger">{errors}</p>}
              <button type="submit" className="btn btn-dark form-edited">
                Continue
              </button>
            </form>
            <div className="or_bar">
              <hr />
              <p>OR</p>
              <hr />
            </div>
          </div>
          <div className="signinputs">
            <a
              className="btn btn-outline-dark form-edited font-color-white"
              onClick={signInWithGoogle}
            >
              {image && (
                <img src={image} alt="Logo" className="weirdGoogleLogo" />
              )}
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
