import { Snackbar, Alert } from '@mui/material';
import { TOAST } from '~constants';
import { useToastStore } from '~stores';

import './Toast.scss';

const Toast = () => {
  const { isOpen, severity, message, clearMessage } = useToastStore();

  const closeToast = () => {
    clearMessage();
  };

  return (
    <Snackbar
      className="toast"
      open={isOpen}
      onClose={closeToast}
      autoHideDuration={1000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      {severity === TOAST.ERROR ? (
        <Alert severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      ) : (
        <Alert severity="info" sx={{ width: '100%' }}>
          {message}
        </Alert>
      )}
    </Snackbar>
  );
};

export default Toast;
