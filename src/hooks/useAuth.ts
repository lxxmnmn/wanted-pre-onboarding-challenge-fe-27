import { useMutation } from '@tanstack/react-query';
import { login, signUp } from '~services/api';
import { User } from '~types';

// const TOKEN_KEY = 'token';

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: (data: User) => login(data),
  });

  const signUpMutation = useMutation({
    mutationFn: (data: User) => signUp(data),
  });

  const mutateAuth = async (data: User) => {
    try {
      const loginResponse = await loginMutation.mutateAsync(data);
      const { token } = loginResponse;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('email', data.email);
      }

      return { token, type: 'login' };
    } catch (loginError) {
      try {
        const signUpResponse = await signUpMutation.mutateAsync(data);
        const { token } = signUpResponse;

        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('email', data.email);
        }

        return { token, type: 'signUp' };
      } catch (signUpError) {
        console.error('Authentication failed:', signUpError);
      }
    }
  };

  return {
    mutateAuth,
    isPending: loginMutation.isPending || signUpMutation.isPending,
    isError: loginMutation.isError || signUpMutation.isError,
  };
};
