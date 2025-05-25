import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '/App.css';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
};

function Register() {
    const [values, setValues] = useState(initialState);
    const { user, isLoading } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            toast.error('Please fill out all fields');
            return;
        }
        if (isMember) {
            dispatch(loginUser({ email, password }));
        } else {
            dispatch(registerUser({ name, email, password }));
        }
    };

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }, [user, navigate]);

    return (
        <div className='page'>
            <form className='form' onSubmit={onSubmit}>
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {!values.isMember && (
                    <div className='form-row'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            value={values.name}
                            onChange={handleChange}
                        />
                    </div>
                )}
                <div className='form-row'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        value={values.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        value={values.password}
                        onChange={handleChange}
                    />
                </div>
                <button type='submit' className='btn btn-block' disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
                <button
                    type='button'
                    className='btn btn-block btn-hipster'
                    disabled={isLoading}
                    onClick={() => dispatch(loginUser({ email: 'John@test.com', password: '123stay' }))}
                >
                    {isLoading ? 'Loading...' : 'Demo App'}
                </button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                    <button type='button' onClick={toggleMember} className='member-btn'>
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </div>
    );
}
export default Register;
