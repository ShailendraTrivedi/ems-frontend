import ReduxProvider from "@/layout/ReduxProvider";
import "./globals.css";
import ClientLayout from "@/layout/ClientLayout";
import { SideNavbar } from "@/components";
import HeaderBar from "@/components/common/HeaderBar";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientLayout>
          <ReduxProvider>
            <div className="flex min-h-screen w-full">
              <SideNavbar />
              <div className="relative flex flex-col grow z-0">
                <HeaderBar />
                <div className="grow">{children}</div>
              </div>
            </div>
          </ReduxProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
