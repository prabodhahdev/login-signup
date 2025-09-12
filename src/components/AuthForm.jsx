import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";

const AuthForm = ({ mode }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // state for errors for each field
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Redirect based on role
  const redirectBasedOnRole = (role) => {
    if (role === "superadmin") navigate("/superadmin-dashboard");
    else if (role === "admin") navigate("/admin-dashboard");
    else navigate("/dashboard");
  };

  // validate functions
  const validateFirstName = (value) => {
    const regex = /^[A-Za-z]{2,50}$/;
    setFirstNameError(
      regex.test(value) ? "" : "First name must be 2-50 alphabets only"
    );
  };

  const validateLastName = (value) => {
    const regex = /^[A-Za-z]{2,50}$/;
    setLastNameError(
      regex.test(value) ? "" : "Last name must be 2-50 alphabets only"
    );
  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(regex.test(value) ? "" : "Invalid email format");
  };

  const validatePhone = (value) => {
    const regex = /^(\+\d{1,3})?\d{10,15}$/;
    setPhoneError(
      regex.test(value)
        ? ""
        : "Phone number must be 10–15 digits (with optional country code like +94)"
    );
  };

  const validatePassword = (value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    setPasswordError(
      regex.test(value)
        ? ""
        : "Password must include uppercase, lowercase, number, special character, min 8 chars"
    );
  };

  const validateConfirmPassword = (value) => {
    setConfirmPasswordError(value === password ? "" : "Passwords do not match");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate all fields before submit
    if (mode === "signup") {
      validateFirstName(firstName);
      validateLastName(lastName);
      validateEmail(email);
      validatePhone(phone);
      validatePassword(password);
      validateConfirmPassword(confirmPassword);

      // Stop submit if there are errors
      if (
        firstNameError ||
        lastNameError ||
        emailError ||
        phoneError ||
        passwordError ||
        confirmPasswordError
      ) {
        setError("Please fix the errors above");
        toast.error("Please fix the display errors");
        return;
      }

      // 1. Create User with Firebase Auth
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // 2. Store user info in Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          firstName,
          lastName,
          phone,
          email,
          profilePic: "",
          role: "user",
        });

        // 3. Send email verification
        await sendEmailVerification(user, {
          url: "http://localhost:3000",
          handleCodeInApp: true,
        });

        toast.success(
          "Registration successful! Please verify your email to activate your account."
        );
        setError("Verification email sent. Please check your inbox.");
        navigate("/");

        // Clear form
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } catch (err) {
        console.log(err);
        if (err.code && err.code === "auth/email-already-in-use") {
          setError(
            "This email is already registered. Please log in or use another email."
          );
          toast.error(
            "This email is already registered. Please log in or use another email."
          );
        } else {
          setError(err.message);
          console.log(err);
          toast.error(err.message);
        }
      }
    } else {
      // LOGIN
      try {
        // Set persistence based on "Remember Me" checkbox
        await setPersistence(
          auth,
          rememberMe ? browserLocalPersistence : browserSessionPersistence
        );

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        if (!user.emailVerified) {
          setError(
            "Your email is not verified yet. Please check your inbox or spam folder."
          );
          toast.error(
            "Your email is not verified yet. Please check your inbox or spam folder."
          );

          setPassword("");
          setEmail("");

          return;
        }

        const docRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userRole = docSnap.data().role;
          toast.success("Login successful!");
          redirectBasedOnRole(userRole);
        } else {
          setError("User role not found");
          toast.error("User role not found");
        }
      } catch (err) {
        if (
          err.code === "auth/user-not-found" ||
          err.code === "auth/wrong-password" ||
          err.code === "auth/invalid-credential"
        ) {
          setError("Invalid username or password. Please try again.");
          toast.error("Invalid username or password. Please try again.");
        } else {
          setError(err.message);
          toast.error(err.message);
        }
        setEmail("");
        setPassword("");
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your registered email.");
      toast.error("Please enter your registered email.");
      return;
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Email not found. Please check or register first.");
        toast.error("Email not found. Please check or register first.");
        return;
      }

      // Send password reset email with redirect
      await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:3000/reset-password",
        handleCodeInApp: true,
      });

      toast.success(
        "Password reset initiated. Reset link sent to registered email"
      );
      setError("");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="auth-form flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl text-center font-semibold mb-6 text-gray-500 ">
          {mode === "signup"
            ? "Let's get your account set up"
            : "Login to your account"}
        </h2>

        <form
          className="md:w-96 w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          {/* Signup Fields */}
          {mode === "signup" && (
            <>
              {/* First Name */}
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  validateFirstName(e.target.value);
                }}
                className="w-full h-12 px-4 mb-3 border border-gray-300 rounded-lg outline-none"
                required
              />
              {firstNameError && (
                <p className="text-red-500 text-sm mb-2">{firstNameError}</p>
              )}
              {/* Last Name */}
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  validateLastName(e.target.value);
                }}
                className="w-full h-12 px-4 mb-3 border border-gray-300 rounded-lg outline-none"
                required
              />
              {lastName && (
                <p className="text-red-500 text-sm mb-2">{lastNameError}</p>
              )}
              {/* Phone Number */}
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  validatePhone(e.target.value);
                }}
                className="w-full h-12 px-4 mb-3 border border-gray-300 rounded-lg outline-none"
                required
              />
              {phoneError && (
                <p className="text-red-500 text-sm mb-2">{phoneError}</p>
              )}
            </>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (mode === "signup") validateEmail(e.target.value);
            }}
            className="w-full h-12 px-4 mb-3 border border-gray-300 rounded-lg outline-none"
            required
          />
          {mode === "signup" && emailError && (
            <p className="text-red-500 text-sm mb-2">{emailError}</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (mode === "signup") validatePassword(e.target.value);
            }}
            className="w-full h-12 px-4 mb-3 border border-gray-300 rounded-lg outline-none"
            required
          />
          {mode === "signup" && passwordError && (
            <p className="text-red-500 text-sm mb-2">{passwordError}</p>
          )}

          {/* Only show for login mode */}
          {mode === "login" && (
            <div className="w-full flex items-center justify-between mt-4 text-gray-500/80">
              {/* Remember Me */}

              <div className="flex items-center gap-2">
                <input
                  className="h-5 w-5"
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="text-sm" htmlFor="remember">
                  Remember me
                </label>
              </div>
              <a
                className="text-sm underline hover:text-indigo-500"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleForgotPassword();
                }}
              >
                Forgot password?
              </a>
            </div>
          )}

          {/* Confirm Password */}
          {mode === "signup" && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateConfirmPassword(e.target.value);
              }}
              className="w-full h-12 px-4 mb-3 border border-gray-300 rounded-lg outline-none"
              required
            />
          )}
          {confirmPasswordError && (
            <p className="text-red-500 text-sm mb-2">{confirmPasswordError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-lg bg-indigo-500 text-white font-medium hover:opacity-90 transition-opacity mt-3"
          >
            {mode === "signup" ? "Sign Up" : "Login Now"}
          </button>

          {/* Link to switch forms */}
          <p className="text-gray-500 text-sm mt-4">
            {mode === "signup"
              ? "Already have an account? "
              : "Don’t have an account? "}
            <a
              href={mode === "signup" ? "/" : "/register"}
              className="text-indigo-500 hover:underline"
            >
              {mode === "signup" ? "Login" : "Sign up"}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
