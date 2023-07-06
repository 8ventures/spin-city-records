import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
const Settings = () => {
  return (
    <div className="mt-8 flex items-center justify-center align-middle">
      <UserProfile
        appearance={{
          baseTheme: dark,
          elements: {
            card: "w-full bg-black border-gray-900",
            rootBox: "w-4/6 mb-10",
          },
          variables: {
            colorAlphaShade: "#FF5500",
            colorInputBackground: "black",
          },
        }}
      />
    </div>
  );
};

export default Settings;
