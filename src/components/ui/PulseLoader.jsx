function PulseLoader() {
  return (
    <div className="flex space-x-2 justify-center">
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-softblue rounded-full animate-bounce delay-150"></div>
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-300"></div>
    </div>
  );
}

export default PulseLoader;