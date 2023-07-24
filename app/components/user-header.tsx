import styles from "./user-header.module.scss";
import SunSvg from "../icons/sun.svg";
import MoonSvg from "../icons/moon.svg";
import { RainBros } from "../common/rain-bros/rain-bros";

export function UserHeader() {
  const isDark = false;
  return (
    <div>
      <div className={styles["weatherContainer"]}>
        <div>
          {isDark ? (
            <MoonSvg className={styles["weather"]}></MoonSvg>
          ) : (
            <SunSvg className={styles["weather"]}></SunSvg>
          )}
        </div>
        <div className={styles["rain-bors-style"]}>
            <RainBros></RainBros>
        </div>
      </div>
    </div>
  );
}
