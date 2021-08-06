import { connect, useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { login } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import { required } from '../../utils/validators/validators';
import { createField, GetStringKeys, Input } from '../common/FormsControls/FormsControls';
import st from './../../components/common/FormsControls/FormsControls.module.css'

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {/* <Field name="login" component={Input} validate={[required]} type="text"  placeholder="Your login"/> */}
                {createField<LoginFormValuesTypeKeys>("Your login", Input, [required], "login")}
            </div>
            <div>
                {/* <Field name="password" component={Input} validate={[required]} type="password"  placeholder="Your password"/> */}
                {createField<LoginFormValuesTypeKeys>("Your password", Input, [required], "password", {type: "password"})}
            </div>
            <div>
                {/* <Field name="rememberMe" component={Input} type="checkbox" /><span>remember me</span> */}
                {createField<LoginFormValuesTypeKeys>(undefined, Input, [], "rememberMe", {type: "checkbox"}, "remember me")}
            </div>
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField<LoginFormValuesTypeKeys>("Type a captcha from image", Input, [required], "captcha", {})}

            {error &&  <div className={st.formCommonError}>{error}</div>}
           
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm);


export type LoginFormValuesType = {
    login: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export const LoginPage: React.FC = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()
    
    const onSubmit = (formData: LoginFormValuesType) => {
        //в formData сидят все данные с формы логинизации
        // console.log('formData: ', formData);
        let {login: email, password, rememberMe, captcha} = formData;
        dispatch(login(email, password, rememberMe, captcha));
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login page</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}


