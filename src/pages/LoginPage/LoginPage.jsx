import LoginForm from "../../components/LoginForm/LoginForm";
import bannerVideo from "../../assets/bannerVideo2.mp4";

const Login = () => {
  return (
    <section style={{ position: "relative", height:'100vh' }}>
      <video autoPlay muted loop className="only-video-banner">
        <source src={bannerVideo} type="video/mp4" />
      </video>
      <LoginForm />
    </section>
  );
};

export default Login;
