import { useMutation } from '@tanstack/react-query';
import { login, signUp } from '~services/api';
import { setLogin } from '~services/auth';
import { User } from '~types';

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
        setLogin({ token, email: data.email });
      }

      return { token, type: 'login' };
    } catch (loginError) {
      try {
        const signUpResponse = await signUpMutation.mutateAsync(data);
        const { token } = signUpResponse;

        if (token) {
          setLogin({ token, email: data.email });
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
