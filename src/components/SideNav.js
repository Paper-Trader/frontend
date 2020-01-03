import React from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import dashboardIcon from "../assets/activity-icon.svg";
import watchListIcon from "../assets/bar-chart-icon.svg";
import browseIcon from "../assets/eye-icon.svg";

function SideNav() {
  return (
    <div className="side-nav">
      <div className="sidenav-item sidenav-dashboard">
        <Image src={dashboardIcon} size="mini" spaced="right" />
        <Link to="/" className="sidenav-link">
          DASHBOARD
        </Link>
      </div>
      <div className="sidenav-item nav-watchlist">
        <Image src={watchListIcon} size="mini" spaced="right" />
        <Link to="/watchlist" className="sidenav-link">
          WATCHLIST
        </Link>
      </div>
      <div className="sidenav-item nav-browse">
        <Image src={browseIcon} size="mini" spaced="right" />
        <Link to="/browse" className="sidenav-link">
          BROWSE
        </Link>
      </div>
    </div>
  );
}

export default SideNav;
