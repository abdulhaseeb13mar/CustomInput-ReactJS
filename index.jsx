import { useState, useEffect } from "react";
import "./style.css";

const CustomInput = ({
  containerStyle,
  fixCharacter,
  innerStyle,
  caretWidth = "1px",
  caretColor = "white",
}) => {
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", keyDownListener);
    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  }, []);

  const keyDownListener = (e) => {
    if (e.code === "Backspace") {
      setPassword((prev) => prev.slice(0, -1));
      return;
    }
    const SpecialChars = new RegExp(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/); //check for special character
    const AlphanumericChars = new RegExp(/^[a-zA-Z0-9]*$/); //check for alphanumeric character
    if (
      e.key.length === 1 &&
      (SpecialChars.test(e.key) || AlphanumericChars.test(e.key))
    ) {
      setPassword((prev) => prev + e.key);
      const passwordDIV = document.querySelector(".editable-div");
      passwordDIV?.scrollTo(passwordDIV.scrollWidth, 0);
    }
  };

  return (
    <div style={{ ...containerStyle }} className="container">
      <div className="editable-div" tabIndex={0}>
        {[...password].map((char, index) => (
          <div
            key={index}
            style={{
              height: "90%",
              fontSize: 23,
              color: "#" + ((Math.random() * 16777215) | 0).toString(16),
              ...innerStyle,
            }}
          >
            {fixCharacter ? fixCharacter : char}
          </div>
        ))}
        <div
          className="input-caret"
          style={{
            border: `${caretWidth} solid ${caretColor}`,
            backgroundColor: caretColor,
          }}
        />
      </div>
    </div>
  );
};

export default CustomInput;
