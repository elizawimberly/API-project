import styles from "./SingleSpotDetails.module.css";

const SpotPrice = ({ spot }) => {
  return (
    <div className={styles.outer}>
      <div className={styles.details_list}>
        <div>
          <div className={styles.bold}>
            <i class="fas fa-solid fa-wifi"></i>
            {"   "}Fast wifi
          </div>
          <div>
            Fast wifi At 486 Mbps, you can take video calls and stream videos
            for your whole group.
          </div>
        </div>
        <div>
          <div className={styles.bold}>
            <i class="fas fa-solid fa-key"></i>
            {"   "}Self check-in
          </div>
          <div>Check yourself in with the smartlock.</div>
        </div>
        <div className={styles.bold}>
          <i class="fas fa-regular fa-calendar"></i>
          {"   "}Free cancellation for 48 hours.
        </div>
      </div>
      <div className={styles.price}>
        <div className={styles.text}>
          <div className={styles.bold}>{`$${spot.price} night`}</div>
        </div>
        <div className={styles.text} id={styles.bar}>
          <div className={styles.left}>{`$${spot.price} x 5 nights`}</div>
          <div className={styles.right}>{`$${Number(spot.price) * 5}`}</div>
        </div>
        <div className={styles.text}>
          <div className={styles.left}>Cleaning fee</div>
          <div className={styles.right}>$100</div>
        </div>
        <div className={styles.text}>
          <div className={styles.left}>Service fee</div>
          <div className={styles.right}>$150</div>
        </div>
        <div className={styles.text} id={styles.bar}>
          <div className={styles.bold}>Total before taxes</div>
          <div className={styles.right}>{`$${
            Number(spot.price) * 5 + 250
          }`}</div>
        </div>
      </div>
    </div>
  );
};

export default SpotPrice;
