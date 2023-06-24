import { ITitleProp } from "../../../types/componentProps";

import styles from "./formHeading.module.scss";

const FormHeading = (props: ITitleProp) => {
  return <h1 className={styles.formHeading}>{props.title}</h1>;
};

export default FormHeading;
