import { SignUpSlider } from "../../widgets/SignUpSlider/SignUpSlider";
import { SignUpForm } from "../../widgets/SignUpForm/SignUpForm";
import styles from "./SignUp.module.scss";

export const SignUp = () => {
  return (
    <div className={styles.signUp}>
      <SignUpSlider />
      <SignUpForm />
    </div>
  );
};
