import React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import DesktopBlog from "./DesktopBlog";
import MobileBlog from "./MobileBlog";

const Blog = () => {
    const isMobile = useIsMobile();
    return isMobile ? <MobileBlog /> : <DesktopBlog />;
};

export default Blog;
