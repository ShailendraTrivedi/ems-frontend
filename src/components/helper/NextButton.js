export default function NextButton({
  children,
  type = "button",
  className,
  ...restProps
}) {
  return (
    <button
      type={type}
      className={`cursor-pointer ${className}`}
      {...restProps}
    >
      {children}
    </button>
  );
}
