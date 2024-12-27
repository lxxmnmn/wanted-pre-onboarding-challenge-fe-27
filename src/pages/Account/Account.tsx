import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { debounce } from 'lodash';
import { CircularProgress } from '@mui/material';

import { TOAST } from '~constants';
import { useAuth } from '~hooks';
import { UserSchema } from '~schema';
import { isTokenExpired } from '~services/auth';
import { useToastStore } from '~stores';
import { User } from '~types';

import './Account.scss';

const Account = () => {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  // const [isFilled, setIsFilled] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setMessage } = useToastStore();
  const { mutateAuth, isPending } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: user,
    mode: 'onChange',
  });

  const debouncedSetValue = useCallback(
    debounce((name: keyof User, value: string) => {
      setValue(name, value, { shouldValidate: true });
      trigger(name);
    }, 200),
    [setValue, trigger]
  );

  const registerWithDebounce = (name: keyof User) => {
    return {
      ...register(name),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
        debouncedSetValue(name, value);
      },
    };
  };

  const onSubmit = async (data: User) => {
    console.log(data);
    // const auth = await mutateAuth(user);
    // if (auth?.token) navigate('/');
  };

  // useEffect(() => {
  //   const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   const isValid = emailRegex.test(debouncedEmail) && debouncedPassword.length >= 8;

  //   setIsFilled(isValid);
  // }, [debouncedEmail, debouncedPassword]);

  useEffect(() => {
    if (!isTokenExpired()) {
      setMessage(TOAST.INFO, '토큰이 존재해요.');
      navigate('/');
    }
  }, []);

  return (
    <div className="auth">
      <div className="auth__container">
        <h1 className="auth__title">시작하기</h1>
        <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth__field">
            <label htmlFor="email">이메일</label>
            <div className="field">
              <input
                id="email"
                type="text"
                className="field__input"
                placeholder="이메일 형태로 입력해주세요."
                {...registerWithDebounce('email')}
              />
              {errors.email && (
                <span className="field__error">{errors.email.message?.toString()}</span>
              )}
            </div>
          </div>
          <div className="auth__field">
            <label htmlFor="password">비밀번호</label>
            <div className="field">
              <input
                id="password"
                type="password"
                className="field__input"
                placeholder="8글자 이상 입력해주세요."
                {...registerWithDebounce('password')}
              />
              {errors.password && (
                <span className="field__error">{errors.password.message?.toString()}</span>
              )}
            </div>
          </div>
          {/* disabled={!isFilled} */}
          <button type="submit" className="auth__submit">
            {isPending ? <CircularProgress color="inherit" /> : <>로그인</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;
