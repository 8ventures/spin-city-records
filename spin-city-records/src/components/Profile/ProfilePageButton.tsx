import { useRouter } from "next/router";
import { FC } from "react";

interface ProfileButtonProps {
  label: string;
  page: string;
  currentPage: string;
  onClick: (path: string) => void;
}

const ProfilePageButton: FC<ProfileButtonProps> = ({
  label,
  page,
  currentPage,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/profile/${page}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`m-2 rounded-xl p-2 hover:bg-gray-700 ${
        currentPage === page ? "text-white" : "hover:text-white"
      }`}
      style={{ position: "relative", padding: "8px" }}
    >
      {label}
      {currentPage === page && (
        <div
          style={{
            position: "absolute",
            left: "0",
            bottom: "-11px",
            width: "100%",
            border: "1px solid white",
          }}
        ></div>
      )}
    </button>
  );
};

export default ProfilePageButton;
