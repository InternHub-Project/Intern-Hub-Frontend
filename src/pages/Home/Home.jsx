import classes from "./Home.module.css";
export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <div className={classes.home}>Home page</div>

      <div style={{ display: "flex", gap: "2rem", marginTop: "20px" }}>
        <div style={{ display: "grid" }}>
          <a href="/SignupCompanies">SignupCompanies</a>
          <a href="/LoginCompanies">LoginCompanies</a>
          <a href="/ForgetPassCompanies">ForgetPasswordCompanies</a>
          <a href="/UpdatePasswordCompanies">UpdatePasswordCompanies</a>
        </div>

        <div style={{ display: "grid" }}>
          <a href="/SignupUser">SignupUser</a>
          <a href="/LoginUser">LoginUser</a>
          <a href="/ForgetPasswordUser">ForgetPasswordUser</a>
          <a href="/UpdatePasswordUser">UpdatePasswordUser</a>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
