import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../../features/user/userOperation";

import styles from "../../styles/Profile.module.css";
import Loader from "../../shared/Loader/Loader";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLogin, loading } = useSelector(({ user }) => user);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    if (user) {
      setValues(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every((val) => val);

    if (!isNotEmpty) return;

    dispatch(updateUser(values));
  };

  return (
    <section className={styles.profile}>
      {loading ? (
        <Loader /> // Відображаємо Loader поки loading === true
      ) : (
        <>
          {!isLogin ? (
            <span>Вам потрібно увійти</span>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.group}>
                <input
                  type="email"
                  placeholder="Your email"
                  name="email"
                  value={values.email}
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.group}>
                <input
                  type="text"
                  placeholder="Your name"
                  name="name"
                  value={values.name}
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.group}>
                <input
                  type="password"
                  placeholder="Your password"
                  name="password"
                  value={values.password}
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.group}>
                <input
                  type="text"
                  placeholder="Your avatar"
                  name="avatar"
                  value={values.avatar}
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className={styles.submit}>
                Update
              </button>
            </form>
          )}
        </>
      )}
    </section>
  );
};

export default Profile;
