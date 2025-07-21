import AdminNavbar from "../../../components/AdminNavbar";
import AuthProvider from "../(auth)/admin/authProvider";
export default function Layout({ children }) {
  return (
    <AuthProvider>
      <AdminNavbar></AdminNavbar>
      {children}
      
    </AuthProvider>
  );
}
