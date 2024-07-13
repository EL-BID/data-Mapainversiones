"use client";

import { Box } from "@mui/material";
import Hero from "../../components/Hero";
import SearchBar from "../../components/Country/SearchBar";
import Indicators from "../../components/Country/Indicators";
import ExploreProjects from "../../components/Country/ExploreProjects";
import InstitutionBudgets from "../../components/Country/InstitutionsBudgets";
import CommunityEvents from "../../components/Country/CommunityEvents";
import Participate from "@/components/Country/Participate";

export default function Country() {
  return (
    <Box>
      <Hero />
      <SearchBar />
      <Indicators />
      <ExploreProjects />
      <InstitutionBudgets />
      <Participate />
      <CommunityEvents />
    </Box>
  );
}
