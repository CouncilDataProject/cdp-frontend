import React, { FC } from "react";

//import "@mozilla-protocol/core/protocol/css/protocol.css";
interface Link {
  label: string;
  url: string;
}

interface Header {
  links: Link[];
  headerName: string;
}

export interface FooterLayoutProps {
  /**The links that go in the footer
   * example link object: {
   *    about: <string>
   *    aboutLinkDestination: <string>
   *    headers: [
   *            {
   *              headerName: "City of Seattle",
   *              links: Link[]
   *          }
   *    ]
   * }
   */
  headers: Header[];
  about: string;
  aboutLinkDestination: string;
}

function renderHeader(header: Header) {
  return (
    <section className="mzp-c-footer-section">
      <h5 className="mzp-c-footer-heading">{header.headerName}</h5>
      <ul style={{ fontSize: "12px" }}>
        {header.links.map((link) => {
          return (
            <li>
              <a href={link.url}>{link.label}</a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const FooterLayout: FC<FooterLayoutProps> = ({
  headers,
  about,
  aboutLinkDestination,
}: FooterLayoutProps) => {
  return (
    <footer className="mzp-c-footer">
      <div className="mzp-l-content">
        <section className="mzp-c-footer-section">
          <h1 className="mzp-c-footer-heading" style={{ fontSize: "1.65rem" }}>
            Council Data Project
          </h1>
          <p>{about}</p>
          <form action={aboutLinkDestination}>
            <input
              className="mzp-c-button mzp-t-product"
              type="submit"
              value="About the project"
              style={{
                borderRadius: ".25rem",
                border: "none",
                height: "2.25rem",
                backgroundColor: "#307D7E",
                color: "white",
                fontWeight: "bold",
              }}
            />
          </form>
        </section>
        <section className="mzp-c-footer-section">
          <h5 className="mzp-c-footer-heading">CDP Information</h5>
          <ul style={{ fontSize: "12px" }}>
            <li>
              <a href="https://github.com/CouncilDataProject/cdp-frontend/issues/councildataproject.github.io">
                CouncilDataProject Information
              </a>
            </li>
            <li>
              <a href="https://github.com/CouncilDataProject/cdp-frontend/issues/github.com/councildataproject">
                CouncilDataProject GitHub
              </a>
            </li>
            <li>
              <a href=""></a>
            </li>
          </ul>
        </section>
        <section className="mzp-c-footer-section">
          {headers.map((header: Header) => {
            return renderHeader(header);
          })}
        </section>
        <section className="mzp-c-footer-section">
          <h4 className="mzp-c-footer-heading">DISCLAIMER</h4>
          <p>
            This web application is not funded by, nor associated with the Seattle City Council.
            Meeting transcripts are 100% accurate, and may not represent what was actually said.
          </p>
        </section>
      </div>
    </footer>
  );
};

export default FooterLayout;
