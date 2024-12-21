import RegisterForm from "../../components/RegisterForm/RegisterForm";

import bannerVideo from "../../assets/bannerVideo.mp4";

const RegistrationPage = () => {
  return (
    <section style={{ position: "relative", height:'100vh' }}>
      <video autoPlay muted loop className="only-video-banner">
        <source src={bannerVideo} type="video/mp4" />
      </video>
      <RegisterForm />
    </section>
  );
};

export default RegistrationPage;
