import { useState, ChangeEvent, useEffect } from 'react';
import {
  SelectChangeEvent,
  FormControl,
  TextField,
  MenuItem,
  Button,
  Select,
} from '@mui/material';
import { UserType } from '../types';

const DOMAIN_LIST: string[] = [
  'gmail.com',
  'naver.com',
  'daum.net',
  'hanmail.net',
  'icloud.com',
  'nate.com',
];

const Auth = () => {
  const [user, setUser] = useState<UserType>({ email: '', password: '' });
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const regex: RegExp = /^[a-zA-Z0-9]+$/;

  const setUserInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (regex.test(value) && (name !== 'password' || value.length >= 8)) {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    } else {
      alert(`${name}을 다시 입력해주세요.`);
    }
  };

  const generateEmail = (event: SelectChangeEvent<string>) => {
    const id = user.email;
    const fullEmail = id.concat('@', event.target.value);

    setUser((prevUser) => ({
      ...prevUser,
      email: fullEmail,
    }));
  };

  useEffect(() => {
    if (user.email.includes('@') && user.password.length > 0) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [user]);

  return (
    <FormControl>
      <div>
        <TextField
          type="text"
          name="email"
          sx={{ m: 1 }}
          label="Email"
          helperText="영문, 숫자만 입력해주세요."
          variant="standard"
          onChange={setUserInfo}
        />
        <span>@</span>
        <Select
          sx={{ m: 1, width: '150px' }}
          defaultValue=""
          onChange={generateEmail}
        >
          {DOMAIN_LIST.map((value, index) => (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div>
        <TextField
          type="password"
          name="password"
          sx={{ m: 1 }}
          label="Password"
          helperText="영문, 숫자를 8자 이상 입력해주세요."
          variant="standard"
          onChange={setUserInfo}
        />
      </div>
      <Button
        sx={{ m: 2 }}
        variant="contained"
        disabled={!isFilled}
        onClick={() => console.log(user)}
      >
        회원 가입
      </Button>
    </FormControl>
  );
};

export default Auth;
