import { useState, useEffect, ChangeEvent } from 'react';

import { useDebounce } from '~hooks';
import { User } from '~types';

import './Account.scss';

const Account = () => {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const debouncedEmail = useDebounce(user.email, 200);
  const debouncedPassword = useDebounce(user.password, 200);

  const changeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      email: event.target.value,
    }));
  };

  const changePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      password: event.target.value,
    }));
  };

  const login = () => {
    console.log(user);
  };

  useEffect(() => {
    const emailRegex: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid =
      emailRegex.test(debouncedEmail) && debouncedPassword.length >= 8;

    setIsFilled(isValid);
  }, [debouncedEmail, debouncedPassword]);

  return (
    <div className="auth">
      <div className="auth__container">
        <h1 className="auth__title">시작하기</h1>
        <form className="auth__form">
          <input
            type="text"
            className="auth__input"
            placeholder="이메일 형태로 입력해주세요."
            onChange={changeEmail}
          />
          <input
            type="password"
            className="auth__input"
            placeholder="8자 이상 입력해주세요."
            onChange={changePassword}
          />
        </form>
        <button
          type="button"
          className="auth__submit"
          disabled={!isFilled}
          onClick={login}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default Account;