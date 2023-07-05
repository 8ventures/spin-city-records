import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
const Settings = () => {
  return (
    <UserProfile
      appearance={{
        elements: {
          card: "w-full",
          rootBox: "w-full",
        },
      }}
    />
  );
};

export default Settings;
