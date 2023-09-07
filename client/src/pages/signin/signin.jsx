import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import signinValidation from '../../utils/validations/signin.js';
import './signin.css';
import backend from '../../utils/axios.jsx';
import { addData } from '../../utils/redux/userSlice.jsx';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signinValidation,
    onSubmit: async (values) => {
      const res = await backend.post('/auth/signin', values);
      console.log(res);
      dispatch(addData([res.data.userData]));
      localStorage.setItem('token', res.data.token);
      navigate('/');
    },
  });

  console.log(formik.errors);

  return (
    <>
      <div className="signup">
        <form onSubmit={formik.handleSubmit} className="signup-container">
          <h2>Signin</h2>
          <div className="label-container">
            <span className="login-input-label">Email</span>
            <span className="login-error-label">{formik.errors.email}</span>
          </div>
          <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
          <div className="label-container">
            <span className="login-input-label">Password</span>
            <span className="login-error-label">{formik.errors.password}</span>
          </div>
          <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} />

          <button type="submit" className="signup-btn">
            Signin
          </button>
        </form>
      </div>
    </>
  );
};

export default Signin;
