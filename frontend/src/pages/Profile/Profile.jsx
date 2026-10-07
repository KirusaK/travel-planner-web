import { useState } from "react";
import { History } from "../../widgets/History/History";
import { PaymentMethods } from "../../widgets/PaymentMethods/PaymentMethods";
import { Header } from "../../widgets/Header/Header";
import { Subscribe } from "../../widgets/Subscribe/Subscribe";
import { Footer } from "../../widgets/Footer/Footer";
import { Hero } from "../../widgets/Hero-Profile/Hero";
import { ProfileTabs } from "../../widgets/Profile-Tabs/ProfileTabs";
import { Account } from "../../widgets/Account/Account";

export const Profile = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <>
      <Header />

      <Hero />

      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "account" && <Account />}
      {activeTab === "history" && <History />}
      {activeTab === "payment" && <PaymentMethods />}

      <Subscribe />

      <Footer />
    </>
  );
};
