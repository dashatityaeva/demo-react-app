import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import { login } from '../../redux/auth-reducer';
import { required } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormsControls/FormsControls';
import st from './../../components/common/FormsControls/FormsControls.module.css'

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {/* <Field name="login" component={Input} validate={[required]} type="text"  placeholder="Your login"/> */}
                {createField("Your login", Input, [required], "login")}
            </div>
            <div>
                {/* <Field name="password" component={Input} validate={[required]} type="password"  placeholder="Your password"/> */}
                {createField("Your password", Input, [required], "password", {type: "password"})}
            </div>
            <div>
                {/* <Field name="rememberMe" component={Input} type="checkbox" /><span>remember me</span> */}
                {createField(null, Input, [], "rememberMe", {type: "checkbox"}, "remember me")}
            </div>
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField("Type a captcha from image", Input, [required], "captcha", {})}

            {error &&  <div className={st.formCommonError}>{error}</div>}
           
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    console.log('props: ', props);
    const onSubmit = (formData) => {
        //в formData сидят все данные с формы логинизации
        // console.log('formData: ', formData);
        let {login: email, password, rememberMe, captcha} = formData;
        props.login(email, password, rememberMe, captcha);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login page</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
  }


export default connect(mapStateToProps, {login})(Login);