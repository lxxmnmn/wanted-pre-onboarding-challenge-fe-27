import { useState, useEffect, ChangeEvent } from 'react';
import { User } from '../types';
import { useDebounce } from '../hooks';

const Auth = () => {
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

  useEffect(() => {
    const emailRegex: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid =
      emailRegex.test(debouncedEmail) && debouncedPassword.length >= 8;

    setIsFilled(isValid);
  }, [debouncedEmail, debouncedPassword]);

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="이메일 형태로 입력해주세요."
          onChange={changeEmail}
        />
        <input
          type="password"
          placeholder="8자 이상 입력해주세요."
          onChange={changePassword}
        />
        <button
          type="button"
          disabled={!isFilled}
          onClick={() => console.log(user)}
        >
          회원 가입
        </button>{' '}
      </form>
    </div>
  );
};

export default Auth;
