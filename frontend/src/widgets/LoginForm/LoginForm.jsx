import { Link } from "react-router-dom";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./LoginForm.module.scss";

export const LoginForm = () => {
  return (
    <section className={styles.LoginForm}>
      <div className={styles.LoginForm_container}>
        <div className={styles.LoginForm_logo}>
          <Link to="/">
            <svg width={110} height={36}>
              <use href={sprite + "#icon-Logo"}></use>
            </svg>
          </Link>
        </div>
        <div className={styles.LoginForm_login}>
          <h1 className={styles.LoginForm_title}>Login</h1>
          <p className={styles.LoginForm_par}>
            Login to access your Golobe account
          </p>
          <form className={styles.LoginForm_form}>
            <div className={styles.LoginForm_form_group}>
              <label className={styles.LoginForm_form_label} htmlFor="email">
                Email
              </label>
              <input
                className={styles.LoginForm_form_input}
                type="email"
                placeholder="email"
              />
            </div>
            <div className={styles.LoginForm_form_group}>
              <label className={styles.LoginForm_form_label} htmlFor="password">
                Password
              </label>
              <input
                className={styles.LoginForm_form_input}
                type="password"
                placeholder="password"
              />
            </div>
          </form>
          <div className={styles.LoginForm_checkbox}>
            <div className={styles.LoginForm_checkbox_section}>
              <input
                className={styles.LoginForm_checkbox_input}
                type="checkbox"
              />
              <p className={styles.LoginForm_checkbox_text}>Remember me</p>
            </div>

            <Link
              to="/"
              className={`${styles.LoginForm_checkbox_text} ${styles.LoginForm_checkbox_text_pink}`}
            >
              Forgot Password
            </Link>
          </div>
          <button className={styles.LoginForm_button}>LOGIN</button>
          <div className={styles.LoginForm_signup}>
            <p className={styles.LoginForm_signup_text}>
              Don't have an account?
            </p>
            <Link className={styles.LoginForm_signup_link} to="/">
              Sign up
            </Link>
          </div>

          <div className={styles.LoginForm_other}>
            <hr className={styles.LoginForm_other_hr} />
            <p className={styles.LoginForm_other_text}>Or login with</p>
            <hr className={styles.LoginForm_other_hr} />
          </div>
          <div className={styles.LoginForm_other_social}>
            <div className={styles.LoginForm_other_social_media}>
              <Link to="/">
                <svg width={24} height={24}>
                  <use href={sprite + "#icon-facebook"}></use>
                </svg>
              </Link>
            </div>
            <div className={styles.LoginForm_other_social_media}>
              <Link to="/">
                <svg width={24} height={24}>
                  <use href={sprite + "#icon-flat-color-icons_google"}></use>
                </svg>
              </Link>
            </div>
            <div className={styles.LoginForm_other_social_media}>
              <Link to="/">
                <svg width={24} height={24}>
                  <use href={sprite + "#icon-ant-design_apple-filled"}></use>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
