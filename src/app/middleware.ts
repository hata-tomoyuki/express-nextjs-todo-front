import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  const response = NextResponse.next();
  response.headers.set("X-Debug-Pathname", url); // パスを確認用にレスポンスヘッダーに追加
  return response;
}
// matcher を設定
export const config = {
  matcher: ["/register"], // このルートに対してミドルウェアを適用
};
