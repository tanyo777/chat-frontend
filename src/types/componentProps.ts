export interface IChildrenProps {
  children: JSX.Element;
}

export interface ITitleProp {
  title: string;
}

export enum EAlertSeverity {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  SUCCESS = "success",
}

export interface IFormAlertProps {
  message: string;
  severity: EAlertSeverity;
  fullWidth?: boolean;
}
