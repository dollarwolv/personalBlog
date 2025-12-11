import { motion } from "framer-motion";
import "./pageTransition.css";

const container = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const column = {
  initial: { top: 0 },
  animate: {
    top: "100%",
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      height: 0,
      top: 0,
    },
  },
  exit: {
    height: "100%",
    transition: {
      duration: 0.3,
    },
  },
};

export default function PageTransitionOverlay() {
  return (
    <motion.div
      className="page-transition-overlay"
      variants={container}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="page-transition-column"
          variants={column}
        />
      ))}
    </motion.div>
  );
}
