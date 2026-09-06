import { Link } from "react-router-dom";
import { SocialAuthGroup } from "../../shared/ui/SocialAuthGroup/index.js";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./LoginForm.module.scss";
import { useState } from "react";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (error[name]) {
      setError((prevError) => {
        const newErrors = { ...prevError };
        delete newErrors[name];
        return newErrors;
      });
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const respons = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await respons.json();

      if (!respons.ok) {
        setError({server: data.message});
        return;
      }

      alert("Successfully logged in!");
      console.log("User data:", data.user);
    } catch (err) {
      console.error("Login error:", err);
      setError({ server: "Server error. Please try again later." });
    }
  };

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
          <form className={styles.LoginForm_form} onSubmit={handleSubmit}>
            <div className={styles.LoginForm_form_group}>
              <label className={styles.LoginForm_form_label} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                className={styles.LoginForm_form_input}
                type="email"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
              />

              {error.email && (
                <span className={styles.LoginForm_error_text}>
                  {error.email}
                </span>
              )}
            </div>
            <div className={styles.LoginForm_form_group}>
              <label className={styles.LoginForm_form_label} htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                className={styles.LoginForm_form_input}
                type="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
              />

              {error.password && (
                <span className={styles.LoginForm_error_text}>
                  {error.password}
                </span>
              )}
            </div>

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

            {error.server && (
              <p className={styles.LoginForm_server_error}>{error.server}</p>
            )}

            <button className={styles.LoginForm_button} type="submit">
              LOGIN
            </button>
          </form>
          <div className={styles.LoginForm_signup}>
            <p className={styles.LoginForm_signup_text}>
              Don't have an account?
            </p>
            <Link className={styles.LoginForm_signup_link} to="/SignUp">
              Sign up
            </Link>
          </div>

          <div className={styles.LoginForm_other}>
            <hr className={styles.LoginForm_other_hr} />
            <p className={styles.LoginForm_other_text}>Or login with</p>
            <hr className={styles.LoginForm_other_hr} />
          </div>
          <SocialAuthGroup />
        </div>
      </div>
    </section>
  );
};
