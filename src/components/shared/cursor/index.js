import { makeStyles } from "@mui/styles";
import React from "react";
import { motion, motionValue } from "framer-motion";

const useStyles = makeStyles(() => ({
  cursorOuter: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    borderRadius: "50%",
    pointerEvents: "none",
    mixBlendMode: "difference",
  },
  cursorInner: {
    pointerEvents: "none",
    border: `2px solid #fff`,
    backgroundColor: "#fff",
    borderRadius: "50%",
    width: 28,
    height: 28,
  },
}));

/**
 * Komponen utama
 * @returns
 */
const Cursor = () => {
  const classes = useStyles();
  const x = motionValue(0);
  const y = motionValue(0);
  const scale = motionValue(1);
  const color = motionValue("transparent");

  const handleMouseMove = React.useCallback(
    (e) => {
      x.set(e.clientX - 14);
      y.set(e.clientY - 14);
    },
    [x, y]
  );

  const handleMouseUpDown = React.useCallback(
    (scaleValue, colorValue) => {
      scale.set(scaleValue);
      color.set(colorValue);
    },
    [scale, color]
  );

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", () => handleMouseUpDown(0.8, "#fff"));
    window.addEventListener("mouseup", () =>
      handleMouseUpDown(1, "transparent")
    );

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.addEventListener("mousedown", () =>
        handleMouseUpDown(0.7, "#fff")
      );
      window.addEventListener("mouseup", () =>
        handleMouseUpDown(1, "transparent")
      );
    };
  }, [handleMouseMove, handleMouseUpDown]);

  return (
    <motion.div className={classes.cursorOuter} style={{ x, y }}>
      <motion.div
        className={classes.cursorInner}
        style={{
          scale: scale,
          backgroundColor: color,
          transition: "linear 0.2s",
        }}
      />
    </motion.div>
  );
};

export default Cursor;
