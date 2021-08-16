import styles from "./Widget.module.css";

export default function Widget({
  children,
  style,
  bgColor,
  textColor,
  className,
}) {
  return (
    <div
      style={{
        background: `var(${bgColor})`,
        color: `var(${textColor})`,
        ...style,
      }}
      className={`${styles.widget} ${className}`}
    >
      {children}
    </div>
  );
}
