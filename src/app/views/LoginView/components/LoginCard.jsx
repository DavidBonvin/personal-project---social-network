import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../components/theme/Button'
import Input from '../../../components/theme/Input'
import { useFormik } from 'formik'
import { register } from '../../../utils/fakeApi'
import validationSchema from '../../../utils/loginSchema'
import ReCAPTCHA from "react-google-recaptcha";

/* Les composants sont dans le dossier assets/components/theme
Le style des composants se trouve dans le dossier assets/styles/components
Les composants reçoivent des props 
Le composant Button reçoit son style par les props, surtout pour les media queries
Les variables des couleurs se trouvent dans le fichier tailwind.config.js
*/

function LoginCard() {

  const navigate = useNavigate()

  const [captchaValidate, setcaptchaValidate] = useState(null)
  const [formValidate, setFormValidate] = useState(null)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    isLogin && navigate('/register')
  }, [isLogin])

  const captchagoogle = useRef (null);

  const onChange = () => {
    if(captchagoogle.current.getValue()){
      setcaptchaValidate(true)
      console.log("Vous n'êtes pas un robot")
    } else {
      setcaptchaValidate(false)
      console.log("Vous êtes un robot ?")
    }
  }

  const initialValues = {
    email: '',
    password: '',
  };

  const { 
    values, handleChange, handleBlur,
    isSubmitting, isValid, touched, 
    handleSubmit, setFieldError,
    resetForm, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  async function onSubmit(formValues) {
    console.log(formValues);
    if(captchagoogle.current.getValue()) {
      setFormValidate(true)
      setcaptchaValidate(true)
      try {
        await register(formValues);
        resetForm();
        console.log('Connexion réussie')
        setIsLogin(true)
      } catch ({ errors }) {
        for (let key in errors) {
          setFieldError(key, errors[key]);
        }
      }
    } else {
      setFormValidate(false)
      setcaptchaValidate(false)
    }
  }

  return (
    <div className='bg-gray-1 w-full max-w-2xl md:w-4/5 lg:w-4/5 2xl:max-w-3xl rounded-lg flex flex-col  items-center'>
      <form onSubmit={handleSubmit} className='p-2 bg-transparent w-full sm:w-4/5 md:w-4/5 lg:w-4/5 2xl:w-4/5 m-2 rounded-lg flex flex-col justify-center items-center'>
        <h2 className='my-8 text-2xl sm:text-3xl lg:text-4xl'>S'identifier</h2>
        <Input
          type='email'
          placeholder='exemple@gmail.com'
          description="Adresse mail enregistrée lors de l'inscription"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        { touched.email && errors.email && 
          <small className="error">{ errors.email }</small>
        }
        <Input
          type='password'
          placeholder='********'
          description="Vous avez oublié votre mot de passe"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        { touched.password && errors.password && 
          <small className="error">{ errors.password }</small>
        }
        <ReCAPTCHA className="my-4" ref={captchagoogle} sitekey="6Lc43mskAAAAAPGuj5wsQMpI-Bkcvy1cpXJusonn" onChange={onChange} />
        {captchaValidate === false &&
          <p className="w-full text-red-600 text-center mb-4">Etes-vous un robot ? Merci de valider le captcha</p>
        }
        <Button
          className="w-full sm:w-4/5"
          title="CONNEXION"
          type="submit"
          disabled={isSubmitting || !isValid}
        />
      </form>
      <div className='mb-4 w-full flex justify-end'>
        <Link className='mr-4 mt-4' to='/register'>Créer un compte</Link>
      </div>
    </div>
  )
}

export default LoginCard
