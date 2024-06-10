import Header from "@/components/header";

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function Layout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  return (
    <>
      {/* <Header /> */}
      <div
        lang={locale}
        className="flex flex-col flex-1 max-w-96 w-full m-auto h-screen gap-6"
      >
        {children}
      </div>
    </>
  );
}
