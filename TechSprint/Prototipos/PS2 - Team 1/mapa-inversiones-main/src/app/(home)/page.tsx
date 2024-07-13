import { Box } from "@mui/material";
import Hero from "../../components/Hero";
import TransparencySection from "../../components/Home/TransparencySection";
import QuestionBar from "../../components/QuestionBar";
import VideoSection from "../../components/Home/VideoSection";
import MeetCommunitySection from "../../components/Home/MeetCommunity";
import TargetAudience from "@/components/Home/TargetAudience";

export default function Home() {
  return (
    <Box>
      <Hero />
      <TransparencySection />
      <QuestionBar backGroundColor="#00bcd4" />
      <TargetAudience />
      <VideoSection />
      <MeetCommunitySection />
    </Box>
  );
}
