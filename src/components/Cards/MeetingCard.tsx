import React from "react";
import styled from "@emotion/styled";
import Card from "./Base";
import colors from "../../styles/colors";
import { fontSizes } from "../../styles/fonts";

type MeetingCardProps = {
  imgSrc: string;
  imgOverlayText: string;
  committee: string;
  tags: [string];
  excerpt?: string;
};

const HeadingSection = styled.div`
  margin: 0 0 2rem 0;
`;

const SectionTitle = styled.div`
  padding-bottom: 0.4rem;
  font-size: ${fontSizes.font_size_3};
  color: ${colors.grey};
`;

const HeadingContent = styled.div`
  font-size: ${fontSizes.font_size_5};
  font-weight: bold;
  color: ${colors.black};
`;

const BodySection = styled.div`
  margin: 0 0 1rem 0;
`;

const SectionContent = styled.div`
  font-size: ${fontSizes.font_size_4};
  font-weight: bold;
  color: ${colors.black};
`;

const SearchExcerpt = styled.div`
  font-size: ${fontSizes.font_size_3};
  color: ${colors.grey};
`;

const MeetingCard = (props: MeetingCardProps) => {
  const tagString = props.tags.join(` • `);

  return (
    <Card
      imgSrc={props.imgSrc}
      imageOverlayContent={
        <span
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            margin: "1rem",
            fontSize: fontSizes.font_size_8,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          {props.imgOverlayText}
        </span>
      }
      content={
        <>
          <HeadingSection>
            <SectionTitle>Committee</SectionTitle>
            <HeadingContent>{props.committee}</HeadingContent>
          </HeadingSection>
          <BodySection>
            <SectionTitle>Tags</SectionTitle>
            <SectionContent>{tagString}</SectionContent>
          </BodySection>
          {props.excerpt && (
            <BodySection>
              <SearchExcerpt>{`"${props.excerpt}"`}</SearchExcerpt>
            </BodySection>
          )}
        </>
      }
    />
  );
};

export default MeetingCard;
