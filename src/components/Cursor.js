import React, { useCallback, useEffect, useState } from "react";
import styles from "src/styles/cursor.module.scss";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

/**
 * komponen Cursor
 * @returns
 */
const Cursor = () => {
  const [x, setX] = useState(-12);
  const [y, setY] = useState(-12);
  const [isClick, setIsClick] = useState(false);

  // redux state & dispatch
  const { cursorHover } = useSelector((state) => state.globalReducer);

  // fungsi handle ketika mouse digerakan
  const handleMouseMove = useCallback(
    (e) => {
      setX(e.clientX - 12);
      setY(e.clientY - 12);
    },
    [setX, setY]
  );

  // jalankan fungsi handleMouse setelah komponen selesai di render
  useEffect(() => {
    // event ketika mouse digerakan
    window.addEventListener("mousemove", handleMouseMove);

    // event ketika mouse diklik
    window.addEventListener("mousedown", () => setIsClick(true));
    window.addEventListener("mouseup", () => setIsClick(false));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", () => setIsClick(true));
      window.removeEventListener("mouseup", () => setIsClick(false));
    };
  }, [handleMouseMove, setIsClick]);

  // render komponen
  return (
    <motion.div className={styles.cursor} style={{ x, y }}>
      <motion.div
        className={styles.border}
        style={{
          backgroundColor: isClick ? "#fff" : "transparent",
          transition: "linear 0.1s",
        }}
        animate={{
          scale: isClick ? 0.7 : 1,
          width: cursorHover ? "230%" : "100%",
          height: cursorHover ? "230%" : "100%",
          transition: {
            duration: 0.1,
            ease: "linear",
          },
        }}
      />
      <motion.div className={styles.dot} />
    </motion.div>
  );
};

export default Cursor;
