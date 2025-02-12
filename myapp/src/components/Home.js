import { motion } from "framer-motion";

function Home() {
  const title = "Capital Management";

  return (
    <motion.div
      style={{ display: "flex", justifyContent: "center", marginTop: "220px" }}
    >
      {title.split("").map((char, index) => (
        <motion.span
          key={index}
          style={{
            fontSize: "5rem",
            fontWeight: "bold",
            margin: "0 5px",
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default Home;
