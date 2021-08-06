import st from './FormsControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from 'redux-form'
import { FieldValidatorType } from '../../../utils/validators/validators';
import React from 'react';

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}

export const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children }) => {
    const hasError = touched && error;
    return ( 
        <div className = {st.formControl + " " + (hasError ? st.error : "") }>
            {hasError &&  <span className={st.formInfo}>{ error}</span>}
            {children}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps>  = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}


export function createField<FormKeysType extends string>(placeholder: string | undefined,
                                        component: React.FC<WrappedFieldProps>,
                                        validators: Array<FieldValidatorType>,
                                        name: FormKeysType,
                                        props={}, text="") {
    return <>
        <Field name={name} component={component} validate={validators} placeholder={placeholder} {...props}/>
        <span>{text}</span>
    </>
}

export type GetStringKeys<T> = Extract<keyof T, string>