import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { passwordreset, clearErrors } from "./AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import Close from "components/Close";

const FormActions = styled.div`
  margin-top: 1rem;
  text-align: right;
`;

interface FormData {
  email: string;
}

const PasswordResetDialog = () => {
  const dispatch = useDispatch();
  const { reset, handleSubmit, errors, setError } = useForm<FormData>();
  const apiErrors = useSelector(
    (state: RootState) => state.auth.registerErrors
  );
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    if (apiErrors) {
      for (const errorKey in apiErrors) {
        // @ts-ignore
        setError(errorKey, "api_error", apiErrors[errorKey]);
      }
    }
  }, [apiErrors]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(clearErrors());
  };

  const onSubmit = handleSubmit((fields) => {
    dispatch(passwordreset(fields));
  });

  return (
    <>
      <Button
        variant="contained"
        css={css`
          background-color: #f1f2f7;
          margin-left: 0.5rem;
          color: #434449;
          &:hover {
            background-color: #e2e3e6;
          }
        `}
        data-testid="open-register-btn"
        onClick={handleOpen}
      >
        Forgot Password
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        keepMounted={false}
        aria-labelledby="register-dialog-title"
        css={css`
          & .MuiDialog-paper {
            padding: 2rem 1.5rem;
          }
        `}
        maxWidth="xs"
        fullWidth
      >
        <Close onClose={handleClose} />
        <DialogTitle id="register-dialog-title">Password Reset</DialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent>
            {apiErrors?.non_field_errors && (
              <Alert
                severity="error"
                css={css`
                  margin-bottom: 0.75rem;
                `}
              >
                {apiErrors.non_field_errors?.map((errorMsg) => (
                  <div key={errorMsg}>{errorMsg}</div>
                ))}
              </Alert>
            )}
            <TextField
              id="email"
              name="email"
              margin="dense"
              label="Email"
              variant="outlined"
              // inputRef={reset()}
              helperText={errors.email?.message}
              error={Boolean(errors.email)}
              fullWidth
            />
            <FormActions>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                data-testid="submit-register-btn"
              >
                Send Email
              </Button>
            </FormActions>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default PasswordResetDialog;
