function Input({ type = "text", placeholder, ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-borderlight rounded-xl2 focus:ring-2 focus:ring-primary focus:outline-none"
      {...props}
    />
  );
}

export default Input;