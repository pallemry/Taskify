import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect } from 'react'
import { IPasswordContext, PasswordContext } from '../PasswordComponent/Password';
import * as icons from '@fortawesome/free-solid-svg-icons';
import './PasswordInputField.css'
import { checkUppercase, checkLowercase, checkNumber } from '../../../../../utils/utils';
import config from '../../../../../config';

type Props = {
  showPasswordButton?: boolean;
  onChange?: (password: string) => void;
}

export default function PasswordInputField({ showPasswordButton, onChange }: Props) {
  const { disabled, placeholder, passwordErrors, passwordShown, setPasswordErrors, setPassword, setPasswordShown } = useContext(PasswordContext) as IPasswordContext;

  function onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    // Retrieve the password
    const password = ((e.currentTarget) as HTMLInputElement).value;
    // Update the error list based on the new changed password
    updateErrors(password);
    // Set the password to the changed password
    setPassword(password);
    // Call the onChange from the props 
    onChange?.(password);
  }
  const showPasswordClicked = (e: React.MouseEvent) => {
    return setPasswordShown(prev => !prev);
  };
  
  function updateErrors(password: string) {
    passwordErrors['length'].isActive = (password.length < config.maxPasswordLength);
    passwordErrors['capital'].isActive = !checkUppercase(password);
    passwordErrors['lowercase'].isActive = !checkLowercase(password);
    passwordErrors['digit'].isActive = !checkNumber(password);
    // Set the errors
    setPasswordErrors({ ...passwordErrors });
  }
  
  return (
    <div className='password-wrapper'>
      {
        showPasswordButton &&
        <div className='show-password-button' onClick={showPasswordClicked} onMouseDown={e => e.preventDefault()}>
          <FontAwesomeIcon className='show-password-icon' icon={passwordShown ? icons.faEye : icons.faEyeSlash} />
        </div>
      }
      <input type={passwordShown ? "text" : "password"} name='password'
        className={'login__input'}
        pattern={`(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{${config.maxPasswordLength},}`}
        placeholder={placeholder} required
        onChange={onChangePassword}
        disabled={disabled}
      ></input>
    </div>
  )
}

