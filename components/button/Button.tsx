interface Props {
  variant?: any;
  children: any;
  className?: string;
  onClick?: () => any;
}

export default function NavBar({
  variant,
  children,
  className,
  onClick,
}: Props) {
  return (
    <button
      className={`px-4 py-2 duration-300 ${
        variant != "plain" ? "hover:bg-gray-200" : ""
      } text-sm font-light uppercase tracking-tight ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
