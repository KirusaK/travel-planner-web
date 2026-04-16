import { LoginForm } from "../../widgets/LoginForm/LoginForm";
import { LoginSlider } from "../../widgets/LoginSlider/LoginSlider";
import styles from "./Login.module.scss";

export const Login = () => {
  return (
    <div className={styles.login}>
      <LoginForm />
      <LoginSlider />
    </div>
  );
};
