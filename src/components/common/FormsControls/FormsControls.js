import st from './FormsControls.module.css'
import { Field } from 'redux-form'

export const FormControl = ({input, meta: {touched, error}, children }) => {

    const hasError = touched && error;
    return (
        <div className={st.formControl + " " + (hasError ? st.error : "")}>

            {hasError &&  <span className={st.formInfo}>{ error}</span>}
           
            {children}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export const createField = (placeholder, component, validators, name, props={}, text="") => {
    return <>
        <Field name={name} component={component} validate={validators} placeholder={placeholder} {...props}/>
        <span>{text}</span>
    </>
}