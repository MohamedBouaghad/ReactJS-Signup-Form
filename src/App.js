import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

      const initialValues = {username:'', email: '', password: ''};
      const [formValues, setFormValues] = useState(initialValues);
      const [formErrors, setFormErrors] = useState({});
      const [isSubmit, setIsSubmit] = useState(false);


      const handleChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues))
        setIsSubmit(true)
      }

      useEffect(() =>{
        console.log(formErrors)
        if(Object.keys(formErrors).length === 0 && isSubmit) {
          console.log(formValues)
        }
      }, [formErrors])

      const validate = (values) => {
        const errors = {}
        const regex = /^[a-zA-Z0-9]*$/;
        if(!values.username) {
          errors.username = 'Username is required!'
        }else if(!regex.test(values.username)) {
          errors.username = 'username is not valid'
        }

        if(!values.email) {
          errors.email = 'Email is required'
        }

        if(!values.password) {
          errors.password = 'Password is required'
        }else if(values.password.length < 4) {
          errors.password = 'password must be more than 4 characters'
        }else if(values.password.length > 10) {
          errors.password = 'password cannot exceed more than 10 characters'
        }

        return errors;
      }


      return (
            <div className="App">
                {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}

                <h1 className="title">Form Validation</h1>
                {Object.keys(formErrors).length === 0 && isSubmit ? (
                  <div className='succ'>Signed in successfully</div>
                ) : (<div></div>)}
                <form onSubmit={handleSubmit}>
                    <div className="form-validation">
                        <label>Username</label>
                        <input
                            id="username"
                            className='modul-input'
                            type="text"
                            name="username"
                            placeholder="Username"
                            value = {formValues.username}
                            onChange = {handleChange}
                        />
                        <p>{formErrors.username}</p>
                    </div>

                    <div className="form-validation">
                        <label>Email</label>
                        <input
                            id="email"
                            className='modul-input'
                            type="email" 
                            name="email"
                            placeholder="Email Adresse"
                            value = {formValues.email}
                            onChange = {handleChange}
                        />
                        <p>{formErrors.email}</p>
                    </div>

                    <div className="form-validation">
                        <label>Password</label>
                        <input
                            id="password"
                            className='modul-input'
                            type="password"
                            name="password"
                            placeholder="Password"
                            value = {formValues.password}
                            onChange = {handleChange}
                        />
                        <p>{formErrors.password}</p>
                    </div>

                    <button className='valid-btn'>Valid</button>
                </form>
            </div>
      );
}

export default App;
