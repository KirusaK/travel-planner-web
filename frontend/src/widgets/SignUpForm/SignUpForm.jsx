import { Link } from "react-router-dom";
import { SocialAuthGroup } from "../../shared/ui/SocialAuthGroup/index.js";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./SignUpForm.module.scss";

export const SignUpForm = () => {
  return (
    <section className={styles.SignUpForm}>
      <div className={styles.SignUpForm_container}>
        <div className={styles.SignUpForm_logo}>
          <Link to="/">
            <svg width={110} height={36}>
              <use href={sprite + "#icon-Logo"}></use>
            </svg>
          </Link>
        </div>
        <div className={styles.SignUpForm_signup}>
          <h1 className={styles.SignUpForm_title}>Sign Up</h1>
          <p className={styles.SignUpForm_par}>
            Let`s get you all st up so you can access your personal account.
          </p>
          <form className={styles.SignUpForm_form}>
            <div className={styles.SignUpForm_row}>
              <div className={styles.SignUpForm_form_group}>
                <label
                  className={styles.SignUpForm_form_label}
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  className={styles.SignUpForm_form_input}
                  type="text"
                  placeholder="First Name"
                />
              </div>

              <div className={styles.SignUpForm_form_group}>
                <label
                  className={styles.SignUpForm_form_label}
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  className={styles.SignUpForm_form_input}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className={styles.SignUpForm_row}>
              <div className={styles.SignUpForm_form_group}>
                <label className={styles.SignUpForm_form_label} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  className={styles.SignUpForm_form_input}
                  type="email"
                  placeholder="email"
                />
              </div>

              <div className={styles.SignUpForm_form_group}>
                <label className={styles.SignUpForm_form_label} htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  className={styles.SignUpForm_form_input}
                  type="text"
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div
              className={`${styles.SignUpForm_form_group} ${styles.SignUpForm_form_group_password}`}
            >
              <label
                className={styles.SignUpForm_form_label}
                htmlFor="password"
              >
                Password
              </label>

              <input
                id="password"
                className={`${styles.SignUpForm_form_input} ${styles.SignUpForm_form_input_password}`}
                type="password"
                placeholder="password"
              />
            </div>

            <div
              className={`${styles.SignUpForm_form_group} ${styles.SignUpForm_form_group_password}`}
            >
              <label
                className={styles.SignUpForm_form_label}
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                className={`${styles.SignUpForm_form_input} ${styles.SignUpForm_form_input_password}`}
                type="password"
                placeholder="Confirm Password"
              />
            </div>
          </form>
          <div className={styles.SignUpForm_checkbox}>
            <div className={styles.SignUpForm_checkbox_section}>
              <input
                className={styles.SignUpForm_checkbox_input}
                type="checkbox"
              />
              <p className={styles.SignUpForm_checkbox_text}>
                I agree to all the{" "}
                <Link
                  to="/"
                  className={`${styles.SignUpForm_checkbox_text} ${styles.SignUpForm_checkbox_text_pink}`}
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  to="/"
                  className={`${styles.SignUpForm_checkbox_text} ${styles.SignUpForm_checkbox_text_pink}`}
                >
                  Privacy Policies
                </Link>
              </p>
            </div>
          </div>
          <button className={styles.SignUpForm_button}>Create account</button>
          <div className={styles.SignUpForm_login}>
            <p className={styles.SignUpForm_login_text}>
              Already have an account?{" "}
              <Link className={styles.SignUpForm_login_link} to="/Login">
                Login
              </Link>
            </p>
          </div>
          <div className={styles.SignUpForm_other}>
            <hr className={styles.SignUpForm_other_hr} />
            <p className={styles.SignUpForm_other_text}>Or login with</p>
            <hr className={styles.SignUpForm_other_hr} />
          </div>
          <div className={styles.SignUpForm_other_social}>
            <SocialAuthGroup />
          </div>
        </div>
      </div>
    </section>
  );
};
