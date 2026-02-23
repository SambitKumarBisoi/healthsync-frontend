function Spinner({ size = 40 }) {
  return (
    <div className="flex justify-center items-center">
      <div
        style={{ width: size, height: size }}
        className="border-4 border-softblue border-t-primary rounded-full animate-spin"
      ></div>
    </div>
  );
}

export default Spinner;