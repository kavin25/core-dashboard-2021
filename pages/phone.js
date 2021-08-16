import Widget from "../components/Widget";
import styles from "../styles/Phone.module.css";

export default function Phone() {
  const contactNumbers = [
    "+91 7809567432",
    "+91 9870945893",
    "+91 7809567432",
    "+91 9870945893",
    "+91 7809567432",
    "+91 9870945893",
    "+91 7809567432",
    "+91 9870945893",
    "+91 7809567432",
    "+91 9870945893",
    "+91 7809567432",
    "+91 9870945893",
    "+91 7809567432",
    "+91 9870945893",
    "+91 7809567432",
    "+91 9870945893",
    "+91 7809567432",
    "+91 9870945893",
  ];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "stretch",
        height: "100%",
      }}
    >
      <Widget
        style={{
          width: "70%",
          height: "100%",
          marginRight: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          overflowY: "scroll",
        }}
        bgColor="--dark-light"
        textColor="--white"
      >
        <img src="/guy.png" alt="" width="50%" />
        <div
          className="details"
          style={{
            alignSelf: "self-start",
          }}
        >
          <h2 style={{ marginBottom: "24px" }}>John Doe</h2>
          <div className="text-details">
            <h4
              style={{
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Call
            </h4>
            <p style={{ marginBottom: "4px", fontSize: "16px" }}>mobile</p>
            <p style={{ marginBottom: "4px", fontSize: "24px" }}>
              +91 9870945893
            </p>
            <p style={{ marginBottom: "4px", fontSize: "16px" }}>phone</p>
            <p style={{ marginBottom: "4px", fontSize: "24px" }}>
              +91 9870945893
            </p>
          </div>
          <div className="share" style={{ marginTop: "28px" }}>
            <a href="#">
              <h4 style={{ fontWeight: "600" }}>Share my location</h4>
            </a>
          </div>
        </div>
      </Widget>
      <Widget
        style={{ width: "30%", marginLeft: "16px", overflowY: "scroll" }}
        bgColor="--bg-color"
        textColor="--white"
        className={styles.recents}
      >
        <h3 style={{ marginBottom: "12px" }}>Recents</h3>
        {contactNumbers.map((contact, idx) => (
          <Widget
            bgColor="--dark-light"
            textColor="--white"
            key={idx}
            style={{
              marginBottom: "8px",
              textAlign: "center",
              padding: "16px",
              borderRadius: "20px",
              fontSize: "19px",
            }}
          >
            {contact}
          </Widget>
        ))}
      </Widget>
    </div>
  );
}
