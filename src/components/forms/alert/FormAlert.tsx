import { Alert } from "@mui/material";

import { IFormAlertProps } from "../../../types/componentProps";

import styles from "./formAlert.module.scss";

const FormAlert = ({
  message,
  severity,
  fullWidth = false,
}: IFormAlertProps) => {
  if (fullWidth) {
    return (
      <Alert
        severity={severity}
        sx={{ width: "100%" }}
        className={styles.formAlert}
      >
        {message}
      </Alert>
    );
  }

  return (
    <Alert severity={severity} className={styles.formAlert}>
      {message}
    </Alert>
  );
};

export default FormAlert;
