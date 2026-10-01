import Book from "@/components/Book"
import PasswordGate from "@/components/passWordGate";

export default function Home() {
  return (
    <PasswordGate>
      <Book />
    </PasswordGate>
  );
}