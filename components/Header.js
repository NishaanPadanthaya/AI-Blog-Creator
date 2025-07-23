import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          AI Blog Generator
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-primary">
            Dashboard
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
