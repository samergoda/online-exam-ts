import NextAuthProvider from "./components/next-auth-provider";
import ReactQueryProvider from "./components/react-query-provider";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function RootProviders({ children }: ProvidersProps) {
  return (
    <NextAuthProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </NextAuthProvider>
  );
}
