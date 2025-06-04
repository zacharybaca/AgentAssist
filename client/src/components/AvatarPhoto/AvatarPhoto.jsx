import "./avatar-photo.css";
import { useSignUp } from "../../hooks/useSignUp.js";
import GenericAvatar from "../../assets/generic-avatar.png";

const AvatarPhoto = () => {
  const { addedAgent } = useSignUp();

  return (
    <div id="profile-avatar-container">
      {addedAgent && addedAgent.avatar ? (
        <img
          src={addedAgent.avatar}
          className="object-fit-fill border rounded"
          alt="profile avatar"
        />
      ) : (
        <img
          src={GenericAvatar}
          className="object-fit-fill border rounded"
          alt="generic avatar"
        />
      )}
    </div>
  );
};

export default AvatarPhoto;
