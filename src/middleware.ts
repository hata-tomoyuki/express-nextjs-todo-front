import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isTokenExpired(token: string): boolean {
  try {
    // トークンのペイロードをデコード
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    // 現在の時間とトークンの有効期限を比較
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    console.error("トークンの有効期限の確認に失敗しました:", error);
    return true;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken");

  // トークンが失効している場合、トークンをクリア
  if (token && isTokenExpired(token.value)) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("authToken");
    response.cookies.delete("userId");
    return response;
  }

  // トークンがある場合、ログインと登録ページへのアクセスを禁止
  if (
    token &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/", request.url)); // ホームページにリダイレクト
  }

  // ログインと登録ページにはミドルウェアをスキップ
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")
  ) {
    return NextResponse.next();
  }

  // トークンがない場合はログインページへリダイレクト
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
