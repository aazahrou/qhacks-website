import React from "react";
import fetch from "unfetch";
import Helmet from "react-helmet";
import ApolloClient from "apollo-boost";
import * as Sentry from "@sentry/browser";
import { ApolloProvider } from "react-apollo";

import "./index.css";
import FAQs from "../components/FAQs";
import pjson from "../../package.json";
import About from "../components/About";
import Footer from "../components/Footer";
import Podcast from "../components/Podcast";
import Landing from "../components/Landing";
import Sponsors from "../components/Sponsors";
import Speakers from "../components/Speakers";
import EventSchedule from "../components/EventSchedule";
import MailingListSignup from "../components/MailingListSignup";
import HackerTestimonials from "../components/HackerTestimonials";

import favicon from "../assets/img/icons/favicon.ico";
import sharingImage from "../assets/img/logo/sharingImage.png";

export default () => {
  let environment = process.env.NETLIFY_ENV;

  switch (environment) {
    case "deploy-preview":
      environment = "development";
    case "branch-deploy":
      environment = "staging";
    case "production":
      environment = "production";
    default:
      environment = "development";
  }

  if (environment !== "development") {
    Sentry.init({
      environment,
      release: pjson.version,
      dsn: "https://fcd2394efcca4752b9b9b6742861e882@sentry.io/1317531"
    });
  }

  const BASE_URL = "https://app.qhacks.io/graphql";

  const apolloClient = new ApolloClient({
    uri: BASE_URL,
    fetch
  });

  return (
    <ApolloProvider client={apolloClient}>
      <div css={{ overflowX: "hidden" }}>
        <Helmet
          title="QHacks | Queen's University | Winter 2019"
          meta={[
            {
              name: "description",
              content:
                "QHacks is Queen’s University’s annual hackathon, happening February 1st - 3rd, 2019."
            },
            {
              name: "keywords",
              content:
                "Hackathon, Queen's University, Kingston, QHacks, Queensu"
            },
            {
              name: "viewport",
              content: "width=device-width, initial-scale=1.0"
            },
            {
              property: "og:type",
              content: "website"
            },
            {
              property: "og:url",
              content: "https://qhacks.io/"
            },
            {
              property: "og:title",
              content: "QHacks | Queen's University | Winter 2019"
            },
            {
              property: "og:image",
              content: sharingImage
            },
            {
              property: "og:description",
              content:
                "QHacks is back for round four! We're bringing in students from all over North America to come together for a wild 36 hours - designing, developing, demoing, cup-stacking, and foosball-playing at our home base at Queen's University. Whether you're a first timer or a seasoned veteran, QHacks definitely has something to satisfy your interests. This weekend is about inclusiveness for all disciplines - students from any level of skill, from any field of study are encouraged to bring their innovative ideas for a weekend of creative problem solving! The only prerequisites for this weekend are a love for tech and drive to learn."
            },
            {
              property: "og:site_name",
              content: "QHacks"
            },
            {
              property: "og:locale",
              content: "en_US"
            }
          ]}
          link={[
            {
              rel: "shortcut icon",
              href: `${favicon}`
            }
          ]}
        >
          <html lang="en" />
        </Helmet>
        <div>
          <Landing />
          <MailingListSignup />
          <About />
          <HackerTestimonials />
          <Speakers />
          {/* <EventSchedule /> */}
          <Sponsors />
          <FAQs />
          <Podcast />
          <Footer />
        </div>
      </div>
    </ApolloProvider>
  );
};
