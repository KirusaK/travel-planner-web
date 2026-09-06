import { Link } from "react-router-dom";
import { SocialAuthGroup } from "../../shared/ui/SocialAuthGroup/index.js";
import { useState } from "react";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./SignUpForm.module.scss";

export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedValue = value;

    if (name === "phone") {
      updatedValue = value.replace(/[^\d+]/g, "");
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "password",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms =
        "You must agree to the Terms and Privacy Policies";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("User registered successfully!");
      console.log("Response from server:", data);
    } catch (err) {
      console.error("Network error:", err);
      alert("Server error. Check console.");
    }
  };

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
          <form className={styles.SignUpForm_form} onSubmit={handleSubmit}>
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
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  className={styles.SignUpForm_form_input}
                  value={formData.firstName}
                  onChange={handleChange}
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
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  className={styles.SignUpForm_form_input}
                  value={formData.lastName}
                  onChange={handleChange}
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
                  name="email"
                  type="email"
                  placeholder="email"
                  className={styles.SignUpForm_form_input}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.SignUpForm_form_group}>
                <label className={styles.SignUpForm_form_label} htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  className={styles.SignUpForm_form_input}
                  value={formData.phone}
                  onChange={handleChange}
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
                name="password"
                type="password"
                placeholder="password"
                className={`${styles.SignUpForm_form_input} ${styles.SignUpForm_form_input_password}`}
                value={formData.password}
                onChange={handleChange}
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
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className={`${styles.SignUpForm_form_input} ${styles.SignUpForm_form_input_password}`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className={styles.SignUpForm_checkbox}>
              <div className={styles.SignUpForm_checkbox_section}>
                <input
                  name="agreeToTerms"
                  type="checkbox"
                  className={styles.SignUpForm_checkbox_input}
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
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
            <button className={styles.SignUpForm_button} type="submit">
              Create account
            </button>
          </form>
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
