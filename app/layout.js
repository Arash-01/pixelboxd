import "./globals.css";
import Bonfire from "./Bonfire"; // Updated import name

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black"> {/* Ensuring the site body is dark too */}
        <Bonfire />
        {children}
      </body>
    </html>
  );
}