import * as React from "react";
import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { CiViewTable } from "react-icons/ci";
import { GiBigGear, GiCardRandom, GiPokerHand } from "react-icons/gi";
import { Link } from "react-router";

const Navbar: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <BootstrapNavbar
      id="navbar"
      expand="lg"
      variant="light"
      bg="light"
      sticky="top"
    >
      <Container>
        <Nav.Link as={Link} to="/">
          <BootstrapNavbar.Brand>
            <GiPokerHand
              style={{ fontSize: "2.5rem", verticalAlign: "middle" }}
            />
          </BootstrapNavbar.Brand>
          {/* <BootstrapNavbar.Brand className="d-flex flex-nowrap align-items-center"> */}
        </Nav.Link>
        <BootstrapNavbar.Toggle>
          <span className="navbar-toggler-icon" />
        </BootstrapNavbar.Toggle>

        <BootstrapNavbar.Collapse>
          <Nav className="d-flex justify-content-between flex-row w-100">
            <div className="d-flex flex-wrap">
              <Nav.Link as={Link} to="/">
                <GiCardRandom /> {t("pages.main.name")}
              </Nav.Link>
              <Nav.Link as={Link} to="/table">
                <CiViewTable /> {t("pages.handTable.name")}
              </Nav.Link>
              <Nav.Link as={Link} to="/settings">
                <GiBigGear /> {t("pages.settings.name")}
              </Nav.Link>
            </div>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
