import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect } from 'react'
import { IPasswordContext, PasswordContext } from '../PasswordComponent/Password';
import * as icons from '@fortawesome/free-solid-svg-icons';
import './PasswordInputField.css'
import { checkUppercase, checkLowercase, checkNumber } from '../../../../../utils/utils';
import { config } from '../../../../../config';

type Props = {
  placeholder?: string;
  showPasswordButton?: boolean;
}

export default function PasswordInputField({ placeholder, showPasswordButton }: Props) {
  const { passwordErrors, passwordShown, setPasswordErrors, setPlaceholder, setPassword, setPasswordShown } = useContext(PasswordContext) as IPasswordContext;

  useEffect(() => {
    if (placeholder)
      setPlaceholder(placeholder);
  }, [placeholder]);

  function checkPassword(e: React.ChangeEvent<HTMLInputElement>) {
    const password = ((e.currentTarget) as HTMLInputElement).value;
    passwordErrors['length'].isActive = (password.length < config.maxPasswordLength);
    passwordErrors['capital'].isActive = !checkUppercase(password);
    passwordErrors['lowercase'].isActive = !checkLowercase(password);
    passwordErrors['digit'].isActive = !checkNumber(password);
    setPasswordErrors({ ...passwordErrors })
    setPassword(password)
  }
  const showPasswordClicked = (e: React.MouseEvent) => {
    return setPasswordShown(prev => !prev);
  };
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
        onChange={checkPassword}
      ></input>
    </div>
  )
}