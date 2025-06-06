import { CircleDashed } from "lucide-react";
import { motion } from "motion/react";

export function Loader() {
  return (
    <motion.div
      className="loader"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <CircleDashed width={20} height={20} />
    </motion.div>
  );
}
