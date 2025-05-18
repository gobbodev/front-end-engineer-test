import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // Permite acesso apenas se existir um token de sessão válido
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: [
    // protege todas as rotas, exceto autenticação, login e assets estáticos
    '/((?!api/auth|login|_next|favicon.ico|images).*)',
  ],
};
