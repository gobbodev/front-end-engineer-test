import { AuthButton } from "./ui/AuthButton";

export function Header() {
  return (
    <header className="w-full flex justify-end p-4">
      <AuthButton />
    </header>
  );
}
