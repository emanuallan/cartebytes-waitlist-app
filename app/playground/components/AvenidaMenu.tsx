import React from "react";
import FooterLogoCTA from "../components/FooterLogoCTA";
import { FaPhone, FaStore } from "react-icons/fa6";
import chroma from "chroma-js";
import { isLight } from "../utils";
import { RestaurantT } from "../types/restaurant";
import { MenuT } from "../types/menu";
import SocialMediaGroup from "./SocialMediaGroup";

function AvenidaMenu({
  restaurant,
  menu,
}: {
  restaurant: RestaurantT;
  menu: MenuT;
}) {
  const getPageBackgroundColor = (index: number) => {
    if (index % 2 !== 0) return restaurant.colors.primary;
    if (index % 4 === 0) return restaurant.colors.secondary;
    return restaurant.colors.primary_text;
  };

  const getPageBodyTextColor = (index: number) => {
    const backgroundColor = getPageBackgroundColor(index);
    // Body text should be primary_text except when the background is primary_text
    if (backgroundColor === restaurant.colors.primary_text) {
      return restaurant.colors.secondary_text; // Use secondary_text to avoid conflict with primary_text background
    }
    return restaurant.colors.primary_text;
  };

  const getPageSectionTitleColor = (index: number) => {
    const backgroundColor = getPageBackgroundColor(index);
    if (restaurant.colors.primary === restaurant.colors.secondary) {
      if (isLight(restaurant.colors.accent) && isLight(backgroundColor)) {
        if (backgroundColor !== restaurant.colors.primary)
          return restaurant.colors.primary;
        return restaurant.colors.secondary_text;
      }
      return restaurant.colors.accent;
    }

    // Title should be primary whenever the background is not primary
    if (backgroundColor !== restaurant.colors.primary) {
      return restaurant.colors.primary;
    }
    // Fallback title color when background is primary
    return restaurant.colors.secondary;
  };

  const getContentComponent = (section: any, sectionIdx: number) => {
    if (section.type === "hero_image") {
      return <img src={section.src} className="h-auto w-full" />;
    } else if (section.type === "food_items") {
      return (
        <div>
          <h3
            className="pl-7 pt-8 text-3xl font-semibold"
            style={{ color: getPageSectionTitleColor(sectionIdx) }}>
            {section.title}
          </h3>

          <div className="flex flex-col gap-3 px-7 pb-8 pt-1">
            {section.content.map((foodItem: any, i: number) => (
              <div key={i + 50} className="flex items-start justify-between">
                <div>
                  <p
                    className="text-xl font-semibold"
                    style={{ color: getPageBodyTextColor(sectionIdx) }}>
                    {foodItem.name}
                  </p>
                  <p
                    className="text-md leading-tight"
                    style={{
                      color: getPageBodyTextColor(sectionIdx),
                      opacity: 0.75,
                    }}>
                    {foodItem.description}
                  </p>
                  {foodItem.calories && (
                    <p
                      className="text-md font-thin leading-tight"
                      style={{
                        color: getPageBodyTextColor(sectionIdx),
                        opacity: 0.75,
                      }}>
                      {foodItem.calories} Cal
                    </p>
                  )}
                </div>
                <div>
                  <p
                    className="text-lg font-semibold"
                    style={{ color: getPageBodyTextColor(sectionIdx) }}>
                    ${foodItem.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (section.type === "section_title") {
      return (
        <h2
          className="text-center text-5xl font-semibold"
          style={{ color: getPageSectionTitleColor(sectionIdx) }}>
          {section.text}
        </h2>
      );
    }
  };

  const gradientColors = chroma
    .scale([
      chroma(restaurant.colors.primary).brighten(0.2),
      restaurant.colors.primary,
      chroma(restaurant.colors.primary).darken(0.2),
    ])
    .mode("lab")
    .colors(5);
  const gradientString = `linear-gradient(90deg, ${gradientColors.join(", ")})`;

  return (
    <div
      id="menu"
      className={`w-full max-w-xl font-sans`}
      style={{ color: restaurant.colors.primary_text }}>
      <section
        id="hero"
        className={`hero duration-2000 flex h-[calc(100dvh-60px)] flex-col px-7 py-12 transition-all ease-linear`}
        style={{ background: gradientString }}>
        <div id="hero-header" className="flex justify-between">
          <h1 className="text-5xl font-semibold">
            Digital <br />
            Menu
          </h1>
        </div>
        <div className="flex h-full flex-col justify-center text-center">
          <img className="h-auto w-full" id="hero-logo" src={restaurant.logo} />
          {/* <h2 className="mt-6 text-4xl font-semibold">{restaurant.name}</h2> */}
          {/* <h3 className="mt-2 text-xl font-semibold">{restaurant.phone}</h3> */}
          <h3 className="mt-4 text-xl font-semibold">
            {restaurant.city}, {restaurant.state}
          </h3>
        </div>
        <SocialMediaGroup
          id="hero_socials"
          colors={restaurant.colors}
          className="justify-end"
          {...restaurant.socials}
        />
      </section>
      {/* <RusticEdge1
    color={restaurant.colors.primary}
    className="relative z-10 mb-[-20%]"
  /> */}
      {menu.pages.map((page: any, i: number) => {
        return (
          <section
            key={i}
            className="flex flex-col gap-20 pb-20"
            style={{ background: getPageBackgroundColor(i) }}>
            {page.sections.map((section: any, j: number) => {
              const content = getContentComponent(section, i);
              return (
                <div key={j + 100} className="before:pt-4">
                  {content}
                </div>
              );
            })}
          </section>
        );
      })}
      <section
        id="footer"
        className="flex flex-col items-center gap-12 px-7 py-24"
        style={{
          background: restaurant.colors.secondary, //getPageBackgroundColor(menu.pages.length + 2),
          color: restaurant.colors.primary_text, //getPageBodyTextColor(menu.pages.length + 2),
        }}>
        <img className="h-auto w-full" id="footer-logo" src={restaurant.logo} />
        <div className="flex h-full flex-col justify-center">
          {/* <h2 className="mt-6 text-4xl font-semibold">{restaurant.name}</h2> */}
          <h3 className="mt-2 flex items-start gap-4 text-2xl font-semibold">
            <div className="mt-1">
              <FaPhone />
            </div>
            <div>{restaurant.phone}</div>
          </h3>
          <h3 className="mt-2 flex items-start gap-4 text-2xl font-semibold">
            <div className="mt-1">
              <FaStore />
            </div>
            <div>
              {" "}
              {restaurant.address} <br /> {restaurant.city}, {restaurant.state}{" "}
              {restaurant.zipCode}
            </div>
          </h3>
        </div>
        <SocialMediaGroup
          id="hero_socials"
          colors={restaurant.colors}
          className="justify-center"
          {...restaurant.socials}
        />
      </section>
      <FooterLogoCTA />
    </div>
  );
}

export default AvenidaMenu;
